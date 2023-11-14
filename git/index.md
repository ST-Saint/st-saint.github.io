# Git


* git cli
** git branch
+ =git rev-parse --abbrev-ref HEAD=
** git tags
+ =git describe --abbrev=0 --tags HEAD=
** git hash
+ =git rev-parse HEAD=

* ssh key

** key gen
#+begin_src sh
ssh-keygen -t id_ed25519 -f ~/.ssh/github -C "email@example.com"
#+end_src


* zsh git

** oh-my-zsh.hide-status
#+begin_src sh
git config --add oh-my-zsh.hide-status 1
git config --add oh-my-zsh.hide-dirty 1
#+end_src

* clone

** single branch

#+begin_src shell
git clone <url> --branch <branch/tag> --single-branch [<folder>]
#+end_src

* submodule

