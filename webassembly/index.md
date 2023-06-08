# WebAssembly


* Wasm
- WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

* Use WebAssembly in JavaScript

** compile c/c++/rust code

*** source code
#+begin_src c
int add(int a, int b) {
    return a + b;
}
#+end_src

*** emcc
#+begin_src shell
emcc src/add.c -s STANDALONE_WASM=1 -o add.wasm
#+end_src


** fetch
- use fetch to load the wasm file

#+begin_src javascript
fetch('add.wasm')
    .then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, importObject))
    .then((results) => {
        // Do something with the compiled results!
    });
#+end_src

** initiate
- call ~WebAssembly.instantiate~
- new api: ~WebAssembly.compileStream~ (not supported in nodejs 12.x)

#+begin_src javascript
function fetchAndInstantiate(url, importObject) {
    return fetch(url)
        .then((response) => response.arrayBuffer())
        .then((bytes) => WebAssembly.instantiate(bytes, importObject))
        .then((results) => results.instance);
}
#+end_src

** execute
#+begin_src javascript
fetchAndInstantiate('add.wasm', importObject).then(function (instance) {
    instance.exports.exported_func();

    var i32 = new Uint32Array(instance.exports.memory.buffer);

    var table = instance.exports.table;
    console.log(table.get(0)());
});
#+end_src

