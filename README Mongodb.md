> ### What is MongoDB?

MongoDB is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function which is the equivalent of relational database tables.


### Collection in mongo is same as table in mysql

<br>

> ### Database -> Collection -> Documents

```
https://www.mongodb.com/docs/manual/reference/mql/expressions/
```
```
https://www.mongodb.com/docs/manual/reference/operator/update/
```

> ### Mongo operators like less then, more then etc - 
```
https://www.mongodb.com/docs/manual/reference/operator/query/
```

<br>

### Rule of thumnb

- In object, when using the LHS, use path without "$", but on RHS use with "$". 
- Function k name k sarh $ use kia jata h
- Jab object ki value chaiye hoti h to $ use karte h key k sath

```js
// In queries / projections
db.collection.find({ "grades.score": { $gt: 80 } })

// aggregation

db.collection.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$name", avgScore: { $avg: "$grades.score" } } }
])
```

<br>

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

- Keep in mind, we have the insert, insertOne, insertMany, but `insert method should be avoided`, altough it works but general pratice is to avoid it.

- To add many values, we have the insertMany(data,options)
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

- To update or change the data

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

<br>

> ### MongoDB use BSON ie "Binaray JSON" to storing in the database. 
This is because it is more efficient to store than JSON data. Efficient in terms of space and size persepective, MongoDB drivers converts the JSON to BSON, Also BSON suppots additional types eg is ObjectId("hiikbs9dshu9uhij"), ObjectId is not supported by JSON but by the BSON.

<br>

> ### To get the data of the collection

1. find(filter,options)

    ```js
      // This is to get all data of the collection
      db.collection_name.find()  

      // It gives the same result but in the more structured form
      db.collection_name.find().pretty()   

      // This condition acts as filter, gives the result of all row having the name = 'max'
      db.collection_name.find({
        name: 'max' 
      })

      // we can also find the value in nested object, its like traversing in object
      db.collection_name.find({'status.details.responsible': 'max'})

      // We can also provide the condition in the filter, eg is below
      db.collection_name.find({
          distance: {
            $gt : 10000   // $gt acts as condition of greater then
          }
      })

      // It gives the count of data available
      db.collection_name.find({ 'rating.average' : { $gt : 7 } }).count()
    ```
<br>

> ### Projection : One document or row has many data but we want to show only few data then projection comes into play

  ```js
    db.collection_name.find({}, {name: 1, generes: 1, runtime: 1})  
    // It means we want to show only name, generes and runtime, if we want to exclude the id, we have to manually add _id:0


    // Slice is used on the array to show how much of array we want to show. 
    // below generes have many value in array but it will show first two
    // we can provide the array index in slice value
    db.collection_name.find({'rating.average': {$gt: 9}}, {generes: {$slice: 2}, name: 1})  
  ```
<br>

> ### OR, AND Operator - It takes array of conditions
  ```js
    db.collection_name.find({$or: [ {'rating.average': { $lt: 5 }}, { 'rating.average': {$gt: 9.3} } ]})

    db.collection.find({ $or: [ { "cuisine": "American " }, { "cuisine": "Chinese" } ], "borough": "Bronx" })

    db.collection_name.find({$and: [ {'rating.average': { $lt: 5 }}, { 'generes': 'Drama' } ]})
  ```

<br>

> ### we can use the expres because in it we can make various type of conditions
  ```js
  db.collection_name.find({
      $expr: {
          $gte: [$cond: {
                  if: {
                      $gte: ['$volume', 190]
                  },
                  then: {
                      $subtract: ['$volume', 10]
                  },
                  else: '$volume'
              }
          },
          '$target']
      }
  })
  ```

- To search or find inside the array, then we can use the syntex like for searching in nested object ie using the dot(.)
- We can search using the length of the array by using the size
  ```js
  {
    "_id": 1,
    "name": "Alice",
    "courses": ["Math", "Science", "English"]
  }
  {
    "_id": 2,
    "name": "Bob",
    "courses": ["Math"]
  }
  {
    "_id": 3,
    "name": "Charlie",
    "courses": ["Math", "Science"]
  }

  db.students.find({ courses: { $size: 2 } })
  ```

<br>

> ### in vs or operator

#### `$in` Operator

* Used to match a **single field** against **multiple possible values**.
* Equivalent to SQL’s `IN`.

