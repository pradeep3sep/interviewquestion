> ### What is MongoDB?

* **MongoDB** is a **document-oriented NoSQL database** designed for high-volume data storage.
* Unlike traditional relational databases that use **tables and rows**, MongoDB uses **collections and documents**.
* **Documents** are made up of **key-value pairs**, which represent the basic unit of data in MongoDB.
* **Collections** are sets of documents and serve as the equivalent of **tables** in relational databases.

<br>

> ### Collection in mongo is same as table in mysql

<br>

> ### Database -> Collection -> Documents

<br>

> ### MongoDB use BSON ie "Binaray JSON" to storing in the database. 
This is because it is more efficient to store than JSON data. Efficient in terms of space and size persepective, MongoDB drivers converts the JSON to BSON, Also BSON suppots additional types eg is ObjectId("hiikbs9dshu9uhij"), ObjectId is not supported by JSON but by the BSON.

<br>

> ### Rule of thumnb

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

<details>

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
</details>

<br>

> ### Insert value in the data

**Note:-** Keep in mind, we have the **insert, insertOne, insertMany**, but `insert method should be avoided`, altough it works but general pratice is to avoid it.

#### To add many values, we have the insertMany(data,options)

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
            ordered: false  
          // It means the data which fails will be skipped and rest will be added to db. 
          //Default value is true means if it fails at certain index then it will not continue the next data 
        }
    )
    ```
<br>

> ### To update or change the data

  1. updateOne(filter, data, options)`
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
    db.collection_name.updateMany({isSporty: true}, {$unset: {phone: ''}})


    // To rename the node or key name
    db.collection_name.updateMany({}, {$rename: {age: 'totalAge'}})


    // Upsert : where we don't know if the data was saved to database yet and 
    // - if it was't saved yet,you know want to create a new document
    // - if it was, you want to override the existing or update the existing document
    // it is quite much good if we want to update with check condition
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

<br>

> ### To delete the data from the database

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

> ### To get the data of the collection

1. **find(filter,options)**

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

> ### `Projection` : One document or row has many data but we want to show only few data

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

> ### We can use the expres because in it we can make various type of conditions
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
<br>

> ### We can search using the length of the array by using the size

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

> ### `in` vs `or` operator

#### `$in` and `$nin` Operator

* Used to match a **single field** against **multiple possible values**.

```json
{ field: { $in: [value1, value2, ...] } }
```

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

### Aggregation Expression Usage:

In aggregation pipelines, `$in` can check if a **value exists in an array**:

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      status: 1,
      isActiveOrPending: { $in: ["$status", ["active", "pending"]] }
    }
  }
])
```

* `isActiveOrPending` → `true` if `status` is `"active"` or `"pending"`, otherwise `false`.

**Note:-** `nin` aloso gives boolean in the aggregation expression

<br>

#### `$or` Operator

* Used to combine **different conditions** across one or multiple fields.

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


### Rule of Thumb

* Use **`$in`** → when matching **one field** against multiple values.
* Use **`$or`** → when matching across **different fields** or combining complex conditions.

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

// Q - Write a MongoDB query to find the restaurant Id, name, borough and
// cuisine for those restaurants which achieved a score which is not more than 10.
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



// Q -  Write a MongoDB query to find the restaurant Id, name, address and geographical location for those 
// restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.
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



// Q - Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants
// which contain 'Wil' as first three letters for its name.

db.collection.find(
  { name: /^Wil/ },   // regex: name begins with "Wil"
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 } // projection
)

// Other way
db.collection.find(
  { name: { $regex: "^Wil" } }, 
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)


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

// -----------------------------------     AGGregation        ----------------------------------

<br>


> ### In aggregation, the sequence matters

```js
db.collection_name.aggregate([
  { $match: { gender: 'female' } }, // Filter documents where gender is 'female'

  { 
    $group: { 
      _id: '$location.state',        // Group by state from location
      totalPersons: { $sum: 1 }      // Count number of persons in each group
    } 
  },

  { $sort: { totalPersons: -1 } }   // Sort by totalPersons in descending order
])
```

* **`$match`**: Filters documents (like `find`) – here, only females.
* **`$group`**: Groups by `location.state`. The `_id` holds the grouping key. `$sum: 1` counts documents per group.
* **`$sort`**: Sorts groups by count (`totalPersons`), descending (`-1`).


<br>


> ### `$project` works same as projection
  - we can show a new field which was not in the database, by combining the existing data from the database eg is fullName below
  ```js
    db.collection_name.aggregate([{
        $project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [{
                    $toUpper: '$name.first'
                }, '', {
                    $toUpper: '$name.last'
                }]
            }
        }
    }])
    // _id:0 means we do not want that key in output, we want the gender and fullname
  ```

<br>

> ### `$unwind` - To deflat the array into separate row we use the unwind

```js
{
  $unwind: {
    path: "<arrayField>",
    includeArrayIndex: "<optionalIndexField>",
    preserveNullAndEmptyArrays: <true|false>
  }
}
```

* `path` (required) → the array field to unwind (must start with `$`).
* `includeArrayIndex` (optional) → adds a field with the **index of the element** in the array.
* `preserveNullAndEmptyArrays` (optional, default `false`) → keeps documents where the array is empty or missing.

Suppose we have a collection `orders`:

```json
{
  "_id": 1,
  "customer": "Alice",
  "items": ["apple", "banana", "orange"]
}
```

Pipeline:

```js
db.orders.aggregate([
  { $unwind: "$items" }
])
```

Result:

```json
{ "_id": 1, "customer": "Alice", "items": "apple" }
{ "_id": 1, "customer": "Alice", "items": "banana" }
{ "_id": 1, "customer": "Alice", "items": "orange" }
```

### Example 2 – Include array index

```js
db.orders.aggregate([
  { $unwind: { path: "$items", includeArrayIndex: "itemIndex" } }
])
```

Result:

```json
{ "_id": 1, "customer": "Alice", "items": "apple", "itemIndex": 0 }
{ "_id": 1, "customer": "Alice", "items": "banana", "itemIndex": 1 }
{ "_id": 1, "customer": "Alice", "items": "orange", "itemIndex": 2 }
```

### Example 3 – Preserve documents with empty arrays

```js
db.orders.aggregate([
  { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } }
])
```

* Documents with empty or missing `items` array are **retained**, with `items: null`.

<br>

> ### `addtoset` - 

It works same as push aggregation but when we use push it might create the duplicate data in the array, but addtoset create the unique array, if any duplicate value comes it removes it

```js
db.collection_name.aggregate([
    { $group: {_id: '$name_of_node_of array' }, allHobies: {$addToSet: "$hobbies"}}
])
```
<br>

> ### `$slice`, it is like splice of JS

```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $slice: ["$examScore", 1] } } }   // here we are geeting first value from array of examScore
])
```

<br>


> ### `$size`, it gives the count of the array, below give the length of examScore array
```js
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $size: "$examScore" } } }
])
```

<br>

> ### `filter in project`, as name says it works same function

```js
db.collection_name.aggregate([
    { $project: { _id: 0, scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ['$$sc.score, 60'] } } } } }
])
// in above, scores is any word we want. filter and input are fixed keyword, input value is the node of the object or row. as is alias. $$ is because we are referring the alias.
```
<br>

> ### $bucket

It groups documents into fixed **ranges (buckets)** based on a field value you specify. It’s similar to building **histograms** in data analysis.

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

<br>

> ### $addFields

**Note:-** You can also use the $set stage, which is an alias for $addFields. Adds new fields **without removing the existing ones**.If the field already exists, it will be **overwritten**.

```js
db.collection.aggregate([
  {
    $addFields: {
      <newField>: <expression>,
      <existingField>: <expression>
    }
  }
])
```


#### Examples:

```js
db.orders.aggregate([
  {
    $addFields: {
      totalAmount: { $multiply: ["$price", "$quantity"] }
    }
  }
])
```

👉 Adds a new field `totalAmount` by multiplying `price` and `quantity`.


2. **Overwrite an existing field**

```js
db.users.aggregate([
  {
    $addFields: {
      age: { $add: ["$age", 1] }
    }
  }
])
```

👉 Increments the `age` field by 1 for each user.


3. **Add multiple fields**

```js
db.students.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      passed: { $gte: ["$marks", 40] }
    }
  }
])
```

👉 Adds `fullName` and a boolean `passed` field.

<br>

> ### $set (update operator)

The `$set` operator replaces the value of a field with the specified value. If the field does not exist, $set will add a new field with the specified value

```js
db.products.insertOne(
   {
     _id: 100,
     quantity: 250,
     instock: true,
     reorder: false,
     details: { model: "14QQ", make: "Clothes Corp" },
     tags: [ "apparel", "clothing" ],
     ratings: [ { by: "Customer007", rating: 4 } ]
   }
)


