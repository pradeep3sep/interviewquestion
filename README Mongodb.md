#### Collection in mongo is same as table in mysql

> ### Database -> Collection -> Documents

```
https://www.mongodb.com/docs/manual/reference/mql/expressions/
```

>### Below are commands for shell

- If we use the blank object in filter condition means we want all the data. It is like * of mysql
- A row or the documents has the max size of 16mb
- To get all the database
  ```js
  show dbs
  ```
- To go to database
  ```js
  use database_name
  ```

- To drop database name
  ```js
  use databaase_name
  db.dropDatabase()
  // For the collection
  db.myCollection.drop()
  ```

- Keep in mind, we have the insert, insertOne, insertMany, but insert method should be avoided, altough it works but general pratice is to avoid it.

- To add data in collection in first time collection or existing collection. passed value needs to be JSON

1. insertOne(data, options)
```js
db.collection_name.insertOne({
    name: "Max",
    age: 29
})
```

**Note:** When we enter the above command we get an object in return having the acknowledged be true and insertid be a value

2. To add many values, we have the insertMany(data,options)
```js
db.collection_name.insertMany(
    [
        {
            name: 'ram'
        },
        {
            name: 'shyam'
        }
    ],
    {
        ordered: false  // It means the data which fails will be skipped and rest will be added to db. Default value is true means if it fails at certain index then it will not continue the next data 
    }
)
```

- To get the data of the collection, we use the 

1. find(filter,options)
```js
db.collection_name.find()  // This is to get all data of the collection

db.collection_name.find().pretty()   // It gives the same result but in the more structured form

db.collection_name.find({
  name: 'max'  // This condition acts as filter, gives the result of all row having the name = 'max'
})

// Nested find function
db.collection_name.find({name: 'ram'}).hobbies
// here we find the row having name ram and then we want data inside hobbies. whew hobbies is an array or text

// we can also find the value in nested object, its like traversing in object
db.collection_name.find({'status.details.responsible': 'max'})

// We can also provide the condition in the filter, eg is below
db.collection_name.find({
    distance: {
        $gt : 10000   // $gt acts as condition of greater then
    }
})
```

2. findOne(filter, options)
```js
///It provides the first row of all row which satisfies the condition or filter
db.collection_name.findOne({
    distance: {
        $gt : 10000   // $gt acts as condition of greater then
    }
})
```


- To update or change the data
```
https://www.mongodb.com/docs/manual/reference/operator/update/
```

1. updateOne(filter, data, options)
```js
db.collection_name.updateOne(
    {
        name: "rahul"    // This is the filter
    },
    {
        $set: {
            lastname: 'test'   // This is the data
        }
    }
)
```

**Note:**Basically it will go to first row having name rahul and then set the lastname to test, if lastname doesn't exist then it will create the lastname with value test


2. updateMany(filter, data, options).
```js
db.collection_name.updateMany(
    {}, // Here we have kept blank because we want this change in every row
    {
        $set: {
            lastname: 'test'   // This is the data
        }
    }
)

// We have 'update' also which work quite similar to updateMany
db.collection_name.update(
    {
        id : 'degubkubcsiu'
    },
    {
        delayed: false
    }
)

// If we use this type then it will replace the whole row with above 2 data
// We have inc for the incremental(use + sign) and decremental (use - sign) updation of the value, increment or decrement can be done by any value like 2,30,767,...
// we can update a value along with increment function.

// min and max compare with the existing value and the update it

// To delete the key or node in the data of the row or the document, we can use the unset function
db.collection_name.updateMany({isSporty: true}, {$unset: {phone: ''}})  // here we want to delete the phone node when row has the isSporty value to be true

// To rename the node or key name
db.collection_name.updateMany({}, {$rename: {age: 'totalAge'}})  // Basically here we want all row to have age renamed as totalAge

// Upsert : where we don't know if the data was saved to database yet and if it was't saved yet,you know want to create a new document , if it was, you want to override the existing or update the existing document
// it is quite much good if we want to update with check condition


// Key point: while searching in the array, elemmatch is the good one to go with
```


3. replaceOne(filter, data, options) - It replaces the whole data to the new data we passed
```js
db.collection_name.replaceOne({
    {
        _id: 'icsihdhndsc'
    },
    {
        name: 'ram',
        lastname: "syham"
    }
})
// It replaces whole row of id = icsihdhndsc with new data we passed in
```