**Example**: Find restaurants whose cuisine is either *Italian* or *Mexican*:

```js
db.collection.find({
  cuisine: { $in: ["Italian", "Mexican"] }
})
```

This is shorthand for:

```js
db.collection.find({
  $or: [{ cuisine: "Italian" }, { cuisine: "Mexican" }]
})
```

**Note:** Similary we have "$nin" means "not in", Opposite of "$in"

This finds restaurants where cuisine is not American or Chinese.
```js
db.collection.find({
  cuisine: { $nin: ["Italian", "Mexican"] }
})
```

✅ `$in` is more compact and efficient when checking multiple values of the **same field**.

<br>

#### `$or` Operator

* Used to combine **different conditions** across one or multiple fields.
* Each clause in `$or` is an independent query.

**Example**: Find restaurants that are either in the *Bronx* OR serve *Italian* cuisine:

```js
db.collection.find({
  $or: [
    { borough: "Bronx" },
    { cuisine: "Italian" }
  ]
})
```

Here `$in` would **not work**, since the conditions are on **different fields**.


#### Rule of Thumb

* Use **`$in`** → when matching **one field** against multiple values.
* Use **`$or`** → when matching across **different fields** or combining complex conditions.

<br>


> ### exists - field name exists in a document.

```js
{ field: { $exists: <boolean> } }
```

<br>

> ### Below are the some sample question

```js
{
  "address": {
     "building": "1007",
     "coord": [ -73.856077, 40.848447 ],
     "street": "Morris Park Ave",
     "zipcode": "10462"
  },
  "borough": "Bronx",
  "cuisine": "Bakery",
  "grades": [
     { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
     { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
     { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
     { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
     { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
  ],
  "name": "Morris Park Bake Shop",
  "restaurant_id": "30075445"
}

// Q - Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
db.collection.find({
  "grades.score": {
    "$lte": 10
  }
},
{
  restaurant_id: 1,
  name: 1,
  borough: 1,
  cuisine: 1
})


// Q -  Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.
db.restaurants.find({
    "address.coord.1": {
        $gt: 42,
        $lte: 52
    }
}, {
    "restaurant_id": 1,
    "name": 1,
    "address": 1,
    "coord": 1
});

// Q - Write a MongoDB query to Get all data which contains the street.
db.collection.find({
  "address.street": {
    $exists: true
  }
})

// Q - Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.

db.collection.find(
  { name: /^Wil/ },   // regex: name begins with "Wil"
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 } // projection
)

// Other way
db.collection.find(
  { name: { $regex: "^Wil" } }, 
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

```

<br>

Q. How to combine data from multiple collections into one collection?

**$lookup:**

Performs a left outer join to an unsharded collection in the same database to filter in documents from the “joined” collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage.

**Syntax:**

```js
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
```

<br>

> ### Pagination can be done by using the skip syntex
```js
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(10)  // it can go on like 10,20,30,...
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(1020).limit(10)  // limit is the how much you want to show
```

<br>
<br>

// -----------------------------------     AGGregation        ----------------------------------

```
https://www.mongodb.com/docs/manual/aggregation/

https://www.mongodb.com/docs/manual/reference/operator/aggregation/

https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/      These are the operator used in the aggregation pipeline
```

<br>


1. In aggregation, the sequence matters

```js
db.collection_name.aggregate([
    { $match: { gender: 'female' } },   // match acts as find, same find query will work in match, we filtered through the gender having female

    { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } },  
    // as name states group do same, in _id we pass on which basis we want grouping, the "state" text can be anything, its the output group name. "$location.state" is the value from document which we want grouping and $ is must, it defines it is dynamic field instead of hard code value also it consider it from root level. "totalPersons" is the name of what type of group we want,  for that type visit group on website, here we have taken the sum, its value is multiply value means so we have taken as 1

    { $sort: { totalPersons: -1 } }  // totalPersons is the value on which we want sorting, -1 means decending and 1 means ascending
])
```

<br>

2. `$project` works same as projection
  - we can show a new field which was not in the database, by combining the existing data from the database eg is fullName below
  ```js
    db.collection_name.aggregate([
        { $project: { _id: 0, gender: 1, fullName: { $concat: [ {$toUpper: '$name.first'} ,'',{$toUpper: '$name.last'}] } } }  
    ])
    // _id:0 means we do not want that key in output, we want the gender and fullname
  ```