db.products.updateOne(
   { _id: 100 },
   { $set: {
        quantity: 500,
        details: { model: "2600", make: "Fashionaires" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
   }
)

let resultAbove = {
  _id: 100,
  quantity: 500,
  instock: true,
  reorder: false,
  details: { model: '2600', make: 'Fashionaires' },
  tags: [ 'coats', 'outerwear', 'clothing' ],
  ratings: [ { by: 'Customer007', rating: 4 } ]
}
```

Set Fields in Embedded Documents

```js
db.products.updateOne(
   { _id: 100 },
   { $set: { "details.make": "Kustom Kidz" } }
)

let resultOfAbove = {
   _id: 100,
   quantity: 500,
   instock: true,
   reorder: false,
   details: { model: '2600', make: 'Kustom Kidz' },
   tags: [ 'coats', 'outerwear', 'clothing' ],
   ratings: [ { by: 'Customer007', rating: 4 } ]
}
```

**Important:-**
The above code uses dot notation to update the make field of the embedded details document. The code format looks similar to the following code example, which instead replaces the entire embedded document, removing all other fields in the embedded details document:

```js
db.products.updateOne(
   { _id: 100 },
   { $set: { 
        details: {
            make: "Kustom Kidz"
        }
      }
   })
```

Set Elements in Arrays

```js
db.products.updateOne(
   { _id: 100 },
   { $set:
      {
        "tags.1": "rain gear",
        "ratings.0.rating": 2
      }
   }
)
let resulAbove = {
  _id: 100,
  quantity: 500,
  instock: true,
  reorder: false,
  details: { model: '2600', make: 'Kustom Kidz' },
  tags: [ 'coats', 'rain gear', 'clothing' ],
  ratings: [ { by: 'Customer007', rating: 2 } ]
}
```

### In aggregation

https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set

```js
db.scores.insertMany( [
   { _id: 1, student: "Maya", homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0 },
   { _id: 2, student: "Ryan", homework: [ 5, 6, 5 ], quiz: [ 8, 8 ], extraCredit: 8 }
] )

db.scores.aggregate( [
   {
     $set: {
        totalHomework: { $sum: "$homework" },
        totalQuiz: { $sum: "$quiz" }
     }
   },
   {
     $set: {
        totalScore: { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
] )

let resulAbove = [
   {
      _id: 1,
      student: "Maya",
      homework: [ 10, 5, 10 ],
      quiz: [ 10, 8 ],
      extraCredit: 0,
      totalHomework: 25,
      totalQuiz: 18,
      totalScore: 43
   },
   {
      _id: 2,
      student: "Ryan",
      homework: [ 5, 6, 5 ],
      quiz: [ 8, 8 ],
      extraCredit: 8,
      totalHomework: 16,
      totalQuiz: 16,
      totalScore: 40
   }
]
```

<br>

> ### $facet

It is **only an aggregation stage**, not an **expression operator**.\
It Runs **multiple sub-pipelines in parallel** on the same input and returns their results together.

```javascript
{
  $facet: {
    <outputField1>: [ <pipeline1> ],
    <outputField2>: [ <pipeline2> ],
    ...
  }
}
```

```javascript
db.products.aggregate([
  {
    $facet: {
      "priceStats": [
        { $group: { _id: null, avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" } } }
      ],
      "categoryCounts": [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]
    }
  }
])
```

📌 Output:

```javascript
[
  {
    "priceStats": [ { "_id": null, "avgPrice": 42.5, "maxPrice": 100 } ],
    "categoryCounts": [
      { "_id": "electronics", "count": 10 },
      { "_id": "books", "count": 15 }
    ]
  }
]
```

* You can’t use `$facet` inside another operator (e.g., `$project`, `$group`, `$match`).

<br>

> ### $max

1. **`$max` (Aggregation Expression Operator)**

* **Purpose**: Returns the **maximum value** among given expressions or array elements.
* **Where used**: Inside aggregation stages like `$project`, `$group`, `$addFields`, etc.


```javascript
{ $max: [ <expression1>, <expression2>, ... ] }
```

```javascript
db.scores.aggregate([
  {
    $project: {
      student: 1,
      highest: { $max: ["$math", "$english", "$science"] }
    }
  }
])
```

👉 Produces the highest score per student.

### Example: In `$group`

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      maxPrice: { $max: "$price" }
    }
  }
])
```

👉 Finds the **max price** in each category.

<br>

2. **`$max` (Update Operator)**

* **Purpose**: Updates a field only if the specified value is **greater than the existing field value**.
* **Where used**: In update operations (`updateOne`, `updateMany`).


```javascript
{ $max: { <field>: <value> } }
```

```javascript
db.players.updateOne(
  { name: "Alice" },
  { $max: { highScore: 500 } }
)
```

👉 If Alice’s `highScore` is less than 500, it will be updated to 500. Otherwise, it stays unchanged.

<br>


## 2. `$max` as an **Update Operator** with Arrays

This one is trickier.

```javascript
db.students.updateOne(
  { name: "Alice" },
  { $max: { scores: [90, 100] } }
)
```

* `$max` **compares the whole array `[90, 100]`** to the existing `scores` field, not element by element.
* Comparison uses BSON type ordering.
* So if `scores` is already `[78, 92, 85]`, MongoDB will compare arrays as a **whole object**, not individual values.

That means:

* It **won’t merge arrays** or update element-wise.
* Either the **entire array gets replaced** (if `[90, 100]` is considered "greater"), or nothing changes.

### 🔑 Key Takeaways

| Context                | Behavior with Arrays                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Aggregation `$max`** | Returns max element from inside the array.                                                                  |
| **Update `$max`**      | Compares the **whole array field vs new array** → replaces only if new array is “greater” in BSON ordering. |


<br>

> ### $min

1. **`$min` (Aggregation Expression Operator)**

```javascript
{ $min: [ <expression1>, <expression2>, ... ] }
```

👉 Produces the **lowest score** per student.
```javascript
db.scores.aggregate([
  {
    $project: {
      student: 1,
      lowest: { $min: ["$math", "$english", "$science"] }
    }
  }
])
```

### Example: In `$group`
👉 Finds the **minimum price** in each category.
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      minPrice: { $min: "$price" }
    }
  }
])
```

<br>

2. **`$min` (Update Operator)**

* **Purpose**: Updates a field only if the specified value is **less than the existing field value**.
* **Where used**: In update operations (`updateOne`, `updateMany`).


```javascript
{ $min: { <field>: <value> } }
```

👉 If Alice’s `lowScore` is greater than 200, it will be updated to 200. Otherwise, it stays unchanged.
```javascript
db.players.updateOne(
  { name: "Alice" },
  { $min: { lowScore: 200 } }
)
```

<br>

3. `$min` and Arrays

### **In Aggregation**

* If `$min` is given an **array field**, it returns the **smallest element inside that array**.

```javascript
db.students.aggregate([
  {
    $project: {
      name: 1,
      lowestScore: { $min: "$scores" }
    }
  }
])
```

```javascript
{ name: "Bob", scores: [45, 88, 72] }
```

👉 Output:

```javascript
{ name: "Bob", lowestScore: 45 }
```

### **In Updates**

When using `$min` in an update on an **array field**, it compares the **whole array** against the new array value, not individual elements.

```javascript
db.students.updateOne(
  { name: "Bob" },
  { $min: { scores: [30, 40] } }
)
```

* Compares existing `scores` array with `[30, 40]` as whole BSON objects.
* If `[30, 40]` is considered “smaller” than the existing array, the entire `scores` field will be replaced.
* No element-by-element updates.


| Context                | Behavior                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Aggregation `$min`** | Returns minimum element from given values or inside an array.                                            |
| **Update `$min`**      | Updates field if new value is **less** than current field (array = whole replacement, not element-wise). |

<br>

> ### $inc

## 1. **`$inc` (Update Operator)**

* **Purpose**: Increments (or decrements) the value of a field by a specified amount.
* If the field does not exist, MongoDB creates it and sets it to the increment value.
* Works only on **numeric fields** (int, long, double, decimal).


```javascript
{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
```


### Example 1: Simple Increment

```javascript
db.players.updateOne(
  { name: "Alice" },
  { $inc: { score: 5 } }
)
```

👉 Increases `score` by 5.

If Alice’s score was `10`, after update:

```json
{ name: "Alice", score: 15 }
```


### Example 2: Decrement

```javascript
db.players.updateOne(
  { name: "Bob" },
  { $inc: { lives: -1 } }
)
```

👉 Decreases `lives` by 1.


### Example 3: Multiple Fields

```javascript
db.stats.updateOne(
  { userId: 1 },
  { $inc: { wins: 1, gamesPlayed: 1 } }
)
```

👉 Increments both `wins` and `gamesPlayed` counters atomically.


### Example 4: Non-Existent Field

```javascript
db.users.updateOne(
  { name: "Charlie" },
  { $inc: { loginCount: 1 } }
)
```

👉 If `loginCount` doesn’t exist, it will be created with value `1`.

<br>

## 2. `$inc` with Arrays

* `$inc` can increment **specific array elements** by using the **dot notation** with an index.

Example:

```javascript
db.scores.updateOne(
  { _id: 1 },
  { $inc: { "marks.0": 5 } }
)
```

## Example: 
* **Increment** the score by some amount.
* Ensure it never goes **below 0**.
* Ensure it never goes **above 100**.


### Step 1: Increment the Score

```javascript
db.players.updateOne(
  { name: "Alice" },
  { $inc: { score: 15 } }
)
```

### Step 2: Cap the Score at Max = 100

```javascript
db.players.updateOne(
  { name: "Alice" },
  { $min: { score: 100 } }
)
```

👉 If `score` > 100, set it back to 100.


### Step 3: Cap the Score at Min = 0

```javascript
db.players.updateOne(
  { name: "Alice" },
  { $max: { score: 0 } }
)
```

👉 If `score` < 0, set it back to 0.

### ✅ Combine All in One Operation

MongoDB allows **multiple update operators** in a single update.

```javascript
db.players.updateOne(
  { name: "Alice" },
  {
    $inc: { score: 15 },   // increase score
    $min: { score: 100 },  // cap at 100
    $max: { score: 0 }     // floor at 0
  }
)
```

### How it Works

* `$inc` applies first (score goes up or down).
* `$min` caps the value at **100** (if it goes above).
* `$max` floors the value at **0** (if it goes below).
* The whole update is **atomic** (safe with concurrent writes).


### Example Run

Initial:

```json
{ name: "Alice", score: 95 }
```

Run:

```javascript
db.players.updateOne(
  { name: "Alice" },
  {
    $inc: { score: 10 },
    $min: { score: 100 },
    $max: { score: 0 }
  }
)
```

Result:

```json
{ name: "Alice", score: 100 }
```

👉 Even though `95 + 10 = 105`, it’s capped at **100**.

<br>

> ### $pop

The $pop operator removes the first or last element of an array. Pass $pop a value of -1 to remove the first element of an array and 1 to remove the last element in an array.

```js
db.students.insertOne( { _id: 1, scores: [ 8, 9, 10 ] } )

db.students.updateOne( { _id: 1 }, { $pop: { scores: -1 } } )

let resultBecome = { _id: 1, scores: [ 9, 10 ] }
```

<br>

> ### $pull (update operator)

The $pull operator removes from an existing array all instances of a value or values that match a specified condition.

```js
db.stores.insertMany( [
   {
      _id: 1,
      fruits: [ "apples", "pears", "oranges", "grapes", "bananas" ],
      vegetables: [ "carrots", "celery", "squash", "carrots" ]
   },
   {
      _id: 2,
      fruits: [ "plums", "kiwis", "oranges", "bananas", "apples" ],
      vegetables: [ "broccoli", "zucchini", "carrots", "onions" ]
   }
] )

db.stores.updateMany(
    { },
    { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
)

// The following operation removes
// - "apples" and "oranges" from the fruits array
// - "carrots" from the vegetables array

let resultAbove = {
  _id: 1,
  fruits: [ 'pears', 'grapes', 'bananas' ],
  vegetables: [ 'celery', 'squash' ]
},
{
  _id: 2,
  fruits: [ 'plums', 'kiwis', 'bananas' ],
  vegetables: [ 'broccoli', 'zucchini', 'onions' ]
}

```

<br>

> ### $push (aggregation and update)

1. **`$push` as an Update Operator**

* **Purpose**: Appends a value to an array field.
* If the field does not exist, MongoDB creates it as an array with the pushed value.

```javascript
{ $push: { <field>: <value or modifier> } }
```

### Example 1: Simple Push

```javascript
db.students.updateOne(
  { name: "Alice" },
  { $push: { scores: 95 } }
)
```

If Alice’s doc was:

```json
{ name: "Alice", scores: [80, 85] }
```

👉 After update:

```json
{ name: "Alice", scores: [80, 85, 95] }
```

### Example 2: Push Multiple Values

```javascript
db.students.updateOne(
  { name: "Bob" },
  { $push: { scores: { $each: [70, 75, 80] } } }
)
```

👉 `$each` lets you push multiple values in one operation.

### Example 3: Push with Sorting and Slicing

You can combine `$each` with **`$sort`** and **`$slice`** modifiers.

```javascript
db.students.updateOne(
  { name: "Charlie" },
  { $push: { scores: { $each: [90, 60], $sort: -1, $slice: 3 } } }
)
```

👉 Behavior:

* Push 90 and 60.
* Sort array descending.
* Keep only top 3 values.


# 2. **`$push` as an Aggregation Accumulator**

* **Purpose**: Collects values into an array during `$group` (or `$setWindowFields`).
* It **does not remove duplicates** (use `$addToSet` for unique values).

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$customerId",
      items: { $push: "$item" }
    }
  }
])
```

👉 Groups all `item` values per customer into an array.


### Example 2: Push Whole Document

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$customerId",
      orders: { $push: "$$ROOT" }
    }
  }
])
```

👉 Collects the **entire document** into an array per group.

<br>

> ### $sum 

### Example 1: Sum field per group

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$price" }
    }
  }
])

// Sum multiple fields
db.scores.aggregate([
  {
    $project: {
      student: 1,
      total: { $sum: ["$math", "$english", "$science"] }
    }
  }
])
```

### Example 2: Count documents using `$sum: 1`

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```

### Example 3: Sum array elements

```javascript
db.students.aggregate([
  {
    $project: {
      name: 1,
      totalScore: { $sum: "$scores" }
    }
  }
])
```

If `scores: [80, 85, 90]` → `totalScore: 255`.

<br>

> ### $first (expression operator)


1. **`$first` as an Aggregation Expression Operator**

* Returns the **first element in an array**.

### Example 1: First element of an array

```javascript
db.students.aggregate([
  {
    $project: {
      name: 1,
      firstScore: { $first: "$scores" }
    }
  }
])
```

If:

```json
{ name: "Alice", scores: [95, 88, 76] }
```

👉 Output:

```json
{ name: "Alice", firstScore: 95 }
```

⚡ Notes:

* If the array is empty → result = `null`.
* If the expression is not an array → result = `null`.

<br>

2. **`$first` as an Aggregation Accumulator**

* Used in `$group` or `$setWindowFields`.
* Returns the value of the **first document** in the group or window (based on sort order).

### Example 2: First value in each group

```javascript
db.sales.aggregate([
  { $sort: { date: 1 } },  // sort first to control order
  {
    $group: {
      _id: "$customerId",
      firstPurchase: { $first: "$date" }
    }
  }
])
```

👉 Returns the earliest purchase date for each customer.

⚠️ **Order matters!**

* If you don’t `$sort` before `$group`, MongoDB just takes the first document it sees (not guaranteed order).


### Summary

| Context                     | Behavior                                                                   |
| --------------------------- | -------------------------------------------------------------------------- |
| **Expression (`$project`)** | Returns first element of an array.                                         |
| **Accumulator (`$group`)**  | Returns value from the first document in a group (depends on input order). |

<br>

> ### $elemMatch (projection)

* As a **query operator** (match array elements)
* As a **projection operator** (return only matching array elements)

You’re asking about the **projection** usage, so let’s focus on that.

---

# 📌 `$elemMatch` as a Projection Operator

* Purpose: When projecting an array field, `$elemMatch` returns **only the first array element** that matches the given condition.
* Without it, projection usually returns the **whole array**.

---

### Syntax

```javascript
db.collection.find(
  { <query> },
  { <arrayField>: { $elemMatch: { <condition> } } }
)
```

---

### Example 1: Basic Projection

```javascript
db.students.find(
  { name: "Alice" },
  { scores: { $elemMatch: { subject: "math" } } }
)
```

If document is:

```json
{
  name: "Alice",
  scores: [
    { subject: "math", score: 90 },
    { subject: "english", score: 85 },
    { subject: "science", score: 92 }
  ]
}
```

👉 Result:

```json
{
  name: "Alice",
  scores: [
    { subject: "math", score: 90 }
  ]
}
```

---

### Example 2: Range Condition

```javascript
db.students.find(
  {},
  { scores: { $elemMatch: { score: { $gt: 85, $lt: 95 } } } }
)
```

👉 Returns only the **first score** in `scores` array that’s between 85 and 95.

---

### Example 3: Combine with Other Fields

```javascript
db.students.find(
  { name: "Bob" },
  { name: 1, scores: { $elemMatch: { subject: "science", score: { $gte: 90 } } } }
)
```

👉 Returns Bob’s name and only his **science score ≥ 90**.

---

# ⚡ Key Notes

* `$elemMatch` in **projection** ≠ `$elemMatch` in **query**.

  * **Query**: Matches documents if **any element** in the array satisfies the condition.
  * **Projection**: Returns only the **first matching element** from the array.
* You cannot get **multiple matching elements** this way — for that you’d need `$filter` in an **aggregation pipeline**.

---

👉 Do you want me to also show you the **aggregation equivalent of `$elemMatch`** (using `$filter`), since it can return **all matching array elements**, not just the first?

<br>

> ### $regex (Regular Expression Operator)

* **Purpose**: Provides pattern matching for string fields, similar to regex in programming languages.
* **Context**: Can only be used in **queries** (not in updates or aggregation expressions).

```javascript
{ <field>: { $regex: "pattern", $options: "optionFlags" } }
```

```javascript
// Finds documents where `name` starts with `A`.
db.users.find({ name: { $regex: /^A/ } })

// Case-Insensitive - Matches `Alice`, `ALICE`, `aLiCe`, etc.
db.users.find({ name: { $regex: "alice", $options: "i" } })


// Matches descriptions containing `"laptop"`.
db.products.find({ description: { $regex: "laptop" } })
```


#### `$options` Flags

| Option | Meaning                                             |
| ------ | --------------------------------------------------- |
| `"i"`  | Case-insensitive                                    |
| `"m"`  | Multiline (treats `^` and `$` as start/end of line) |
| `"s"`  | Dotall (dot `.` matches newlines too)               |
| `"x"`  | Ignore whitespace and comments in pattern           |

Example:

```javascript
// Matches “Hello WORLD” across multiple lines.
db.users.find({ bio: { $regex: "hello.*world", $options: "si" } })
```

<br>

> ### $expr

1. `$expr` (Query Operator)

* **Purpose**: Lets you use **aggregation expressions** inside a regular **`find()` query**.
* This allows **field-to-field comparisons**, not just field-to-constant.

---

## 🔹 Syntax

```javascript
{ $expr: { <aggregation expression> } }
```

Example 1: Field-to-Field Comparison

```javascript
db.sales.find({
  $expr: { $gt: ["$amount", "$target"] }
})
```

👉 Finds docs where `amount > target`.
Without `$expr`, you could only do `amount > 100` (constant).

Example 2: Combine with `$and`, `$or`

```javascript
db.employees.find({
  $expr: {
    $and: [
      { $gte: ["$salary", 50000] },
      { $lt: ["$salary", "$bonusCap"] }
    ]
  }
})
```

👉 Matches employees with `salary ≥ 50k` **and** `salary < bonusCap`.


Example 3: Equivalent to `$where` (but safer & indexed)

```javascript
db.inventory.find({
  $expr: { $eq: ["$qty", { $multiply: ["$price", "$units"] }] }
})
```

👉 Finds docs where `qty = price × units`.

<br>

> ### $and

It ensure that **all conditions inside it must be true** for a document to match.

### Example 1 – Find users who are **active** AND older than 25:

```js
db.users.find({
  $and: [
    { status: "active" },
    { age: { $gt: 25 } }
  ]
})
```

### Example 2 – Equivalent shorthand (since multiple conditions at the same level act like `$and`):

```js
db.users.find({
  status: "active",
  age: { $gt: 25 }
})
```

Both are the same — but `$and` is useful when:

* You need to combine **multiple operators on the same field**.
* You want explicit clarity in complex queries.


### Example 3 – User must have **score greater than 80 AND less than 100**:

```js
db.students.find({
  $and: [
    { score: { $gt: 80 } },
    { score: { $lt: 100 } }
  ]
})
```

Without `$and`, this would **not** work, since you can’t write two separate `score` keys at the same level.

<br>

> ### $nor - selects documents where none of the given conditions are true(negation of `$or`)

### Example 1 – Find users who are **NOT active** and **NOT older than 25**:

```js
db.users.find({
  $nor: [
    { status: "active" },
    { age: { $gt: 25 } }
  ]
})
```

This means:

* Exclude users with `status: "active"`
* Exclude users with `age > 25`
  Result → Only users with `status != active` **AND** `age <= 25`.


### Example 2 – Find students whose score is **neither less than 50 nor equal to 100**:

```js
db.students.find({
  $nor: [
    { score: { $lt: 50 } },
    { score: 100 }
  ]
})
```

So the results will have:

* `score >= 50`
* and `score != 100`

<br>

> ### $not

⚡ Important: `$not` **cannot stand alone** — it must be applied to an operator (like `$gt`, `$regex`, etc.) inside a field condition.

### Example 1 – Find users whose age is **NOT greater than 25** (so `age <= 25` or missing):

```js
db.users.find({
  age: { $not: { $gt: 25 } }
})
```

### Example 3 – Equivalent alternative using `$ne`:

```js
db.users.find({
  status: { $ne: "active" }
})
```

👉 `$ne` is shorter, but `$not` is more powerful when you need to negate **complex conditions** (like `$regex`, `$gte` + `$lte`, etc.).


### Difference from `$nor`:

* `$not` → works at the **field/operator level** (negates one condition).
* `$nor` → works at the **query level** (negates multiple conditions combined with OR).

<br>

> ### $or - at least one of the given conditions is true.

```js
db.users.find({
  $or: [
    { status: "active" },
    { age: { $gt: 25 } }
  ]
})
```

<br>

> ### $exists - checks whether a field is present or absent in a document.

```json
{ field: { $exists: <boolean> } }
```

* `true` → field **exists** (regardless of its value, even `null`).
* `false` → field **does NOT exist**.


### Example 1 – Find documents where `email` field **exists**:

```js
db.users.find({
  email: { $exists: true }
})
```

### Example 2 – Use with `$and`

Find documents where `phone` exists but `address` does not:

```js
db.users.find({
  $and: [
    { phone: { $exists: true } },
    { address: { $exists: false } }
  ]
})
```


* `$exists: true` will also return documents where the field exists but has `null` as value.
* Use `$ne: null` along with `$exists` to ensure the field both exists **and** has a non-null value.

<br>

> ### $gt (queries and expression operator)


### Query Usage

```js
db.users.find({
  age: { $gt: 25, $lt: 40 }
})
```

* Returns users with `25 < age < 40`.


### Aggregation Expression Usage - evaluates to true or false.

```js
{ $gt: [ <expression1>, <expression2> ] }
```

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      isOlderThan25: { $gt: ["$age", 25] }
    }
  }
])
```

* Creates a new field `isOlderThan25` that is `true` if `age > 25`, otherwise `false`.

<br>

> ### $lt

```js
db.users.find({
  age: { $lt: 30 }
})
```

#### Aggregation Expression Usage:

In aggregation pipelines, `$lt` evaluates to **true or false**:

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      isUnder30: { $lt: ["$age", 30] }
    }
  }
])
```

* `isUnder30` → `true` if `age < 30`, otherwise `false`.

<br>

> ### $ne - not equal to a specified value.

```js
db.users.find({
  status: { $ne: "active" }
})
```

### Aggregation Expression Usage:

In aggregation pipelines, `$ne` evaluates to **true or false**:

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      status: 1,
      isNotActive: { $ne: ["$status", "active"] }
    }
  }
])
```

