// Collection in mongo is same as table in mysql

// Below are commands for shell

// If we use the blank object in filter condition means we want all the data. It is like * of mysql

// A row or the documents has the max size of 16mb

// To get all the database
show dbs

// To go to database
use database_name

// To drop database name
use databaase_name
db.dropDatabase()
// For the collection
db.myCollection.drop()

// To add data in collection in first time collection or existing collection. passed value needs to be JSON
// 1. insertOne(data, options)
db.collection_name.insertOne({
    name: "Max",
    age: 29
})
// When we enter the above command we get an object in return having the acknowledged be true and insertid be a value
// 2. To add many values, we have the insertMany(data,options)
debugger.collection_name.insertMany(
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
// for inserting the many values, we need to pass an array

// To get the data of the collection, we use the 
// 1. find(filter,options)
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
// 2. findOne(filter, options)
///It provides the first row of all row which satisfies the condition or filter
db.collection_name.findOne({
    distance: {
        $gt : 10000   // $gt acts as condition of greater then
    }
})




// To update or change the data
// https://www.mongodb.com/docs/manual/reference/operator/update/
// 1. updateOne(filter, data, options)
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
// Basically it will go to first row having name rahul and then set the lastname to test, if lastname doesn't exist then it will create the lastname with value test
// 2. updateMany(filter, data, options).
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



// 3. replaceOne(filter, data, options)
// It replaces the whole data to the new data we passed
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




// To delete the data from the database
// 1. deleteOne(filter, options)
db.collection_name.deleteOne({
    name: "rahul"
})  // It will go to collection take delete only first raw or data which have the name rahul
// 2. deleteMany(filter, options)
db.collection_name.deleteMany({})  // It we dont pass any value in it, it will delete all the row of this collection
db.collection_name.deleteMany({
    marker: 'toDelete'  // It will delete all the row having marker key and toDelete as value
})

// MongoDb use BSON ie "Binaray JSON" to storing in the database. This is because it is more efficient to store than JSON data.
//Efficient in terms of space and size persepective


// Passenger in MongoDb, It is bascially filtering to be sent object
// Like we want to sent an objects 6 key value pair only but the object has 10 key value pair instead
db.collection_name.find({},{ name: 1 , _id: 0})
// Here we want all the row but but ouput has name only. 1 will act as true means it will provide only name in output
// Id comes by default, if we dont want id then use it with 0 ie false

// Validation Schema
// 'posts' is the collection name
// in required, we define what it is expecting
// and in properties, bson type defined what is expecting and description is the error message
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



// Mongo operators like less then, more then etc - https://www.mongodb.com/docs/manual/reference/operator/query/

// For nested query search
db.collection_name.find({ 'rating.average' : { $gt : 7 } })
db.collection_name.find({ 'rating.average' : { $gt : 7 } }).count()  // It give sthe count of data available
db.collection_name.find({$or: [ {'rating.average': { $lt: 5 }}, { 'rating.average': {$gt: 9.3} } ]})


db.collection_name.find({$and: [ {'rating.average': { $lt: 5 }}, { 'generes': 'Drama' } ]})
db.collection_name.find({'rating.average': { $lt: 5 }}, { 'generes': 'Drama' })
// this and above are same in functioning. some times it working differently when we have the same key in both condition. 
// them we should use the above condition because in Object the if we have the same key last key update the value 

// we can use the expres because in it we can make various type of conditions
db.collection_name.find({$expr: { $gte: [ $cond: { if: { $gte: [ '$volume',190 ] }, then: { $subtract: [ '$volume', 10 ] }, else: '$volume' }}, '$target'] }})


// To search or find inside the array, then we can use the syntex like for searching in nested object ie using the dot(.)
// We can search using the length of the array by using the size

// Sorting in the data
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}) // 1 for ascending and -1 for decending

// Pagination can be done by using the skip syntex
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(10)  // it can go on like 10,20,30,...
db.collection_name.find().sort({'rating.average': 1, 'runtime': 1}).skip(1020).limit(10)  // limit is the how much you want to show


// Projection : One document or row has many data but we want to show only few data then projection comes into play
db.collection_name.find({}, {name: 1, generes: 1, runtime: 1})  // It means we want to show only name, generes and runtime, if we want to exclude the id, we have to manually add _id:0

// Slice is used on the array to show how much of array we want to show. below generes have many value in array but it will show first two
db.collection_name.find({'rating.average': {$gt: 9}}, {generes: {$slice: 2}, name: 1})  // we can provide the array index in slice value




// Geospatial Data
// In MongoDB, you can store geospatial data as GeoJSON objects or as legacy coordinate pairs.

// GeoJSON Objects
// To calculate geometry over an Earth-like sphere, store your location data as GeoJSON objects.

// If specifying latitude and longitude coordinates, list the longitude first, and then latitude. GeoJSON has type and coordinates as an array
db.collection_name.insertOne({name: "test institute", location: {type: "Point", coordinates: [-122.34567, 37.5345678]}})
// We have the near function which provides the nearst saved avilable location from the database
// when we add the recantagle box or polygon, then the type we use is not 'point', type is 'Polygon". we add 5 values inside the coordinates, first coordinate again added at the end in order to complete the box





// -----------------------------------     AGGregation        ----------------------------------

// https://www.mongodb.com/docs/manual/aggregation/
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/
// https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/      this is the good one

// Aggregation operations process multiple documents and return computed results.

// In aggregation, the sequence matters

db.collection_name.aggregate([
    { $match: { gender: 'female' } },   // match acts as filter, we filtered through the gender having female
    { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } },  // as name states group do same, in _id we pass on which basis we want grouping, the "state" text can be anything, its the output group name. "$location.state" is the value from document which we want grouping and $ is must, it defines origin means location is verymuch outside and state is inside the location. "totalPersons" is the name of what type of group we want,  for that type visit group on wensite, here we have taken the sum, its value is multiply value means so we have taken as 1
    { $sort: { totalPersons: -1 } }  // totalPersons is the value on which we want sorting, -1 means decending and 1 means ascending
])

// $project works same as projection but with much greater power
// we can show a new field which was not in the database, by combining the existing data from the database eg is fullName below
db.collection_name.aggregate([
    { $project: { _id: 0, gender: 1, fullName: { $concat: [ {$toUpper: '$name.first'} ,'',{$toUpper: '$name.last'}] } } }  
])

// $unwind
// To deflat the array into separate row we use the unwind
// eg one row name hobbies : ['cooking', 'dancing'] gets converted into two separate row of hobbies hobbies : 'cooking' and hobbies : 'dancing'
db.collection_name.aggregate([
    { $unwind: '$name_of_node_of array' }
])

//addtoset smjh nhi aaya

// $slice, it is use the get certain index value from the array
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $slice: ["$examScore", 1] } } }   // here we are geeting first value from array of examScore
])

// $size, it gives the count of the array, below give the length of examScore array
db.collection_name.aggregate([
    { $project: { _id: 0, examScore: { $size: "$examScore" } } }
])

// filter in project, as name says it works same function
db.collection_name.aggregate([
    { $project: { _id: 0, scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ['$$sc.score, 60'] } } } } }
])
// in above, scores is any word we want. filter and input are fixed keyword, input value is the node of the object or row. as is alias. $$ is because we are referring the alias.