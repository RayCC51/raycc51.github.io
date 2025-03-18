+++
title = 'JavaScript cheat sheet'
summary = "Studying js language"
date = 2025-02-26
# lastmod = 2025-03-11
tags = ["javascript", "js", "programming", "language", "study", "cheatsheet"]
coverImg = "javascript.svg"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = true
showComments = true
+++


## Style
---

Indent: 2 space. 




### Naming

- Variable: `myVariable` camelCase. 
- Function: `myFunction` camelCase. 
- Class: `MyClass` PascalCase. 
- Closure: `makeMyClosure` prefix "make". 




---
## Type
---

- Number
- BigInt
- String
- Boolean
- Symbol
- null
- undefined
- Object
- Array
- Function
- Date
- RegExp
- Map
- Set




---
## Operator
---

- Truthy, Falsy
  - Falsy: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`
- 1 `==` "1" `true`
- 1 `===` "1" `false`
- `!=` `!==` `++` `--` `+=` `-=`
- `!!X` : boolean(X)
- `&&` `||` `!`
  > `"hello" && 0 = 0`
  >
  > `"hello" && "world" = "world"`
  >
  > `"hello" || null = "hello"`
  >
  > `"hello" || "world" == "hello"`
- `Condition ? Expr1 : Expr2`
  - If `Condition` is `true` then `Expr1`, else `Expr2`. 
- `A ?? B`
  - If `A` is `null` or `undefined`, then `B`, else `A`. 
- `...X`
  > `[...myArr1, ...myArr2]`
  - Unpacking(Array, String, Set, Map, Object)




---
## Declaration
---

```js {linenos=true}
let hello = "hello";
const world = "world";
```




### String

```js {linenos=true}
let myStr = "hello" + world + `${world}`;
let myRegex = /abc/;
```


#### String Methods

Return new String
- `.toUpperCase()`
- `.toLowerCase()`
- `.trim()`
- `.repeat(N)`
- `.replace(X, Y)`
- `.slice(Start, End)`
- `.split(X)`

Return Boolean, Number
- `.indexOf(X)`
- `.includes(X)`
- `.startsWith(X)`
- `.endsWith(Str)`




### Array

```js {linenos=true}
const myArray = new Array();
const myArray = [1,2,3,];
const myArray = new Array(3);  // [undefined, undefined, undefined]

[a,b] = [b,a]  // Swap
```


#### Array Methods

Edit original
- `.push(X)`
- `.pop()`
- `.unshift(X)`
- `.shift()` 
- `.splice(Start, DeleteCount)`
- `.sort(Callback)`
- `.reverse()`

Return new Array
- `.map(Callback)`
- `.find(Callback)`
- `.filter(Callback)`
- `.reduce(Callback, InitialValue)`
- `.concat(myArr2)`
- `.join(Separator)`
- `.slice(Start, End)`

Return Boolean, Number, nothing
- `.indexOf(X)`
- `.includes(X)`
- .length
- `.forEach((number, index) => {}) === for (i in arr)`{}




### Object

```js {linenos=true}
const myObject = new Object();
```

#### Object Methods

Return Array
- `.keys()`
- `.values()`
- `.entries()`

Return Boolean
- `.hasOwnProperty(X)`




### Map

```js {linenos=true}
const myMap = new Map();
```


#### Map Methods

Edit original
- `.set(Key, Value)`
- `.delete(Key)`
- `.clear()`

Return Boolean, Value
- `.get(Key)`
- `.has(Key)`
- `.size`




### Set

```js {linenos=true}
const mySet = new Set();
```

#### Set Methods

Edit original
- `.add(X)`
- `.delete(X)`
- `.clear()`

Return Boolean, Value, nothing
- `.has(X)`
- `.size`
- `.forEach()`




---
## Basic
---

```js {linenos=true}
console.log("hello world!");

let inputText = prompt("input text: ", hello + world);
```

```js {linenos=true}
if (true) {
} else if (false) {
} else {
}
```

```js {linenos=true}
switch (number) {
  case 1:
    break;
  default:
}
```

```js {linenos=true}
for (let i of foo) {
    // i: object, value
} 

for (let i in foo) {
    // i: property, key
} 

for (let i = 0; i < 5; i++) {
}
```

```js {linenos=true}
while (i < 10) {
}

do {
} while (i < 10);
```




### Function

```js {linenos=true}
function myFunction1(a = 10, ...numbers) {
  return 1;
}

(function () {})();

const myFunction2 = () => {};
```




### Class

```js {linenos=true}
class MyClass {
  #privateProperty = "Can't use outside.";
  static staticProperty = "Can use like MyClass.staticProperty";

  constructor(name) {
    this.name = name;
  }
  myMethod() {}
  #privateMethod() {}
  static staticMethod() {}
}

class ChildClass extends MyClass {
  constructor() {
    super();
  }
}
```




---
## Other Technic
---

```js {linenos=true}
const counter = () => (counter.count = (counter.count || 0) + 1);
const sum = (...args) => args.reduce((x, y) => x + y, 0);
```



## Closure

```js {linenos=true}
function makeMyClosure() {
  let outerFuncVar = 0;

  return function () {
    // Inner Function
    return outerFuncVar;
  };
}

const myClosure = makeMyClosure();
console.log(myClosure());
```




### DOM

document
- `.getElementById()`
- `.querySelector()` // Tag.Class#Id
- `.createElement()`

`const div = document.querySelector("div");`
- `div.innerText = "hello";`
- `div.appendChild()`

Event
- `.addEventListener(Event, Handler);`




### Import

In HTML 

```js {linenos=true}
{% raw %}
<script type="text/javascript" src="myScript.js"></script>
<script type="module" src="main.js"></script>
{% endraw %}
```

ES6

```js {linenos=true}
import { exportVar as myVar, exportFunc } from "./myModule.js";
import someVar from "./myModule.js";
```

Node.js

```js {linenos=true}
const express = require('express');
```