* `isNotActive` → `true` if `status` is **not "active"**, otherwise `false`.

<br>

> ### Array Query Predicate Operators

> ### 1. $all

```js
{ field: { $all: [value1, value2, ...] } }
```

* Matches documents where **all the values in the array are present** in the field, regardless of order.
* Works only on **array fields**.


### Example 1 – Find users who have **both "admin" and "editor" roles**:

```js
db.users.find({
  roles: { $all: ["admin", "editor"] }
})
```

### Notes:

1. `$all` is **different from `$in`**:

   * `$in` matches if **any one** of the values exists.
   * `$all` matches if **all** of the values exist in the array.


<br>

> ### 2. $elemMatch (query)

used to match documents where **at least one element in an array satisfies multiple conditions**.

It is very useful when you need to apply **more than one condition to the same array element**.

```js
{ field: { $elemMatch: { <condition1>, <condition2>, ... } } }
```

* `field` must be an **array**.
* At least **one element in the array** must satisfy **all conditions inside `$elemMatch`**.


### Example 1 – Find students with a **Math score > 80 AND grade "A"** in the same array element:

```js
db.students.find({
  scores: { $elemMatch: { subject: "Math", score: { $gt: 80 }, grade: "A" } }
})
```

* `scores` is an array of objects like `{ subject, score, grade }`.
* This matches a student **only if one object in `scores` satisfies all three conditions**.

