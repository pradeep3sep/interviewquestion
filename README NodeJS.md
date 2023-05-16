Jonas ka agar dekhna h to sction 8 se dekho, for query see from video 96. video 100 is good one
video 135 for forgot password and reset password

keep in mind when we are using the middleware protect, there we are adding the useer to res then the user details is available on all the routes below that

security of cookie ----------- video 142 full dekhna -------------. res k cookies me humne apna jwt store kia and httponly mark kia h means no 3rd party can store it.

video 145 bhi theek h

** Special note: Many functions, checks, validators do not work on updationg one or many. So we should keep it in mind

video 102-107 phir se dekhna h

we need to form like "import-dev-data.js" of jonas to have the backup or default file to upload in database if anthing bad happen

Browser has document and window
Node has process and global

REST API
The api's which are made on REST architecture. The rest architecture is below
1. Separate API into logical resources
    -- What is resorce. It is an object or a representation of something which has some data associated to it. Any information can be named as resource. 
2. Expose structured resource-based URL's
3. Use HTTP methods
    -- Not to use end points like test.com/getTor => test.com/tour  (get method)
4. Send data as JSON
5. Be Stateless - like not storing the page on which user is

To read/write the file which is available in local folder we use the fs module ie fs.readFilesync and fs.writeFilesync. Path used be in form of __dirname /file/te.json

app.use(express.json({ limit : '10kb' })) It works as middleware and helps to get the data from the request body, also limits the data on body allowable

To get the dynamic params => api/v1/products/:id and use through req.params.id
req.query me hamesa object aata h
find, findbyid, findone etc ye sab "query promise" k form me return karte h. isi query pe hum sort, paginate etc lagate h then promise resolve karte h
for query - http://localhost:3000/api/v1/tours?duration[gte]=5&difficulty=easy

Please read about the process.argv in detail

Mongodb is schemaless while mysql is opposite. mongodb me hum kuch bhi ghused dete h

//--------------------Schema and Model-------------
We make schema(condition ) fist and then we make the model form it. Model is function used to connect to schema(blueprint) with a name. Layered form of schema is the model. schema => model => model instance
Generally the collection name is plural
First argument of the model of mongoose is the collection or table name
eg const data = mongoose.model('collection_name', dataSchema)

    image: {
        type: [String],   // Here how we define the type is important
        required: [true, "Please share the images"]
    },



In Schema, we have 
- unique
- default
- required
- min and max
- validate or validator
- trim (only for string)
- select - if it is false means it will not be visible in response api
- get
- set
- alias
- immutable
- transform

String
- lowercase
- uppercase
- trim
- match
- enum
- minLength
- maxLength
- populate

Number
- min
- max
- enum
- populate

Date
- min
- max
- expires

-----------------------------
console.log(__dirname)
console.log(__filename)
const path = require('path')
console.log(path.join(__dirname,"../../public"))

express.static defines the folder which serves directly means if it has the about.html filr, you can access directly like localhost:3000/about.html.  Jab ye folder define kar denge phir iske ander file dhyan se rakhni padegai

aur agr code me ye path use krna ho to src='/images/self.png'

app.use(express.static(path.join(__dirname,'public')));

-----------------------------
https://expressjs.com/en/4x/api.html#app
explore left section of above url


// ---------------- MVC Architecture---------------
Model Layer - It is concerned with everything about application data and business logic
Controller Layer - It's function is to handle the application's request, interect with models, and send back responses to the client
View Layer - used for the graphical interface, ssr website, template to generate the view. Basically presenation logic

FAT Model/THIN Controllers - Offload as much logic as possible into the models and keep the cotrollers as simple and lean as possible.


// ----------------------- Aggregation---------------
We basically define a pipeline that all documents from a certain collection go through where they are processed step by step in order to transform them into aggregated results.
eg we use aggregation pipeline in order to calculate averages, min, max values 
self note - basically data k uper calcution kr k kuch naya data dena.

aggreation is use to calculate the statics of the collection data in various steps or stages
eg we use aggregation pipeline in order to calculate averages, min, max values 
It occurs in stages, 
eg  Stage 1 - match
    Stage 2 - group it has _id means on which basis you want to group. if null is provided means no group or one single group. 
    Stage 3 - sort
    Stage 4 - match
https://www.mongodb.com/docs/manual/aggregation/   site for defination and example
self note - basically data k uper calcution kr k kuch naya data dena.

We have the virtual properties which do not save the data but return in response of api. These data can not be used for query




----------- https://mongoosejs.com/docs/middleware.html
We have the pre and post save middleware ie Document middleware which work before and after saving the document. "This" points towards the schema

We have the pre and post find middleware ie query middleware. "This" points towards the quey. Isme bas quey chalti h jo data filter karti h. We can use the regex in find to use various type of find query

We have the pre and post aggregation middleware. "This" points towards the aggregation.


------------ validation
enum


// ------------------------ Error Handling --------------------
video 112 concept is good, not the code
video 114 logic is must. 115 code and logic
video 116 kafi deep logical h, catchasync h
video 123 is also good

we always have 4, (err, req, res, next) => {}

We need to understand separately
- errorObject
- unhandled route
- catch and async or catchasync - iske error kaise flow kar rahe h

isOperational why it is added


----------------------- Auth ---------------
video 128 gives how JWT works
point to note that password hashing is one side, means we can encrypt it but can't decrypt it. It is for safety purpose that no one can use that password on another platform
Generally hume jwt me pas id pass karni chaiye coz, jwt debugger se data nikala ja sakta h. iska main use ye rehta h ki information koi bhi dekh le but koi ishe modify na kar paye

we can create a method on the instance of schema

video 132 part 2 is the good one



------------------- POSTMAN -----------------
video 133 for advanced postman setup

---------------------
we have the routes protected to certain user and login also like admin and subadmin


----------------------- MODELLING DATA -------------------
Relation
1:1
1: Many - further subdivide are few, many, ton
Many : Many

                                        data modelling
                                embedding           referencing
                                                child  parent  two-way

how to decide which type of data referencing we should use like embedding or referencing. see video 148,151,152 is must
ek hoto h child referencing and ek hoti h parent referencng
ek hota h virtual, ek hota h populate, phir ek hota h virtual populate
video - 153 - child referencing
video - 154,156,157 - parent referencing and virtual populate - we mostly use it