<br>

3. `$unwind`
- To deflat the array into separate row we use the unwind
```js
db.collection_name.aggregate([
    { $unwind: '$name_of_node_of array' }
])

// Before unwind
{ "_id": 1, "tags": ["food", "bakery", "coffee"] }

// After unwind
{ "_id": 1, "tags": "food" }
{ "_id": 1, "tags": "bakery" }
{ "_id": 1, "tags": "coffee" }
```

<br>

4. `addtoset` - It works same as push aggregation but when we use push it might create the duplicate data in the array, but addtoset create the unique array, if any duplicate value comes it removes it

```js
db.collection_name.aggregate([
    { $group: {_id: '$name_of_node_of array' }, allHobies: {$addToSet: "$hobbies"}}
])
```
<br>

6. `$slice`, it is like splice of JS
```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $slice: ["$examScore", 1] } } }   // here we are geeting first value from array of examScore
])
```
<br>


7. `$size`, it gives the count of the array, below give the length of examScore array
```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $size: "$examScore" } } }
])
```
<br>


8. `filter in project`, as name says it works same function
```js
db.collection_name.aggregate([
    { $project: { _id: 0, scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ['$$sc.score, 60'] } } } } }
])
// in above, scores is any word we want. filter and input are fixed keyword, input value is the node of the object or row. as is alias. $$ is because we are referring the alias.
```
<br>

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


#### Example 1: Simple Histogram

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

<br>

####  Example 2: With Default Bucket

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


```js
{
  "address": {
     "building": "1007",
     "coord": [ -73.856077, 40.848447 ],
     "street": "Morris Park Ave",
     "zipcode": "10462"
  },
  "borough": "Bronx",
  "cuisine": "Bakery",
  "grades": [
     { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
     { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
     { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
     { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
     { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
  ],
  "name": "Morris Park Bake Shop",
  "restaurant_id": "30075445"
}


// Find the average score for each restaurant

db.restaurants.aggregate([{
    $unwind: "$grades"
  },
  {
    $group: {
      _id: "$name",
      avgScore: {
        $avg: "$grades.score"  // we $max, $min
      }
    }
  }
])

// Find the count of restaurants in each borough

db.collection.aggregate([
  {
    $group: {
      _id: "$borough",
      countScore: {
        "$count": {}
      }
    }
  }
])

// or 

db.restaurants.aggregate([{
  $group: {
    _id: "$borough",
    count: {
      $sum: 1
    }
  }
}])


// Find the count of restaurants for each cuisine and borough
db.restaurants.aggregate([{
  $group: {
    _id: {
      cuisine: "$cuisine",
      borough: "$borough"
    },
    count: {
      $sum: 1
    }
  }
}])


// Find the count of restaurants received grade 'A' for each cuisine
db.restaurants.aggregate([
  {
    $unwind: "$grades"
  },
  {
    $match: {
      "grades.grade": "A"
    }
  },
  {
    $group: {
      _id: "$cuisine",
      count: {
        $sum: 1
      }
    }
  }
])


// Find top 3 cuisines by number of restaurants.
db.restaurants.aggregate([
  { $group: { _id: "$cuisine", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 3 }
])


```

<br>
<br>

> ### Indexes in MongoDB

In MongoDB, an index is a `B-tree data structure` that improves the speed of queries by allowing the database to quickly locate and access the documents without scanning every document in a collection (called a `collection scan`, This is slow for large datasets.)

#### Trade-offs

- `Extra disk space`: Indexes take storage
- `Slower writes`: Insert/Update/Delete operations need to update indexes
- `Memory considerations`: Too many indexes can impact performance

<br>

#### Indexes Behind the Scenes

What does createIndex() do in detail?

- Whilst we can't really see the index, you can think of the index as a simple list of values + pointers to the original document.

- The important thing is that the `index items are ordered (ascending or descending - depending on how you created the index)`. createIndex({age: 1}) creates an index with ascending sorting, createIndex({age: -1}) creates one with descending sorting.

- One real life example, suppose you done indexing of particular key of large data set, and then you run some query which which return almost all data, then that time if we compare the time period of indexing and without indexing, then indexing query will take much time, eg video - 130

<br>

### Q. What are the types of Indexes available in MongoDB?

1. Single Field Index