<br>

> ### 3. $size

* `field` must be an **array**.
* Matches only if the array length is **exactly equal** to the specified number.


### Example 1 – Find users with exactly 3 roles:

```js
db.users.find({
  roles: { $size: 3 }
})
```

* `roles` is an array like `["admin", "editor", "user"]`.
* Matches only if the array length is 3.

2. To match arrays with variable sizes, use `$expr` with `$size` in aggregation:

```js
db.users.find({
  $expr: { $gt: [ { $size: "$roles" }, 2 ] }  // arrays with more than 2 elements
})
```

<br>

> ### $set (aggregation and update)

- add new fields or update existing fields in documents.

### `$set` in Aggregation

* Adds new fields or updates existing fields **in the pipeline output**.
* Alias of `$addFields` in aggregation.


### Example 1 – Add a new field

```js
db.users.aggregate([
  { $set: { isActive: true } }
])
```

* Adds a new field `isActive` with value `true` to all documents in the pipeline output.


### `$set` in Update

### Example 1 – Add a new field

```js
db.users.updateOne(
  { username: "alice" },
  { $set: { isActive: true } }
)
```

* Updates `status` from `"pending"` to `"active"` for all matching documents.

<br>

> ### $unset (aggregation and update) - purpose is to **remove fields from documents**.


