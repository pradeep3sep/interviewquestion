> ### Polyfill for the call,apply and bind

```js
getPlayerInfo = function (role, country) {
    return `${this.firstName} ${this.lastName}, ${role} from ${country}`;
};

const player1 = {
    firstName: "Virat",
    lastName: "Kohli",
};

const player2 = {
    firstName: "Hardik",
    lastName: "Pandya",
};

console.log(getPlayerInfo.call(player1, "Batsman", "India"));
console.log(getPlayerInfo.bind(player1, "All-Rounder", "India")());
console.log(getPlayerInfo.apply(player1, ["All-Rounder", "India"]));

Function.prototype.myBind = function(scope, ...args){
    scope._this = this
    console.log("nn",scope);
    return function(){
        return scope._this(...args)
    }
}


Function.prototype.myCall = function(scope, ...args){
    scope._this = this
    return scope._this(...args)
}


Function.prototype.myApply = function(scope, args){
    scope._this = this
    return scope._this(...args)
}

console.log(getPlayerInfo.myCall(player2, "Batsman", "India"));
console.log(getPlayerInfo.myBind(player2, "All-Rounder", "India")());
console.log(getPlayerInfo.myApply(player2, ["All-Rounder", "India"]));
```