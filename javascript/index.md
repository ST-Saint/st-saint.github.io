# JavaScript



* Node.js and V8
#+begin_quote
Getting started guide to Node.js, the server-side JavaScript runtime environment. Node.js is built on top of the Google Chrome V8 JavaScript engine, and it's mainly used to create web servers - but it's not limited to just that.
#+end_quote

- Node.js uses an event driven, non-blocking I/O model
- MERN(MongoDB, ExpressJS, ReactJS and Node.js) stack

** V8 JavaScript Engine
#+begin_quote
V8 is the name of the JavaScript engine that powers Google Chrome. It's the thing that takes our JavaScript and executes it while browsing with Chrome. V8 provides the runtime environment in which JavaScript executes. The DOM and the other Web Platform APIs are provided by the browser.
#+end_quote

- V8 uses Just-in-time (JIT) compilation, which converts the native JavaScript code to machine code. So, the difference between V8 code and others is that it does not produce any intermediate code.

*** Runtime
- the Ignition interpreter compiles the JavaScript code and generates non-optimized machine code.
- The machine code is analyzed and re-compiled for best performance, by the Turbofan and Crankshaft.
- Liftoff is responsible for machine code generation in a highly optimized way. It generates code for each opcode and perform way better then Turbofan.
- Orinoco is responsible for garbage collection. It looks for disconnected memory allocations and perform operations to free up more space. It also update the pointers to new memory locations.

* Optional parameters
#+begin_src typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob"); // works correctly now
let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
Expected 1-2 arguments, but got 3.
let result3 = buildName("Bob", "Adams"); // ah, just right
#+end_src

* init project
#+begin_src bash
npm init
#+end_src

* type

** typeof
#+begin_src js
console.log(typeof 42);
// Expected output: "number"

console.log(typeof 'blubber');
// Expected output: "string"

console.log(typeof true);
// Expected output: "boolean"

console.log(typeof undeclaredVariable);
// Expected output: "undefined"

console.log(typeof [1, 2, 3]);
// Expected output: "object"

console.log(typeof {"1": 2});
// Expected output: "object"
#+end_src

#+RESULTS:
: number
: string
: boolean
: undefined
: object
: object
: undefined

** array

*** length

#+begin_src js
const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];

console.log(clothing.length);
// Expected output: 4
#+end_src

#+RESULTS:
: 4
: undefined

*** concat
#+begin_src js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
#+end_src

#+RESULTS:
: undefined


* statement

** for
*** for in
#+begin_src js
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
#+end_src
*** for each
#+begin_src js
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));
#+end_src

#+RESULTS:
: a
: b
: c
: undefined

* regex
** construct
1. ~/regex/~: / is keyword
2. ~new RegExp(regex)~: / is literal

** match
#+begin_src js
"GGGG".match(re)
#+end_src
* crawler
** cheerio
#+begin_src js
const response = await axios.get(url);
const $ = cheerio.load(response.data);
#+end_src