### `$unset` in Aggregation

Used in the **aggregation pipeline** to remove fields from the documents as they pass through the pipeline.

### Syntax

```js
{
  $unset: "<field1>" // single field
}
// or multiple fields
{
  $unset: ["field1", "field2"]
}
```

### Example 1 – Remove a single field

```js
db.users.aggregate([
  { $unset: "password" }
])
```

* Removes the `password` field from all documents in the aggregation output.

### Example 2 – Remove multiple fields

```js
db.users.aggregate([
  { $unset: ["password", "lastLogin"] }
])
```

* Removes both `password` and `lastLogin` fields.

### `$unset` in Update

Used with **update operations** (`updateOne`, `updateMany`, `findOneAndUpdate`) to **delete fields** from existing documents.

### Syntax

```js
db.collection.updateOne(
  { <filter> },
  { $unset: { <field1>: "", <field2>: "" } }
)
```

* The **value** of each field in `$unset` is ignored (usually an empty string).

### Example 1 – Remove a single field

```js
db.users.updateOne(
  { username: "alice" },
  { $unset: { password: "" } }
)
```

### Example 2 – Remove multiple fields

```js
db.users.updateMany(
  { status: "inactive" },
  { $unset: { password: "", lastLogin: "" } }
)
```

* Removes `password` and `lastLogin` from all inactive users.

