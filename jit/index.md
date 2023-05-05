# JIT


* JIT definition
+ The just-in-time (JIT) compilation generates and execute bytecode at runtime rather than before execution.

* JIT design
- In a bytecode-compiled system, source code is translated to an intermediate representation known as bytecode.
- The bytecode may then be interpreted by, or run on a virtual machine.
- The JIT compiler compiles the bytecodes dynamically into machine code so the program can run faster.
- The code can be compiled when it is about to be executed (hence the name "just-in-time"), and then cached and reused later without needing to be recompiled.

** Java
+ The JIT compiler helps improve the performance of Java programs by compiling bytecodes into native machine code at run time.
*** Can the JIT compiler decompile methods?
+ Typically, the JIT compiler does not decompile methods. However, in rare instances the JIT compiler is forced to decompile a method. Such instances arise when the JIT compiler applies speculative optimizations based on compile-time assumptions, the assumptions are later violated, and the JIT compiler is then unable to recompile the method. Due to implementation restrictions, such methods remain interpreted until the end of the application.

* JIT Optimization(Java)

** Phase 1 - inlining
+ Inlining is the process by which the trees of smaller methods are merged, or "inlined", into the trees of their callers.
  1. Trivial inlining
  2. Call graph inlining
  3. Tail recursion elimination
  4. Virtual call guard optimizations

** Phase 2 - local optimizations

