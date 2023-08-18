# Elisp


* equal

** eq
#+begin_src elisp
(eq 'foo 'foo)
;  ⇒ t


(eq ?A ?A)
;; ⇒ t


(eq 3.0 3.0)
;; ⇒ nil
;; Equal floats may or may not be the same object.

(eq "asdf" "asdf")
;; ⇒ nil

(eq [(1 2) 3] [(1 2) 3])
;; ⇒ nil

(eq (point-marker) (point-marker))
;; ⇒ nil
#+end_src


** equal
#+begin_src elisp
(equal "asdf" "asdf")
;; ⇒ t


(equal [(1 2) 3] [(1 2) 3])
;; ⇒ t


(equal (point-marker) (point-marker))
;; ⇒ t
#+end_src

* list

** add-to-list
#+begin_src emacs-lisp
(setq my-list '(1 2 3))
(add-to-list 'my-list 4)
;; Result: my-list is now (1 2 3 4)
(add-to-list 'my-list 2)
;; Result: my-list remains (1 2 3 4) since 2 is already in the list
#+end_src

** remove from list
#+begin_src emacs-lisp
(setq my-list '(1 2 3 2 4))
(setq my-list (remove 2 my-list))
;; Result: my-list is now (1 3 4) since all occurrences of 2 are removed
#+end_src

* defun
+ =defun= define function
    #+begin_src emacs-lisp :tangle yes
(defun function-name (args)
  (interactive "...")
  ...
  )
#+end_src
+ interactive code: [[https://www.gnu.org/software/emacs/manual/html_node/elisp/Interactive-Codes.html][reference]]

** interactive
+ 通过 interactive 可以把一个函数变成一个可交互的命令
+ interactive 的命令才可以通过 M-x 执行, 类似把这个函数对用户 public

* file

** get parent directory
#+begin_src emacs-lisp
(file-name-directory buffer-file-name)
#+end_src

** file name without suffix
#+begin_src emacs-lisp
(file-name-sans-extension (buffer-name))
#+end_src

* lexical-binding
- with ~;; -*- lexical-binding: t -*-~ in the first line, emacs use lexical scope

** Binding
- A binding is a correspondence between a name and its value.
- In Lisp you can create a binding using ‘let’
  - a binding made by ‘let’ lasts until the end of the ‘let’ form.
    #+begin_src emacs-lisp
      (let ((a 1))
        (let ((a 2))
          (let ((a 3))
            (print a))
          (print a))
        (print a))
      ;; ==> 3
      ;;     2
      ;;     1
    #+end_src



** Dynamic Binding Vs Lexical Binding

- Lexical and dynamic binding refer to how variables are looked up by their names.
- Two regimes for handling variable binding emerged:

- dynamic
  + All variable names and their values live in one global table.
- lexical
  * Each binding scope (function, let syntax, …) creates a new table of variable names and values, organised in a hierarchy called “the environment”.

* keymap

** create keymap

- ~(make-keymap)~ full keymap with nil binding
- ~(make-sparse-keymap)~ empty keymap

#+begin_src emacs-lisp
  (let ((keymap (make-keymap))
        (sparse-keymap (make-sparse-keymap))))
#+end_src

** suppress-keymap
- changes the contents of the full keymap keymap by remapping self-insert-command to the command undefined
  #+begin_src emacs-lisp
  (let ((map (make-sparse-keymap)))
    (suppress-keymap map)
    (keymap-set map "q" 'quit-window)
    map)
  #+end_src


** priority

1. overriding-terminal-local-map
2. overriding-local-map
3. text property 'keymap
4. emulation-mode-map-alists
5. minor-mode-overriding-map-alist
6. minor-mode-map-alist (Minor Mode)
7. text property 'local-map
8. (current-local-map) (Major Mode)
9. (current-global-map) (Global Map)


* buffer & window
** get
+ 可以通过 =(get-buffer BUFFER_NAME)= / =(get-buffer-window= 直接拿到 =buffer= / =window=
+ 可以不存在的话是 *nil*
** switch
+ window 的话可以用 *ace-window* 的 =aw-switch-to-window WINDOW_NAME=