<br>

> ### $sort (aggregation)(value can be descending(-) or ascending(+))


### Example 1 – Sort by multiple fields

```js
db.users.aggregate([
  { $sort: { status: 1, age: -1 } }
])
```

### Notes:

1. `$sort` **should usually appear after `$match`** in a pipeline to reduce the number of documents being sorted.
2. Sorting on **unindexed fields** for large collections can be slow. Consider **indexing** fields used in `$sort`.

<br>

> ### $skip and $limit

### Combining `$skip` and `$limit` (Pagination)

```js
db.users.aggregate([
  { $sort: { age: 1 } },  // Optional: sort before paginating
  { $skip: 10 },           // Skip first 10 documents
  { $limit: 5 }            // Return next 5 documents
])
```


### Notes:

1. Skipping many documents in large collections can be **slow**; consider using **range queries** or indexed fields for efficiency.
2. In queries outside aggregation, you can also use `.skip()` and `.limit()` methods:

```js
db.users.find().sort({ age: 1 }).skip(10).limit(5)
```

<br>

> ### $replaceRoot (aggregation)

used to **promote a specified embedded document to the top-level document**, essentially replacing the current document with a sub-document.

### Syntax:

```js
{
  $replaceRoot: { newRoot: <document> }
}
```

### Example 1 – Promote an embedded document

Suppose the `orders` collection has documents like:

```json
{
  "_id": 1,
  "customer": "Alice",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

Pipeline:

```js
db.orders.aggregate([
  { $replaceRoot: { newRoot: "$address" } }
])
```

Output:

```json
{ "street": "123 Main St", "city": "New York", "zip": "10001" }
```

* The `address` sub-document becomes the **entire document**.
* Fields like `_id` and `customer` are removed unless explicitly included.


```
https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/
```

<br>

> ### $project (aggregation)

used to **include, exclude, or reshape fields** in the documents that pass through the pipeline. It is also commonly used to **create new computed fields**.

```js
{
  $project: {
    <field1>: <include/exclude/computed>,
    <field2>: <include/exclude/computed>,
    ...
  }
}
```

* `<field>` → the field to include, exclude, or compute.
* Use `1` to **include**, `0` to **exclude**.
* Computed fields can be created using expressions like `$add`, `$concat`, `$multiply`, etc.

### Example 1 – Create computed field

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      _id:0,
      ageNextYear: { $add: ["$age", 1] }
    }
  }
])
```
<br>

> ### $out (aggregation)

https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/

<br>

> ### $merge (aggregation)

https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/

<br>

> ### $match (aggregation)

used to **filter documents** based on specified conditions. It works similarly to the `find()` query but within an aggregation pipeline.

```js
{
  $match: { <query> }
}
```

### Example 1 – Filter users older than 25

```js
db.users.aggregate([
  { $match: { age: { $gt: 25 } } }
])
```
<br>

> ### $lookup (aggregation)

Q. How to combine data from multiple collections into one collection?

used to **perform a left outer join** between two collections. It allows you to **combine documents from a "foreign" collection** into the current collection based on a matching field.

```js
{
  $lookup: {
    from: "<foreignCollection>",       // collection to join
    localField: "<localField>",        // field from input documents
    foreignField: "<foreignField>",    // field from foreign collection
    as: "<outputArrayField>"           // name of the array field to store matched documents
  }
}
```

* `from` → the collection you want to join with.
* `localField` → field from the current collection.
* `foreignField` → field from the foreign collection.
* `as` → the name of the array field that will contain matched documents.


### Example 1 – Simple `$lookup`

Collections:

**orders**

```json
{ "_id": 1, "customerId": 101, "total": 250 }
{ "_id": 2, "customerId": 102, "total": 100 }
```

**customers**

```json
{ "_id": 101, "name": "Alice" }
{ "_id": 102, "name": "Bob" }
```

Pipeline:

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo"
    }
  }
])
```

Output:

```json
{
  "_id": 1,
  "customerId": 101,
  "total": 250,
  "customerInfo": [ { "_id": 101, "name": "Alice" } ]
}
```

```
https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
```

<br>

> ### $group (expression operator)

used to **group documents by a specific key (or keys) and apply accumulator expressions** (like `$sum`, `$avg`, `$max`, etc.) to generate aggregated results.

```js
{
  $group: {
    _id: <expression>,
    <field1>: { <accumulator1>: <expression1> },
    <field2>: { <accumulator2>: <expression2> },
    ...
  }
}
```

## 📌 Example 1 – Group by a field and count

Suppose we have `orders`:

```json
{ "custId": "A1", "amount": 50 }
{ "custId": "A1", "amount": 100 }
{ "custId": "B2", "amount": 75 }
```

Aggregation:

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$custId",             // group by customer ID
      totalAmount: { $sum: "$amount" }, // sum all amounts
      orderCount: { $sum: 1 }          // count number of orders
    }
  }
])
```

Output:

```json
{ "_id": "A1", "totalAmount": 150, "orderCount": 2 }
{ "_id": "B2", "totalAmount": 75,  "orderCount": 1 }
```


⚡ **Key Accumulators you can use inside `$group`:**

* `$sum` → total sum
* `$avg` → average
* `$min` / `$max` → min & max values
* `$push` → put all values into an array
* `$addToSet` → unique values into an array
* `$first` / `$last` → first/last value (depends on sort order)

<br>

> ### $facet (expression operator)

It lets you run **multiple pipelines in parallel** on the same set of input documents and returns all the results together in a **single document**.

```js
{
  $facet: {
    <outputField1>: [ <stage1>, <stage2>, ... ],
    <outputField2>: [ <stage1>, <stage2>, ... ],
    ...
  }
}
```

* Each key inside `$facet` is the **name of the field** in the output document.
* Each value is an **array of pipeline stages** that process the input documents.


### Example 1 – Multi-faceted search

Suppose we have `products`:

```json
{ "category": "Electronics", "price": 500 }
{ "category": "Electronics", "price": 1500 }
{ "category": "Clothing",   "price": 100 }
{ "category": "Clothing",   "price": 200 }
```

Aggregation:

```js
db.products.aggregate([
  {
    $facet: {
      "priceStats": [
        { $group: { _id: null, avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" } } }
      ],
      "byCategory": [
        { $group: { _id: "$category", total: { $sum: 1 } } }
      ]
    }
  }
])
```

Output:

```json
{
  "priceStats": [
    { "_id": null, "avgPrice": 575, "maxPrice": 1500 }
  ],
  "byCategory": [
    { "_id": "Clothing", "total": 2 },
    { "_id": "Electronics", "total": 2 }
  ]
}
```

✅ Both aggregations (`priceStats` and `byCategory`) run **in parallel** on the same dataset.

<br>

> ### $count (aggregation stage)

It simply **counts the number of documents** that pass into it and outputs the count as a single field.

```js
db.users.aggregate([
  { $count: "totalUsers" }
])
```

Output:

```json
{ "totalUsers": 125 }
```

### Example 2 – Equivalent using `$group`

```js
db.orders.aggregate([
  { $match: { status: "pending" } },
  { $group: { _id: null, count: { $sum: 1 } } }
])
```

Output:

```json
{ "_id": null, "count": 17 }
```

✅ `$count` is just shorthand for the `$group + $sum:1` pattern.

⚡ **Key Notes:**

* `$count` **must be the last stage** in the pipeline (or close to last), since it replaces the whole stream with just one document.
* If you need both **count + data**, you’d use **`$facet`** instead of `$count`.

<br>

> ### $addFields (aggregation stage)

used to **add new fields** to documents, or to **overwrite existing fields** with new computed values.It’s basically the same as `$set`.

### Example 1 – Add multiple fields

```js
db.students.aggregate([
  {
    $addFields: {
      passed: { $gte: ["$score", 50] },
      gradeCategory: {
        $cond: [{ $gte: ["$score", 90] }, "A", "B"]
      }
    }
  }
])
```

<br>

> ### $abs (expression operator),$ceil (expression operator)

### 1. `$abs` (Absolute Value - return data will be positive)

```js
db.sales.aggregate([
  {
    $project: {
      item: 1,
      absAmount: { $abs: "$amount" }
    }
  }
])
```

If `amount` is `-50`, then `absAmount` will be `50`.


### **2. `$ceil` (Rounds a number **up** to the nearest integer)**

```js
db.sales.aggregate([
  {
    $project: {
      item: 1,
      roundedPrice: { $ceil: "$price" }
    }
  }
])
```

If `price` is `12.3`, then `roundedPrice` will be `13`.
<br>

> ### $concat (expression operator)

Used to **concatenate (join) strings together**.

* If you need to handle non-string values, use `$toString` before concatenation.


```js
db.users.aggregate([
  {
    $project: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] }
    }
  }
])
```

If a document is:

```json
{ "firstName": "John", "lastName": "Doe" }
```

The result will be:

```json
{ "fullName": "John Doe" }
```

### **Example 2 – Convert Non-String Values**

If `userId` is a number:

```js
db.users.aggregate([
  {
    $project: {
      userLabel: { $concat: ["User-", { $toString: "$userId" }] }
    }
  }
])
```


⚡ **Related string operators:**

* `$substr` / `$substrBytes` / `$substrCP` → extract substring.
* `$toLower` / `$toUpper` → change case.
* `$split` → split string into array.
* `$concatArrays` → similar to `$concat` but for arrays.

<br>

> ### $concatArrays (expression operator)

* It **concatenates (merges)** multiple arrays into a single array.
* If any argument resolves to `null` or is missing → result is `null`.

### **Example 1 – Concatenate Two Arrays**

```js
db.inventory.aggregate([
  {
    $project: {
      allTags: { $concatArrays: ["$tags", "$extraTags"] }
    }
  }
])
```

If a document is:

```json
{ "tags": ["red", "blue"], "extraTags": ["green", "yellow"] }
```

Result:

```json
{ "allTags": ["red", "blue", "green", "yellow"] }
```

⚡ **Related array operators:**

* `$arrayElemAt` → Get element at specific index.
* `$size` → Get array length.
* `$slice` → Extract subset of array.
* `$filter` → Filter array by condition.
* `$reduce` → Combine array elements into single value.

<br>

> ### $cond (expression operator)

**`$cond`** is a **ternary conditional operator** – it works like an **if–then–else** statement inside your pipeline.

MongoDB supports two forms:

### **1. Ternary Form**

```js
{ $cond: { if: <boolean-expression>, then: <true-case>, else: <false-case> } }
```

### **2. Array Form**

```js
{ $cond: [ <boolean-expression>, <true-case>, <false-case> ] }
```

### **Example 1 – Mark Passed/Failed (Object Form)**

```js
db.students.aggregate([
  {
    $project: {
      name: 1,
      result: {
        $cond: { if: { $gte: ["$marks", 40] }, then: "Pass", else: "Fail" }
      }
    }
  }
])
```

If a student has `marks: 35`, result will be `"Fail"`.

### **Example 2 – Discount Calculation (Array Form)**

```js
db.orders.aggregate([
  {
    $project: {
      price: 1,
      finalPrice: {
        $cond: [
          { $gte: ["$price", 1000] },   // condition
          { $multiply: ["$price", 0.9] }, // then → 10% discount
          "$price"                        // else → no discount
        ]
      }
    }
  }
])
```

If `price = 1200`, then `finalPrice = 1080`.
If `price = 800`, then `finalPrice = 800`.

<br>

> ### $dateDiff (aggregation operator)

calculates the difference between two dates, expressed in the unit you specify (days, months, years, etc.).

```js
{
  $dateDiff: {
    startDate: <expression>,   // required
    endDate: <expression>,     // required
    unit: "<unit>",            // required (year, quarter, month, week, day, hour, minute, second, millisecond)
    timezone: <string>,        // optional
    startOfWeek: <string>      // optional, used only if unit = "week"
  }
}
```

### **Example 1 – Difference in Days**

```js
db.events.aggregate([
  {
    $project: {
      daysBetween: {
        $dateDiff: {
          startDate: "$startDate",
          endDate: "$endDate",
          unit: "day" // month
        }
      }
    }
  }
])
```

If:

```json
{ "startDate": ISODate("2025-01-01"), "endDate": ISODate("2025-01-10") }
```

Result:

```json
{ "daysBetween": 9 }
```

<br>

> ### $divide (expression operator)

```js
{ $divide: [ <expression1>, <expression2> ] }
```

⚠️ If the denominator (`expression2`) is **0**, MongoDB throws a **divide by zero error**.

### **Example 1 – Calculate Price per Item**

```js
db.orders.aggregate([
  {
    $project: {
      orderId: 1,
      pricePerItem: { $divide: ["$totalPrice", "$quantity"] }
    }
  }
])
```

If:

```json
{ "orderId": 1, "totalPrice": 500, "quantity": 5 }
```

Result:

```json
{ "orderId": 1, "pricePerItem": 100 }
```

### **Example 4 – Safe Division (Avoid Divide by Zero)**

You can combine `$divide` with `$cond`:

```js
db.orders.aggregate([
  {
    $project: {
      avgPrice: {
        $cond: {
          if: { $eq: ["$quantity", 0] },
          then: null,
          else: { $divide: ["$totalPrice", "$quantity"] }
        }
      }
    }
  }
])
```

⚡ **Related arithmetic operators:**