- To delete the data from the database

1. deleteOne(filter, options)
```js
db.collection_name.deleteOne({
    name: "rahul"
})  // It will go to collection take delete only first raw or data which have the name rahul
```


2. deleteMany(filter, options)
```js
db.collection_name.deleteMany({})  // It we dont pass any value in it, it will delete all the row of this collection
db.collection_name.deleteMany({
    marker: 'toDelete'  // It will delete all the row having marker key and toDelete as value
})
```

> ### MongoDb use BSON ie "Binaray JSON" to storing in the database. This is because it is more efficient to store than JSON data. Efficient in terms of space and size persepective, MongoDB drivers converts the JSON to BSON, Also BSON suppots additional types eg is ObjectId("hiikbs9dshu9uhij"), ObjectId is not supported by JSON but by the BSON.


- Passenger in MongoDb, It is bascially filtering to be sent object
- Like we want to sent an objects 6 key value pair only but the object has 10 key value pair instead
db.collection_name.find({},{ name: 1 , _id: 0})
- Here we want all the row but but ouput has name only. 1 will act as true means it will provide only name in output
- Id comes by default, if we dont want id then use it with 0 ie false

> ### Validation Schema

- 'posts' is the collection name
- in required, we define what it is expecting and in properties, bson type defined what is expecting and description is the error message

```js
db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  }
});

// to update the validation
db.runCommand({collMod: 'schema_validation_name', ...uper wala pura bas updated form me})
// eg is below
db.runCommand({
    collMod: 'posts',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'text', 'creator', 'comments'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          text: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          creator: {
            bsonType: 'objectId',
            description: 'must be an objectid and is required'
          },
          comments: {
            bsonType: 'array',
            description: 'must be an array and is required',
            items: {
              bsonType: 'object',
              required: ['text', 'author'],
              properties: {
                text: {
                  bsonType: 'string',
                  description: 'must be a string and is required'
                },
                author: {
                  bsonType: 'objectId',
                  description: 'must be an objectid and is required'
                }
              }
            }
          }
        }
      }
    },
    validationAction: 'warn' // default value is error means if it fails throw the error and not to update the data. If warn means update and send message in log file
  });

```

> ### Mongo operators like less then, more then etc - https://www.mongodb.com/docs/manual/reference/operator/query/

> ### For nested query search
```js
db.collection_name.find({ 'rating.average' : { $gt : 7 } })

db.collection_name.find({ 'rating.average' : { $gt : 7 } }).count()  // It gives the count of data available

db.collection_name.find({$or: [ {'rating.average': { $lt: 5 }}, { 'rating.average': {$gt: 9.3} } ]})

db.collection_name.find({$and: [ {'rating.average': { $lt: 5 }}, { 'generes': 'Drama' } ]})
db.collection_name.find({'rating.average': { $lt: 5 }}, { 'generes': 'Drama' })
// this and above are same in functioning. some times it working differently when we have the same key in both condition. 
// them we should use the above condition because in Object if we have the same key last key update the value 
```

> ### we can use the expres because in it we can make various type of conditions
```js
db.collection_name.find({$expr: { $gte: [ $cond: { if: { $gte: [ '$volume',190 ] }, then: { $subtract: [ '$volume', 10 ] }, else: '$volume' }}, '$target'] }})
```

- To search or find inside the array, then we can use the syntex like for searching in nested object ie using the dot(.)
- We can search using the length of the array by using the size

> ### Pagination can be done by using the skip syntex
```js
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(10)  // it can go on like 10,20,30,...
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(1020).limit(10)  // limit is the how much you want to show
```


> ### Projection : One document or row has many data but we want to show only few data then projection comes into play
```js
db.collection_name.find({}, {name: 1, generes: 1, runtime: 1})  // It means we want to show only name, generes and runtime, if we want to exclude the id, we have to manually add _id:0

// Slice is used on the array to show how much of array we want to show. below generes have many value in array but it will show first two
db.collection_name.find({'rating.average': {$gt: 9}}, {generes: {$slice: 2}, name: 1})  // we can provide the array index in slice value
```

