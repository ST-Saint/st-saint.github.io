# Static and Dynamic Typed Languages


* Type
#+begin_quote
- In programming, a data type is what we tell the computer the type of data it’s dealing with, e.g. a string, number, or object. When defining a variable, a computer needs both the name and the type of data before it can store and process it. This way it knows much much memory to set aside, how to access it and how to change it.

- Each programming language has a different way of handling how it assigns data types (*static* vs. *dynamic*) and how flexible (*strong* vs. *weak*) they are when trying to change them. You might have read conflicting information about “static” vs “dynamic” data types, as well as “strong” vs “weak” data types. They’re not the same thing, and a language can include a combination of static/dynamic and strong/weak data types
#+end_quote

* Static vs. Dynamic
#+begin_quote
Static vs. Dynamic defines how a language expects you to declare data types. Static typed languages +require explicit definition+ of a data type when they create a piece of data (e.g. variable, parameter, return value). Dynamic languages are the opposite and can infer, or at least try to guess, the type that we’re using.
#+end_quote

- I think this is not accurate. if you have type inference (ML, OCaml, F#, Haskell...), type definitions are not always necessary

* Strong vs. Weak
#+begin_quote
Strong vs. Weak defines how flexibly a language allows operations between data types. For example, strongly typed languages will not allow you to add a float to an integer, without you converting it first, even though they are both numbers. On the other hand, a weak language will try its best to accomodate what the programmer is asking and perform these operations.
#+end_quote



* Compiled vs. Interpreted
- “When source code is translated”

  - Compiled: Code translated before run-time
  - Interpreted: Code translated on the fly, during execution

- So *all the languages can be both compiled and interpreted*

* reference
- https://www.sitepoint.com/typing-versus-dynamic-typing/