```js
db.people.createIndex( {age : 1} ) // creates an ascending index

db.people.createIndex( {age : -1} ) // creates a descending index
```

With this kind of index we can improve all the queries that find documents with a condition and the age field, like the following:

```js
db.people.find( { age : 20 } )
db.people.find( { name : "Alex", age : 30 } )
db.people.find( { age : { $gt : 25} } )
```

2. Compound Index

A **Compound index** in **MongoDB** is an index that includes **multiple fields** in a single index structure.

This is useful when you frequently query using multiple fields together, because MongoDB can optimize those queries with a single index rather than combining multiple indexes.


#### How Compound Indexing Works

* A compound index is created on **two or more fields**.
* The **order of fields matters** in a compound index.
* MongoDB can use the **prefix of the index** (called the **index prefix rule**) when executing queries.


#### Example

```js
// Create a compound index on name (ascending) and age (descending)
db.users.createIndex({ name: 1, age: -1 });


// To view all indexes on the people collection
db.people.getIndexes()


// Remove Specific Index
db.collection.dropIndex()

//eg
db.accounts.dropIndex( { "tax-id": 1 } )
// Output
{ "nIndexesWas" : 3, "ok" : 1 }



// The following command removes all indexes from the accounts collection
db.collection.dropIndexes()
```
<br>

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

<br>


**3. Multikey Index**

This is the index type for arrays. When creating an index on an array, MongoDB will create an index entry for every element.

**Example**

```js
{
   "_id": 1,
   "person": { name: "John", surname: "Brown" },
   "age": 34,
   "city": "New York",
   "hobbies": [ "music", "gardening", "skiing" ]
 }
```

The multikey index can be created as:

```js
db.people.createIndex( { hobbies: 1} )
```

Queries such as these next examples will use the index:

```js
db.people.find( { hobbies: "music" } )
db.people.find( { hobbies: "music", hobbies: "gardening" } )
```



<br>

### Index Prefix Rule

* A compound index can be used for queries that match a **leftmost prefix** of the fields.
* Example with index `{ a: 1, b: 1, c: 1 }`:

  * Query on `{ a: ... }` ✅
  * Query on `{ a: ..., b: ... }` ✅
  * Query on `{ b: ... }` ❌ (skips `a`)
  * Query on `{ a: ..., c: ... }` ✅ (partial, still works since `a` is included)

<br>

## Q. ***Explain Index Properties in MongoDB?***

**1. TTL Indexes**

TTL ( **Time To Live** ) s a special index option that automatically deletes documents after a specified time. It’s useful for temporary data like session info, where documents expire and are removed without manual cleanup.

**Example**

```js
db.sessionlog.createIndex( { "lastUpdateTime": 1 }, { expireAfterSeconds: 1800 } )
```

In this case, MongoDB will drop the documents from the collection automatically once half an hour (1800 seconds) has passed since the value in **lastUpdateTime** field.

**Restrictions**

* Only single field indexes can have the TTL option
* the `_id` single field index cannot support the TTL option
* the indexed field must be a date type

<br>

**2. Partial indexes**

A partial index is an index that contains only a subset of the values based on a filter rule. They are useful in cases where:

* The index size can be reduced
* We want to index the most relevant and used values in the query conditions
* We want to index the most selective values of a field

**Example**

```js
db.people.createIndex(
   { "city": 1, "person.surname": 1 },
   { partialFilterExpression: { age : { $lt: 30 } } }
)
```

We have created a compound index on city and person.surname but only for the documents with age less than 30.
In order for the partial index to be used the queries must contain a condition on the age field.

```js
db.people.find( { city: "New Tork", age: { $eq: 20} } )
```

<br>

**3. Sparse indexes**

Sparse indexes are a subset of partial indexes. A sparse index only contains elements for the documents that have the indexed field, even if it is null.

Since MongoDB is a schemaless database, the documents in a collection can have different fields, so an indexed field may not be present in some of them.

**Example**

To create such an index use the sparse option:

```js
db.people.createIndex( { city: 1 }, { sparse: true } )
```

In this case, we are assuming there could be documents in the collection with the field city missing. Sparse indexes are based on the existence of a field in the documents and are useful to reduce the size of the index.

**4. Unique indexes**

MongoDB can create an index as unique. An index defined this way cannot contain duplicate entries.

**Example**

```js
db.people.createIndex( { city: 1 }, { unique: true } )
```