> ### Geospatial Data - In MongoDB, you can store geospatial data as GeoJSON objects or as legacy coordinate pairs.

> ### GeoJSON Objects
- To calculate geometry over an Earth-like sphere, store your location data as GeoJSON objects.
- If specifying latitude and longitude coordinates, list the longitude first, and then latitude. GeoJSON has type and coordinates as an array
```js
db.collection_name.insertOne({name: "test institute", location: {type: "Point", coordinates: [-122.34567, 37.5345678]}})
```

// We have the near function which provides the nearst saved avilable location from the database
// when we add the recantagle box or polygon, then the type we use is not 'point', type is 'Polygon". we add 5 values inside the coordinates, first coordinate again added at the end in order to complete the box





// -----------------------------------     AGGregation        ----------------------------------

```
https://www.mongodb.com/docs/manual/aggregation/

https://www.mongodb.com/docs/manual/reference/operator/aggregation/

https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/      These are the operator used in the aggregation pipeline
```

1. Aggregation operations process multiple documents and return computed results.

2. In aggregation, the sequence matters

```js
db.collection_name.aggregate([
    { $match: { gender: 'female' } },   // match acts as filter, we filtered through the gender having female

    { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } },  
    // as name states group do same, in _id we pass on which basis we want grouping, the "state" text can be anything, its the output group name. "$location.state" is the value from document which we want grouping and $ is must, it defines it is dynamic field instead of hard code value also it consider it from root level. "totalPersons" is the name of what type of group we want,  for that type visit group on website, here we have taken the sum, its value is multiply value means so we have taken as 1

    { $sort: { totalPersons: -1 } }  // totalPersons is the value on which we want sorting, -1 means decending and 1 means ascending
])
```


3. `$project` works same as projection but with much greater power
  - we can show a new field which was not in the database, by combining the existing data from the database eg is fullName below
  ```js
    db.collection_name.aggregate([
        { $project: { _id: 0, gender: 1, fullName: { $concat: [ {$toUpper: '$name.first'} ,'',{$toUpper: '$name.last'}] } } }  
    ])
    // _id:0 means we do not want that key in output, we want the gender and fullname
  ```

4. `$unwind`
- To deflat the array into separate row we use the unwind
```js
// eg one row name hobbies : ['cooking', 'dancing'] gets converted into two separate row of hobbies hobbies : 'cooking' and hobbies : 'dancing'
db.collection_name.aggregate([
    { $unwind: '$name_of_node_of array' }
])
```


5. `addtoset` - It works same as push aggregation but when we use push it might create the duplicate data in the array, but addtoset create the unique array, if any duplicate value comes it removes it

```js
db.collection_name.aggregate([
    { $group: {_id: '$name_of_node_of array' }, allHobies: {$addToSet: "$hobbies"}}
])
```

6. `$slice`, it is like splice of JS
```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $slice: ["$examScore", 1] } } }   // here we are geeting first value from array of examScore
])
```

7. `$size`, it gives the count of the array, below give the length of examScore array
```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $size: "$examScore" } } }
])
```

8. `filter in project`, as name says it works same function
```js
db.collection_name.aggregate([
    { $project: { _id: 0, scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ['$$sc.score, 60'] } } } } }
])
// in above, scores is any word we want. filter and input are fixed keyword, input value is the node of the object or row. as is alias. $$ is because we are referring the alias.
```

9. `$bucket` (aggregation pipelines)

#### 🔹 What is `$bucket`?

The `$bucket` stage in an **aggregation pipeline** groups documents into fixed **ranges (buckets)** based on a field value you specify.
It’s similar to building **histograms** in data analysis.


#### 🔹 Syntax

```js
{
  $bucket: {
    groupBy: <expression>,       // Field or expression to categorize
    boundaries: [ <lower1>, <lower2>, ... <upperN> ], // Ordered values defining ranges
    default: <literal>,          // (Optional) Bucket for out-of-range values
    output: {                    // (Optional) Accumulators for each bucket
      <field1>: { <accumulator> : <expression> },
      <field2>: { <accumulator> : <expression> }
    }
  }
}
```

#### Key Rules:

* `boundaries` must be an **array of ascending values**.
* Each bucket includes its **lower bound** but **excludes the upper bound** (`[lower, upper)`).
* A document that falls outside all buckets goes to the **default** bucket (if provided).


