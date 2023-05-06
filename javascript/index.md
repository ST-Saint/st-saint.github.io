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