Uniqueness can be defined for compound indexes too.

```js
db.people.createIndex( { city: 1, person.surname: 1}, { unique: true } )
```

By default, the index on `_id` is automatically created as unique.

<br>

## Q. ***Can you create an index in an array field in MongoDB?***

Yes, To index a field that holds an array value, MongoDB creates an index key for each element in the array. Multikey indexes can be constructed over arrays that hold both scalar values (e.g. strings, numbers) and nested documents. MongoDB automatically creates a multikey index if any indexed field is an array.

Syntax

```js
db.collection.createIndex( { <field>: < 1 or -1 > } )
```

For example, consider an inventory collection that contains the following documents:

```js
{ _id: 10, type: "food", item: "aaa", ratings: [ 5, 8, 9 ] }
{ _id: 11, type: "food", item: "bbb", ratings: [ 5, 9 ] }
{ _id: 12, type: "food", item: "ccc", ratings: [ 9, 5, 8, 4, 7 ] }
```

The collection has a multikey index on the ratings field:

```js
db.inventory.createIndex( { ratings: 1 } )
```

The following query looks for documents where the ratings field is the array [ 5, 9 ]:

```js
db.inventory.find( { ratings: [ 5, 9 ] } )
```

MongoDB can use the multikey index to find documents that have 5 at any position in the ratings array. Then, MongoDB retrieves these documents and filters for documents whose ratings array equals the query array [ 5, 9 ].

<br>
<br>

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
<br>

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

<br>

#### Example with Index for Sorting

```js
// Create index on "age"
db.users.createIndex({ age: 1 });

// Now sorting uses the index
db.users.find().sort({ age: 1 });
```

👉 If you sort on `{ age: 1 }` after creating this index, MongoDB will use the index and avoid scanning/sorting the whole dataset.

<br>

###  Sorting with Millions of Documents

#### Best Practices

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

<br>
<br>

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

```js
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


> ### elemMatch in mongodb

In **MongoDB**, the `$elemMatch` operator is used to **match documents that contain an array field with at least one element that matches all the specified criteria**.

It’s particularly useful when you want to apply **multiple conditions to a single element in an array** (instead of matching conditions across different elements).


#### **Syntax**

```js
{ <arrayField>: { $elemMatch: { <query1>, <query2>, ... } } }
```


#### **Example Usage**

#### 1. Basic Match

Suppose you have a collection of students:

```json
{
  "_id": 1,
  "name": "Alice",
  "grades": [82, 90, 91]
},
{
  "_id": 2,
  "name": "Bob",
  "grades": [75, 88, 95]
}
```

Find students with a grade **greater than 85 and less than 92**:

```js
db.students.find({
  grades: { $elemMatch: { $gt: 85, $lt: 92 } }
})
```

✅ This ensures **both conditions apply to the same grade element**.
Without `$elemMatch`, MongoDB might match `90` (for `$lt: 92`) and `91` (for `$gt: 85`) separately, which isn’t what we want.


#### 2. Matching Objects Inside an Array

Suppose we have:

```json
{
  "_id": 1,
  "name": "Alice",
  "courses": [
    { "subject": "Math", "score": 92 },
    { "subject": "History", "score": 85 }
  ]
}
```

Find students who have a course where:

* subject = `"Math"`
* score ≥ 90

```js
db.students.find({
  courses: { $elemMatch: { subject: "Math", score: { $gte: 90 } } }
})
```

#### 3. Difference Without `$elemMatch`

If you do:

```js
db.students.find({
  grades: { $gt: 85, $lt: 92 }
})
```

MongoDB treats conditions independently → it will return docs where **some grade > 85** and **some grade < 92**, even if they are different elements.

So `$elemMatch` is required when **all conditions must apply to the same array element**.

- Also elemMatch tab use karte h jab same data k ander 2 query lagani ho, like same object pe hi name and age ki query lagani ho
```js
d = {
  name: rahul,
  age: 26
}
```

> ### Below fields to Update the data

```
https://www.mongodb.com/docs/manual/reference/mql/update/
```
Uper k sare side menu check karo

1. updateOne, updateMany
2. $set, $inc (if you use negative value in inc then it works as decrement), unset
3. $min, $max, $mul
4. $unset, $rename, $upsert

$ sign find in mongodb eg hobbies.$.highfrequency = true




video -73,128

Q 12, 


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


> ### Geospatial Data - In MongoDB, you can store geospatial data as GeoJSON objects or as legacy coordinate pairs.

> ### GeoJSON Objects
- To calculate geometry over an Earth-like sphere, store your location data as GeoJSON objects.
- If specifying latitude and longitude coordinates, list the longitude first, and then latitude. GeoJSON has type and coordinates as an array
```js
db.collection_name.insertOne({name: "test institute", location: {type: "Point", coordinates: [-122.34567, 37.5345678]}})
```


Q. How to validate data in mongodb?

`db.collection.validate(<documents>)` validates a collection. The method scans a collection data and indexes for correctness and returns the result.

**Syntax:**
```js
db.collection.validate( {
   full: <boolean>,          // Optional
   repair: <boolean>         // Optional, added in MongoDB 5.0
} )
```

**Example:**

```js
// validate a collection using the default validation setting
db.myCollection.validate({ })