## 🔹 Example 1: Simple Histogram

Say we have a `products` collection:

```json
{ "name": "Pen", "price": 5 }
{ "name": "Notebook", "price": 20 }
{ "name": "Bag", "price": 50 }
{ "name": "Shoes", "price": 120 }
{ "name": "Laptop", "price": 900 }
```

Query:

```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 50, 100, 500, 1000],
      default: "Other",
      output: {
        count: { $sum: 1 },
        items: { $push: "$name" }
      }
    }
  }
])
```

Result:

```json
[
  { "_id": 0, "count": 2, "items": ["Pen", "Notebook"] },
  { "_id": 50, "count": 1, "items": ["Bag"] },
  { "_id": 100, "count": 1, "items": ["Shoes"] },
  { "_id": 500, "count": 1, "items": ["Laptop"] }
]
```


#### 🔹 Example 2: With Default Bucket

If a document’s value doesn’t fit any boundary, it goes to `default`:

```js
db.sales.aggregate([
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 100, 500, 1000],
      default: "OutOfRange",
      output: {
        total: { $sum: "$amount" },
        transactions: { $sum: 1 }
      }
    }
  }
])
```


#### 🔹 `$bucket` vs `$bucketAuto`

* **`$bucket`** → You define the **exact boundaries**.
* **`$bucketAuto`** → MongoDB automatically divides documents into **equal-sized groups**.

Example:

```js
{
  $bucketAuto: {
    groupBy: "$price",
    buckets: 4
  }
}
```

This splits into 4 equal ranges automatically.




> ### Indexes in MongoDB

In MongoDB, an index is a `B-tree data structure` that improves the speed of queries by allowing the database to quickly locate and access the documents without scanning every document in a collection (called a `collection scan`, This is slow for large datasets.)

### Trade-offs

- `Extra disk space`: Indexes take storage
- `Slower writes`: Insert/Update/Delete operations need to update indexes
- `Memory considerations`: Too many indexes can impact performance


### Indexes Behind the Scenes
What does createIndex() do in detail?

Whilst we can't really see the index, you can think of the index as a simple list of values + pointers to the original document.

Something like this (for the "age" field):

(29, "address in memory/ collection a1")

(30, "address in memory/ collection a2")

(33, "address in memory/ collection a3")

