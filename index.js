//* Question 1
// const numbers = [10,20,30,40,50,60]
// const [,,,...newNumbers] = numbers
// console.log(newNumbers);
//?[40,50,60]

//* Question 2
// const details = {
//     name : "Pradeep",
//     age : 25,
//     name : "Himanshu"
// }
// console.log(details);
//? age: 25
//?name: "Himanshu"

//* Question 3
// const name = "testify"
// console.log(!typeof name === "object");
// console.log(!typeof name === "string");
// console.log(!typeof name); this is for hint

//? false
//? false

//* Question 4
// let a = 1
// c= 2;
// console.log(--c === a);
//? true

//* Question 5
// let check = [1,2,3,4]
// let hi = [,...check]
// console.log(hi);

//* Question 5
//how to add "<h1>Hello World</h1>" in jsx
// export default function App() {
//     const htmlString = "<h1>Hello World</h1>";
//     return <div dangerouslySetInnerHTML={{ __html: htmlString }}>
//            </div>;
//   }
//? true

//* Question 6
// var x;
// x = 10;
// function test(){
//     var x;
//     if(x>29){
//         x=50
//     }
//     console.log(x);
// }
// test();
//? undefined

//* Question 7
// const number = 2
// const result  = (function () {
//     delete number;
//     return number
// })();
// console.log(result);
//? 2

//* Question 8
// const number = 2
// const result  = (function (number) {
//     delete number;
//     return number
// })(20);
// console.log(result);
//? 20

//* Question 9
// function sum(num1, num2 = num1){
//     console.log(num1 + num2);
// }
// sum(10)
//? 20

//* Question 10
// function sum(num1, num2 = num1){
//     console.log(num1 + num2);
// }
// sum(10,89)
//? 99

//* Question 11
// var a = "hello"
// var sum = 0
// for (let i = 0; i < a.length; i++) {
//     sum += (a[i] - "a"); 
// }
// console.log(sum);
//? NaN

//* Question 12
// let a = 0
// for(a; a<5; a++);
// console.log(a);
//? 5

//* Question 13(revise the concept of shallow and deep copy)
// let person = {
//     name : "Lynda"
// }
// const members = [person]
// person = null
// console.log(members);
//?[{name : "Lynda"}]

//* Question 14(problem in concept)
// const a = {}
// const b = {
//     key : "b"
// }
// const c = {
//     key : "c"
// }
// a[b] = 123;
// a[c] = 456;
// console.log(a[b]);

//* Question 15(console kra k check karo)
// (()=> {
//     let x = (y = 10)
// })()
// console.log(typeof x);
// console.log(typeof y);
//?undefined, number

//* Question 16
// (function(a){
//     return (function(){
//         console.log(a);
//         a = 23
//     })()
// })(45);

//* Question 17
// const person = {
//     name : "pradeep",
//     age : 45
// }
// let city = person.city
// city = "delhi"
// console.log(person);

//* Question 18
// var count = 1;
// var func1 = function (){
//     console.log(count)
// }
// var func2 = function(){
//     var count = 2
//     func1()
// }
// func2()

//* Question 19
// let users  = {
//     name : "outside",
//     hasArrowfunc : function(){
//         const name = "Inside";
//         (()=>{
//             console.log(this.name);
//             return this.name
//         })()
//     }

// }
// console.log(users.hasArrowfunc());

//* Question 20
// bar();
// (function abc(){
//     console.log("something")
// })();
// function bar(){
//     console.log("bar got called")
// }

//* Question 21 sorting of the array
// let daya = [1,12,3,11,10]
// daya.sort((a,b)=> {
//     return a-b
// });
// console.log(daya);

//* Question 21 sorting of the object
// const items = [
//     { name: 'Edward', value: 21 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'And', value: 45 },
//     { name: 'The', value: -12 },
// ];

//? sort by value
// items.sort((a, b) => a.value - b.value)
// console.log(items);

//? sort by name
// items.sort(function(a, b){
//     if(a.firstname < b.firstname) { return -1; }
//     if(a.firstname > b.firstname) { return 1; }
//     return 0;
// })
// console.log(items);

//* Question 22 converting the number into textnumber
// let number = 9966
// let data = number.toLocaleString()
//? 10K

//* Question 23 check(4)(2)(3)
// function check(num1){
//     return (num2)=>{
//       return (num3)=> {
//         return num1 * num2 * num3
//       }
//     }
//   }
// console.log(check(4)(2)(3)); 

//* Question 24
// let array = [2,3,[5,2,[6,[3, [4, 5, [5, 1, 3]]]],1,1],9];
// //flat without using flat
// console.log(array.toString().split(','));