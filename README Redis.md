### Implement Redis caching in Node.js

Let's implement a modular, production-oriented caching solution using the cache-aside pattern.

#### Step 1: Install Redis

```
npm install redis express
```

#### Step 2: Redis configuration

```js
// config/redis.js
const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

async function connectRedis() {
  await redis.connect();
}

module.exports = { redis, connectRedis };
```

#### Step 3: Create reusable caching functions

Rather than accessing Redis directly in every controller, I would create a shared caching module.

```js
// shared/cache.service.js
const { redis } = require("../config/redis");

async function getCache(key) {
  const data = await redis.get(key);
  return data === null ? null : JSON.parse(data);
}

async function setCache(key, data, ttl = 300) {
  await redis.set(key, JSON.stringify(data), {
    EX: ttl,
  });
}

async function deleteCache(key) {
  await redis.del(key);
}

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
```

#### Step 4: Implement cache-aside in the service layer

```js
// modules/products/product.service.js
const cache = require("../../shared/cache.service");
const productRepository = require("./product.repository");

async function getProductById(id) {
  const key = `product:${id}`;

  // 1. Check cache
  const cachedProduct = await cache.getCache(key);

  if (cachedProduct !== null) {
    return cachedProduct;
  }

  // 2. Cache miss: query database
  const product = await productRepository.findById(id);

  if (!product) {
    return null;
  }

  // 3. Store in Redis for 5 minutes
  await cache.setCache(key, product, 300);

  return product;
}

module.exports = { getProductById };
```

#### Step 5: Controller

```js
// modules/products/product.controller.js
const productService = require("./product.service");

async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
```

This allows all backend instances to share the same Redis cache.

Production consideration: The example propagates Redis failures, so a Redis outage can also cause API failures. For data where caching is an optimization rather than a requirement, I would implement a controlled database fallback, Redis timeouts, and appropriate monitoring.

<br>

### Cache invalidation — the most important challenge

Interviewer: What happens if product data changes in the database but Redis still has the old value?

Suppose:

```
Database price: ₹1,200
Redis price:    ₹1,000
```

The user receives stale data.

This is why cache invalidation is as important as caching itself.

I would use a combination of TTL and explicit invalidation.

#### Invalidate cache after an update

```js
async function updateProduct(id, data) {
  const product = await productRepository.update(id, data);

  // Invalidate cached product after DB update
  await cache.deleteCache(`product:${id}`);

  return product;
}
```

Now the next request fetches fresh data from the database and repopulates Redis.

This is a common cache-aside strategy also described in Redis's caching guidance.&#x20;

However, deleting the key after updating the database is not sufficient to guarantee strong consistency under concurrency. A concurrent read may refill the cache with an older value.

For stricter consistency, I would consider versioned cache keys, coordinated invalidation, or bypassing caches for critical reads.

<br>

### What TTL should I choose?

There is no universal TTL. It depends on how frequently the data changes and how much staleness the business allows.

| Data type              | Example TTL            | Strategy                         |
| ---------------------- | ---------------------- | -------------------------------- |
| Product categories     | 30–60 minutes          | TTL + invalidation               |
| Product details        | 1–5 minutes            | Cache-aside                      |
| Public configuration   | 5–30 minutes           | TTL                              |
| User profile           | Short TTL              | User-scoped cache + invalidation |
| Inventory availability | Very short or none     | Prefer authoritative checks      |
| Financial balances     | Usually no stale cache | Read authoritative data          |

These are illustrative starting points, not universal production recommendations.

<br>

### HTTP caching using Cache-Control and ETag

Not every cache needs Redis.

HTTP already provides powerful caching mechanisms.

#### A. Cache-Control

For a public product API, we could return:

```
HTTP/1.1 200 OK
Cache-Control: public, max-age=60
```

This allows eligible caches to consider the response fresh for 60 seconds.

Another useful strategy is:

```
Cache-Control: public, max-age=60, stale-while-revalidate=30
```

A compatible cache can serve a stale response for up to 30 additional seconds while revalidating it.&#x20;


#### B. ETag

ETag allows conditional requests to reduce response bandwidth.

First request:

```
GET /api/products/101
```

Response:

```
HTTP/1.1 200 OK
ETag: "product-101-v5"
```

Next request:

```
GET /api/products/101
If-None-Match: "product-101-v5"
```

If the representation hasn't changed:

```
HTTP/1.1 304 Not Modified
```

The server doesn't need to send the complete response again.&#x20;

**One important distinction:** ETag revalidation saves bandwidth, but it doesn't automatically eliminate database queries. The backend still needs an efficient way to determine whether the resource changed.

<br>

### Production challenges with caching

At scale, I would address these situations:

| Problem                | Solution                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| Cache stampede         | Request coalescing, locking, TTL jitter                                 |
| Cache penetration      | Validate IDs, optionally cache safe negative results                    |
| Cache avalanche        | Stagger expiration times with jitter                                    |
| Stale data             | TTL, invalidation, versioning                                           |
| Redis failure          | Timeouts, circuit breaker, controlled DB fallback                       |
| Memory pressure        | Eviction policies and bounded cache sizes                               |
| Cache poisoning        | Validate inputs and build trusted cache keys                            |
| Sensitive data leakage | Partition caches by user or tenant and apply correct HTTP cache headers |

#### Example: Cache stampede

Suppose 10,000 users simultaneously request a popular product just after its cached entry expires.

Without protection:

```
10,000 requests → Cache miss → 10,000 database queries
```

With request coalescing or a distributed lock:

```
10,000 requests → Cache miss
                         |
                  One cache refresh
                         |
                     Database
                         |
                    Redis updated
                         |
                  Remaining requests
                   use cached data
```

This is especially important for high-traffic endpoints.

<br>

### What metrics would I monitor?

I would monitor cache effectiveness instead of assuming caching improves performance.

Illustrative cache performance dashboard

Cache hit ratio

#### 90%

Illustrative target

Cache miss ratio

#### 10%

Illustrative

Cache hits

900

Cache misses

100

Example based on 1,000 requests. Actual targets depend on workload and cache policy.

I would also monitor P95/P99 response latency, database query volume, Redis memory utilization, eviction rates, cache refresh failures, and stale data incidents.

A high cache-hit ratio isn't necessarily good if users are receiving incorrect or outdated data.

<br>

### Interviewer: Suppose two requests arrive simultaneously after a Redis cache entry expires. Both requests query the database. How would you prevent duplicate database calls?

Answer: I would implement request coalescing or a locking mechanism. For a distributed Node.js application, a Redis-based lock with expiry can ensure that only one instance refreshes a popular cache entry while others wait briefly or serve acceptable stale data.

For production, I would also use bounded waiting, safe lock release, and database fallback to avoid hanging requests.

Key senior-level principle: Caching improves performance only when data freshness, concurrency, invalidation, and failure handling are designed alongside it.

<br>
<br>

> ### Data Persistence in Redis

**Data persistence in Redis** means saving data from Redis's in-memory storage to disk so that the data is not lost when Redis restarts or crashes.

Redis primarily stores data in **RAM**, which makes it extremely fast. However, if the server restarts, data can be lost unless persistence is configured.

Redis provides two main persistence mechanisms:

#### 1. RDB (Redis Database Backup)

RDB takes a **snapshot of the Redis data at a particular point in time** and saves it to a file on disk, usually `dump.rdb`.