* `$add` → Add numbers.
* `$subtract` → Subtract numbers.
* `$multiply` → Multiply numbers.
* `$mod` → Remainder after division.

<br>

> ### $filter (aggregation operator)

It lets you filter the contents of an array based on a condition.

```js
{
  $filter: {
    input: <array-expression>,   // the array you want to filter
    as: <string>,                // variable name for each element in the array (default is `"this"`)
    cond: <expression>           // condition to apply (true → keep element)
  }
}
```

### **Example 1 – Keep Only Values > 50**

```js
db.scores.aggregate([
  {
    $project: {
      highScores: {
        $filter: {
          input: "$scores",
          as: "score",
          cond: { $gt: ["$$score", 50] }
        }
      }
    }
  }
])
```

If:

```json
{ "scores": [30, 60, 75, 40] }
```

Result:

```json
{ "highScores": [60, 75] }
```

### **Example 2 – Filter Array of Objects**

```js
db.students.aggregate([
  {
    $project: {
      passedSubjects: {
        $filter: {
          input: "$subjects",
          as: "subj",
          cond: { $gte: ["$$subj.marks", 40] }
        }
      }
    }
  }
])
```

If:

```json
{
  "subjects": [
    { "name": "Math", "marks": 35 },
    { "name": "English", "marks": 60 }
  ]
}
```

Result:

```json
{
  "passedSubjects": [
    { "name": "English", "marks": 60 }
  ]
}
```

### **Example 3 – Default `as: "this"`**

If you don’t specify `as`, MongoDB uses `"this"`:

```js
{
  $filter: {
    input: "$scores",
    cond: { $gt: ["$$this", 50] }
  }
}
```

⚡ **Notes**

* `$filter` is evaluated per element, so it works like `.filter()` in JavaScript.
* Works great with `$map`, `$reduce`, `$size`, and `$arrayElemAt`.
* If `input` is `null` or not an array → result is `null`.

<br>

> ### $map (aggregation)

transforms each element of an array and returns a new array with the transformed values.It’s very similar to **JavaScript’s `.map()`**.

```js
{
  $map: {
    input: <array-expression>,   // the array you want to iterate
    as: <string>,                // variable name for each element
    in: <expression>             // expression to apply to each element
  }
}
```

### **Example 1 – Square Each Number**

```js
db.numbers.aggregate([
  {
    $project: {
      squared: {
        $map: {
          input: "$values",
          as: "val",
          in: { $multiply: ["$$val", "$$val"] }
        }
      }
    }
  }
])
```

If:

```json
{ "values": [2, 3, 4] }
```

Result:

```json
{ "squared": [4, 9, 16] }
```

### **Example 2 – Extract Field from Array of Objects**

```js
db.students.aggregate([
  {
    $project: {
      subjectNames: {
        $map: {
          input: "$subjects",
          as: "s",
          in: "$$s.name"
        }
      }
    }
  }
])
```

If:

```json
{
  "subjects": [
    { "name": "Math", "marks": 90 },
    { "name": "English", "marks": 85 }
  ]
}
```

Result:

```json
{ "subjectNames": ["Math", "English"] }
```


### **Example 3 – Default `as: "this"`**

```js
{
  $map: {
    input: "$values",
    in: { $add: ["$$this", 10] }
  }
}
```

If `values = [1, 2, 3]` → result = `[11, 12, 13]`.

⚡ **Key Difference from `$filter`:**

* `$filter` → removes elements based on a condition.
* `$map` → transforms every element into something else.
* You can combine them (`$map` after `$filter`) for more complex operations.

<br>

> ### $reduce (aggregation)

It lets you combine (reduce) an array into a single value by iteratively applying an expression.It’s similar to **JavaScript’s `.reduce()`**.

```js
{
  $reduce: {
    input: <array-expression>,      // the array to iterate over
    initialValue: <expression>,     // starting value
    in: <expression>                // expression applied to each element
  }
}
```

* Uses two special variables:

  * `$$value` → current accumulated value.
  * `$$this` → current element of the array.

### **Example 1 – Sum All Numbers**

```js
db.numbers.aggregate([
  {
    $project: {
      total: {
        $reduce: {
          input: "$values",
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] }
        }
      }
    }
  }
])
```

If:

```json
{ "values": [2, 3, 4] }
```

Result:

```json
{ "total": 9 }
```

### **Example 2 – Concatenate Strings**

```js
db.users.aggregate([
  {
    $project: {
      fullName: {
        $reduce: {
          input: "$nameParts",
          initialValue: "",
          in: {
            $concat: [
              "$$value",
              { $cond: [{ $eq: ["$$value", ""] }, "", " "] },
              "$$this"
            ]
          }
        }
      }
    }
  }
])
```

If:

```json
{ "nameParts": ["John", "Doe"] }
```

Result:

```json
{ "fullName": "John Doe" }
```

<br>

> ### $slice (aggregation)

### 1. **Projection Operator** (to limit array elements in a result)

You use `$slice` in a **projection** to return **a subset of array elements** from a document.


### Examples:

* **Get the first 5 elements of an array field:**

  ```js
  db.posts.find({}, { comments: { $slice: 5 } })
  ```
* **Get 5 elements starting from the 10th (i.e., skip 10, then take 5):**

  ```js
  db.posts.find({}, { comments: { $slice: [10, 5] } })
  ```


### 2. **Aggregation Pipeline Operator** (inside `$project`, `$addFields`, etc.)

You can also use `$slice` as an **aggregation operator** within a stage like `$project`.

```js
{
  $slice: [ <array>, <n> ]  // first n elements
}

{
  $slice: [ <array>, <start>, <n> ]  // from start index, take n elements
}
```

#### Example:

```js
db.posts.aggregate([
  {
    $project: {
      first3Comments: { $slice: ["$comments", 3] }
    }
  }
])
```

```js
db.posts.aggregate([
  {
    $project: {
      someComments: { $slice: ["$comments", 2, 4] }  // skip 2, take 4
    }
  }
])
```

<br>

> ### $split (aggregation)

```js
{ $split: [ <string>, <delimiter> ] }
```

* `<string>`: The input string to split.
* `<delimiter>`: The string delimiter to split by.

### Example Use Case

Imagine a document like:

```js
{
  _id: 1,
  tags: "red,blue,green"
}
```

You want to split the `tags` string into an array like `["red", "blue", "green"]`.

#### Aggregation Example:

```js
db.collection.aggregate([
  {
    $project: {
      tagArray: { $split: ["$tags", ","] }
    }
  }
])
```

### ⚠️ Notes

* If the delimiter is not found in the string, `$split` returns an array with the original string as the only element.
* If the string or delimiter is `null`, the result is `null`.

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

> ### Interaction with allowDiskUseByDefault
Starting in MongoDB 6.0, pipeline stages that require more than 100 megabytes of memory to execute write temporary files to disk by default. These temporary files last for the duration of the pipeline execution and can influence storage space on your instance. In earlier versions of MongoDB, you must pass `{ allowDiskUse: true } `to individual find and aggregate commands to enable this behavior.

Individual find and aggregate commands can override the allowDiskUseByDefault parameter by either:

- Using { allowDiskUse: true } to allow writing temporary files out to disk when allowDiskUseByDefault is set to false

- Using { allowDiskUse: false } to prohibit writing temporary files out to disk when allowDiskUseByDefault is set to true