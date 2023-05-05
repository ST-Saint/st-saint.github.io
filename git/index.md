# Git


* git cli
** git branch
+ =git rev-parse --abbrev-ref HEAD=
** git tags
+ =git describe --abbrev=0 --tags HEAD=
** git hash
+ =git rev-parse HEAD=

* clone

** single branch

#+begin_src shell
git clone <url> --branch <branch/tag> --single-branch [<folder>]
#+end_src

* submodule

