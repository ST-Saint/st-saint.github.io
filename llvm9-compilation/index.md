# llvm-project/llvm/utils/benchmark/src/benchmark_register.h:17:30


* Aur LLVM90 compilation error
** error
#+begin_src shell
llvm-project/llvm/utils/benchmark/src/benchmark_register.h:17:30:
  error: 'numeric_limits' is not a member of 'std'
   17 |   static const T kmax = std::numeric_limits<T>::max();
      |                              ^~~~~~~~~~~~~~
#+end_src
** patch

[[https://reviews.llvm.org/D89450][llvm/utils/benchmark: add missing <limits> inclusion]]

#+begin_src c
// /llvm-9.0.1.src/utils/benchmark/src/benchmark_register.h

+ #include <limits>
  #include <vector>
#+end_src