// perform a full validation of collection
db.myCollection.validate( { full: true } )

// repair collection
db.myCollection.validate( { repair: true } )
```


Q. How to join 3 or more collections in MongoDB?

Let's say we have 3 hypothetical collections in MongoDB: customers, orders, and orderItems.

Each customer has multiple orders, and each order has multiple order items.

**Example:**

```js
// customers
[
    {
        customer_id: 1,
        name: "Jim Smith",
        email: "jim.smith@example.com"
    },
    {
        customer_id: 2,
        name: "Bob Jones",
        email: "bob.jones@example.com"
    }
]


// orders
[
    {
        order_id: 1,
        customer_id: 1
    },
    {
        order_id: 2,
        customer_id: 1
    }
]


// orderItems
[
    {
        order_item_id: 1,
        name: "Foo",
        price: 4.99,
        order_id: 1
    },
    {
        order_item_id: 2,
        name: "Bar",
        price: 17.99,
        order_id: 1
    },
    {
        order_item_id: 3,
        name: "baz",
        price: 24.99,
        order_id: 2
    }
]
```

**Desired Result:**

```js
[
    {
        customer_id: 1,
        name: "Jim Smith",
        email: "jim.smith@example.com"
        orders: [
            {
                order_id: 1,
                items: [
                    {
                        name: "Foo",
                        price: 4.99
                    },
                    {
                        name: "Bar",
                        price: 17.99
                    }
                ]
            },
            {
                order_id: 2,
                items: [
                    {
                        name: "baz",
                        price: 24.99
                    }
                ]
            }
        ]
    },
    {
        customer_id: 2,
        name: "Bob Jones",
        email: "bob.jones@example.com"
        orders: []
    }
]
```

**Answer**

Do nested lookup using lookup with pipeline,

1. `$lookup` with orders collection.
2. `let`, define variable customer_id that is from main collection, to access this reference variable inside pipeline using `$$` like `$$customer_id`.
3. `pipeline` can add pipeline stages same as we do in root level pipeline
4. `$expr` whenever we match internal fields it requires expression match condition, so `$$customer_id` is parent collection field that declared in let and $customer_id is child collection's/current collection's field
5. `$lookup` with orderitems collection

```js
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { customer_id: "$customer_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$customer_id", "$customer_id"] } } },
        {
          $lookup: {
            from: "orderitems",
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
          }
        }
      ],
      as: "orders"
    }
  }
])
```

Q. At what interval does MongoDB write updates to the disk?
By default configuration, MongoDB writes updates to the disk every 60 seconds. However, this is configurable with the commitIntervalMs and syncPeriodSecs options.

## Q. ***What is use of capped collection in MongoDB?***

**Capped collections** are fixed-size collections that support high-throughput operations that insert and retrieve documents based on insertion order. Capped collections work in a way similar to `circular buffers`: once a collection fills its allocated space, it makes room for new documents by overwriting the oldest documents in the collection.

**Example:-**

```js
>db.createCollection( "log", { capped: true, size: 100000 } )


// specify a maximum number of documents for the collection
>db.createCollection("log", { capped: true, size: 5242880, max: 5000 } )


// check whether a collection is capped or not
>db.cappedLogCollection.isCapped()


// convert existing collection to capped
>db.runCommand({"convertToCapped": "posts", size: 10000})


// Querying Capped Collection
>db.cappedLogCollection.find().sort({$natural: -1})
```