![【征服redis7】谈谈Redis的RDB持久化方式_redis rdb持久化save原理-CSDN博客](https://images.openai.com/static-rsc-4/7gkhALNotzClxMJHnK6ciH77TB3QKFWJ83tK0dDNep3WV5a3vZ6uSxwtSUe9fv90sz2nsDBFhaUuvUeTBN3gQMrsKCCVbHd-bryeOBJ-hILv_4BjXJpXL0eCZKhZAT0kWWXK4yGPK4eV6tCbYHh12c6SWFD5Nel_VUFVz5UNvNw?purpose=inline)


**How it works:**

- Redis takes a snapshot of its current data.
- The snapshot is stored in a binary file (`dump.rdb`).
- Redis can restore data from this file when it starts again.

Example configuration:

```
save 900 1
save 300 10
save 60 10000
```

This means:

| Configuration | Meaning                                           |
| ------------- | ------------------------------------------------- |
| `900 1`       | Save if at least 1 key changes in 900 seconds     |
| `300 10`      | Save if at least 10 keys change in 300 seconds    |
| `60 10000`    | Save if at least 10,000 keys change in 60 seconds |

**Advantages:**

- Compact backup file.
- Fast restoration.
- Good for backups and disaster recovery.

**Disadvantage:**

\- Data changes after the last snapshot may be lost if Redis crashes.

<br>

#### 2. AOF (Append Only File)

AOF logs every write operation performed on Redis.

For example, if you execute:

```
SET user:1 "Pradeep"
SET user:2 "Rahul"
INCR counter
```

Redis records the write commands in its AOF log, allowing it to replay those commands to reconstruct the data.

![Amazon MemoryDB for Redis - Where speed meets consistency | All Things Distributed](https://images.openai.com/static-rsc-4/NBUUn6Iimznb1-yAV5Q2jiDHxNgx9zhfPYyPbzdRLH25zEO2gzNDOLrq_ThwkrP-7pcILyBVEJygDFhQC4uVpbLyxAaS8YZlgcoElrvbjNj4141C11hsGIO7fFELPROXY_wejuZy0rSBURsYMAxU9ASG-O7FRoxOYYs4xY8bN_o?purpose=inline)


Example configuration:

```
appendonly yes
appendfsync everysec
```

The `appendfsync` setting determines how frequently Redis flushes data toward disk.

| Setting    | Meaning                          | Trade-off                           |
| ---------- | -------------------------------- | ----------------------------------- |
| `always`   | Flush after every write          | Safer, slower                       |
| `everysec` | Flush approximately every second | Good balance                        |
| `no`       | Let OS decide                    | Faster, less predictable durability |

**Advantages:**

- Better durability than snapshots alone.
- Can recover by replaying logged write operations.

**Disadvantages:**

- AOF files can be larger.
- Recovery can take longer depending on the log size.

## **RDB vs AOF**

| Feature        | RDB                         | AOF                                       |
| -------------- | --------------------------- | ----------------------------------------- |
| Storage method | Snapshots                   | Write operation log                       |
| Data recovery  | Restore snapshot            | Replay commands                           |
| Data loss risk | Changes since last snapshot | Usually up to about 1 sec with `everysec` |
| File size      | Usually smaller             | Usually larger                            |
| Recovery speed | Generally faster            | May be slower                             |
| Best use       | Backups                     | Better durability                         |

## **3. Can we use both?**

Yes. Redis can use **RDB + AOF together**.

For example:

```
save 60 10000

appendonly yes
appendfsync everysec
```

This gives you:

- RDB snapshots for backups.
- AOF for recovering more recent changes.
- Better overall recovery options.

### Redis comes with default persistance of RDB


<br>
<br>


> ### Expiration on Redis keys

#### 1. Set expiration while storing a key

**Using EX**

```
SET user:1 "Pradeep" EX 60
```

- `EX 60` → expires after 60 seconds.
- Redis automatically removes the key after the expiration time.

**Using PX**

```
SET user:1 "Pradeep" PX 5000
```

\- `PX 5000` → expires after 5,000 milliseconds (5 seconds).

| Command | Expiration unit                |
| ------- | ------------------------------ |
| `EX`    | Seconds                        |
| `PX`    | Milliseconds                   |
| `EXAT`  | Unix timestamp in seconds      |
| `PXAT`  | Unix timestamp in milliseconds |


#### 2. Set expiration on an existing key

If the key already exists, we can set its expiration separately.

```
SET user:1 "Pradeep"

EXPIRE user:1 60
```

This means the key will expire after 60 seconds.

For milliseconds:

```
PEXPIRE user:1 5000
```

#### 3. Check remaining expiration time

```
TTL user:1
```

Returns remaining time in seconds.

```
PTTL user:1
```

Returns remaining time in milliseconds.

Possible results:

- Positive number → remaining expiration time.
- `-1` → key exists but has no expiration.
- `-2` → key doesn't exist.

#### 4. Remove expiration

If we want the key to never expire:

```
PERSIST user:1
```

This removes the TTL from the key.