The documents in the collection would be at the "addresses" a1, a2 and a3. The order does not have to match the order in the index (and most likely, it indeed won't).

The important thing is that the index items are ordered (ascending or descending - depending on how you created the index). createIndex({age: 1}) creates an index with ascending sorting, createIndex({age: -1}) creates one with descending sorting.

MongoDB is now able to quickly find a fitting document when you filter for its age as it has a sorted list. Sorted lists are way quicker to search because you can skip entire ranges (and don't have to look at every single document).

Additionally, sorting (via sort(...)) will also be sped up because you already have a sorted list. Of course this is only true when sorting for the age

- One real life example, suppose you done indexing of particular key of large data set, and then you run some query which which return almost all data, then that time if we compare the time period of indexing and without indexing, then indexing query will take much time, eg video - 130


### compound index

A **compound index** in **MongoDB** is an index that includes **multiple fields** in a single index structure.

This is useful when you frequently query using multiple fields together, because MongoDB can optimize those queries with a single index rather than combining multiple indexes.


#### How Compound Indexing Works

* A compound index is created on **two or more fields**.
* The **order of fields matters** in a compound index.
* MongoDB can use the **prefix of the index** (called the **index prefix rule**) when executing queries.


#### Example

```js
// Create a compound index on name (ascending) and age (descending)
db.users.createIndex({ name: 1, age: -1 });
```

#### Queries that can use this index:

✅ Uses `{ name: 1, age: -1 }` index:

```js
db.users.find({ name: "Alice" });
db.users.find({ name: "Alice", age: 25 });
db.users.find({ name: "Alice" }).sort({ age: -1 });
```

❌ Cannot use the index effectively:

```js
db.users.find({ age: 25 }); // Skips first field 'name'
```

### Index Prefix Rule

* A compound index can be used for queries that match a **leftmost prefix** of the fields.
* Example with index `{ a: 1, b: 1, c: 1 }`:

  * Query on `{ a: ... }` ✅
  * Query on `{ a: ..., b: ... }` ✅
  * Query on `{ b: ... }` ❌ (skips `a`)
  * Query on `{ a: ..., c: ... }` ✅ (partial, still works since `a` is included)


> ### Sort in mongodb


In **MongoDB**, sorting is done using the `.sort()` method in a query.
But when you have **millions of documents**, sorting can be very expensive unless you use **indexes** properly.


#### Basic Sort Syntax

```js
// Sort ascending by "age"
db.users.find().sort({ age: 1 });

// Sort descending by "age"
db.users.find().sort({ age: -1 });

// Sort by multiple fields (age ascending, then name descending)
db.users.find().sort({ age: 1, name: -1 });
```

#### How Sorting Works Internally

1. **Without an index**

   * MongoDB loads all matching documents into memory and sorts them.
   * If the dataset is large (millions of docs), this can:

     * Use lots of **RAM**
     * Spill data to **disk** if `allowDiskUse: true` is enabled
     * Be **very slow**

2. **With an index**

   * If the query **sort order matches an index**, MongoDB can just **traverse the index in order**.
   * No in-memory sorting is needed, making it **much faster**.


## 🔹 Example with Index for Sorting

```js
// Create index on "age"
db.users.createIndex({ age: 1 });

// Now sorting uses the index
db.users.find().sort({ age: 1 });
```

👉 If you sort on `{ age: 1 }` after creating this index, MongoDB will use the index and avoid scanning/sorting the whole dataset.


####  Sorting with Millions of Documents

### ✅ Best Practices

1. **Always use an index for sorting**

   * Example:

     ```js
     db.users.createIndex({ age: 1, name: 1 });
     db.users.find().sort({ age: 1, name: 1 });
     ```

2. **Use `limit()` with sort**

   * Instead of sorting all documents, limit the result set:

     ```js
     db.users.find().sort({ age: 1 }).limit(100);
     ```
   * Helps when paginating.

3. **For pagination use range queries (`$gt`, `$lt`) instead of skip/limit**

   * Avoid:

     ```js
     db.users.find().sort({ age: 1 }).skip(1000000).limit(10);
     ```

     (MongoDB still has to scan and skip a million docs 😬)
   * Better:

     ```js
     db.users.find({ age: { $gt: lastAge } }).sort({ age: 1 }).limit(10);
     ```

     (Efficient, uses index)

4. **Use `allowDiskUse: true` if needed**

   * For big aggregations with sort:

     ```js
     db.users.aggregate([
       { $sort: { age: 1 } }
     ], { allowDiskUse: true });
     ```
   * Lets MongoDB spill to disk if data doesn’t fit in memory.


⚡ **In short:**

* `.sort()` works fine for small data.
* With **millions of documents**, always create an **index** matching your sort order.
* Use **limit()** and **range-based pagination** to avoid performance issues.



> ### Partial Filter in indexing

In **MongoDB**, a **partial index** is an index that only includes documents in a collection that **match a filter expression**.

Instead of indexing every document, MongoDB builds the index on a **subset of documents**. This saves space and makes queries on that subset much faster.


#### Why Use Partial Indexes?

* **Smaller index size** → less disk + RAM usage
* **Faster writes** → fewer documents to maintain in the index
* **Targeted performance** → only optimize queries that matter (not the whole dataset)


#### Syntax

```js
db.collection.createIndex(
  { fieldName: 1 }, 
  { partialFilterExpression: { status: "active" } }
);
```

This means:

* Only documents with `{ status: "active" }` will be indexed.
* Queries filtering by `{ status: "active" }` can use this index.


## 🔹 Example

Suppose you have a `users` collection with millions of docs:

```json
{ name: "Alice", status: "active" }
{ name: "Bob", status: "inactive" }
{ name: "Charlie", status: "active" }
```

If you mostly query **active users**:

```js
db.users.find({ status: "active", name: "Alice" });
```

👉 Instead of indexing all `status` values:

```js
db.users.createIndex({ name: 1, status: 1 });
```

You can use a **partial index**:

```js
db.users.createIndex(
  { name: 1 },
  { partialFilterExpression: { status: "active" } }
);
```

Now:

* Only documents with `status: "active"` go into the index.
* Queries with `status: "active"` use the index.
* `status: "inactive"` docs don’t bloat the index.


#### Supported Filter Operators

Partial indexes support a subset of query operators:

* Equality (`{ field: value }`)
* `$gt`, `$lt`, `$gte`, `$lte`
* `$exists`
* `$type`
* `$in` (with only equality values)
* `$and`

⚠️ Not all operators are supported (e.g., `$or`, `$nor`, `$regex` not allowed).


#### Example with Numeric Filter

Index only **adult users**:

```js
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gte: 18 } } }
);
```

Queries like:

```js
db.users.find({ age: { $gte: 18 } }).sort({ age: 1 });
```

will use this index.


⚡ **In short:**
A **partial index** is an index built only on documents that match a filter condition. It’s super useful when your queries target a **specific subset of data** (e.g., `active users`, `non-null fields`, `age > 18`), especially in collections with **millions of documents**.



**Note:** We can create the index of the key which can be array or object, indexing is not specific to the string or number, but for compound index you can not create the combine of two array key index.


> #### Text Indexing


#### 🔹 Normal String Indexing (B-tree Index)

* **Definition**: A regular index on a string field (e.g., `{ name: 1 }`).
* **How it works**:

  * Uses a **B-tree** structure.
  * Efficient for **prefix queries** and **exact matches**.
* **Examples**:

  ```js
  db.users.createIndex({ name: 1 })

  // Efficient queries:
  db.users.find({ name: "Alice" })          // exact match
  db.users.find({ name: /^Al/ })            // prefix search (e.g. "Al...")

  // NOT efficient:
  db.users.find({ name: /lice$/ })          // suffix search
  db.users.find({ name: /li/ })             // substring search
  ```
* **Best for**:

  * Exact lookups
  * Sorting
  * Range/prefix queries


#### 🔹 Text Indexing (`text`)

* **Definition**: Special index for **full-text search** across words inside strings (tokenized).
* **How it works**:

  * Tokenizes text into words and stores them in an **inverted index**.
  * Supports stemming (language-aware, e.g., “running” → “run”).
  * Can index multiple fields together.
* **Examples**:

  ```js
  db.articles.createIndex({ content: "text", title: "text" })

  db.articles.find({ $text: { $search: "mongodb indexing" } })
  ```
* **Features**:

  * Can search **anywhere in text**, not just prefix.
  * Supports relevance scoring with `textScore`.
  * Allows language-specific stop words & stemming.
* **Limitations**:

  * Only one text index per collection.
  * No regex/prefix optimization (not suitable for `LIKE "abc%"`).
  * Not good for sorting large text fields alphabetically.


#### ⚡ Key Differences

| Feature             | Normal String Index                   | Text Index                               |
| ------------------- | ------------------------------------- | ---------------------------------------- |
| **Index type**      | B-tree                                | Inverted index                           |
| **Best for**        | Exact match, prefix queries, sorting  | Full-text search, keyword relevance      |
| **Query ops**       | `=`, `$in`, `$regex` (prefix only)    | `$text: { $search: "..." }`              |
| **Multiple fields** | One index per field or compound index | One text index can cover multiple fields |
| **Limitations**     | No substring search                   | Only one text index per collection       |


👉 **Rule of thumb**:

* If you need **exact match / prefix search / sorting** → use **normal index**.
* If you need **searching words anywhere in text / relevance ranking** → use **text index**.



> ### exists - field name exists in a document.

```js
{ field: { $exists: <boolean> } }
```

> ### How to use below For getting the data
```
https://www.mongodb.com/docs/manual/reference/mql/expressions/
```

1. findOne, find, find k ander second argument
2. Comparison operator
3. in & nin
4. or & nor
5. $and
6. $not
7. $type
8. $regex
9. $exp
10. $size, $all, $elemMatch


> ### Below fields to Update the data

```
https://www.mongodb.com/docs/manual/reference/mql/update/
```
Uper k sare side menu check karo

1. updateOne, updateMany
2. $set, $inc (if you use negative value in inc then it works as decrement)
3. $min, $max, $mul
4. $unset, $rename, $upsert

$ sign find in mongodb eg hobbies.$.highfrequency = true




video -73,128