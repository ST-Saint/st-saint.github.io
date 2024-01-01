# Elisp


* string

** concat
#+begin_src emacs-lisp
(setq str1 "Hello, ")
(setq str2 "world!")

(setq result (concat str1 str2))
#+end_src


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

* switch

** pcase
#+begin_src emacs-lisp
(pcase system-type
  ;; GNU/Linux or WSL
  (gnu/linux
   (message "This is GNU/Linux"))

  ;; macOS
  (darwin
   (message "This is macOS"))

  ;; Windows
  (windows-nt
   (message "This is Windows"))

  ;; BSDs
  (berkeley-unix
    (message "This is a BSD"))

  ;; Other operating system
  (_
   (message "Unknown operating system")))
#+end_src

* regex

** match
#+begin_src emacs-lisp
(let ((text "Hello, my email is user@example.com ????"))
  (if (string-match "\\(user@example.com\\)" text)
      (message "Found email address: %s" (match-string 1 text))
    (message "Email address not found")))
#+end_src

** non-greedy
use ~?~
#+begin_src emacs-lisp
(let ((text "This is a test <foo>bar</foo> test"))
  (if (string-match "<.*?>" text)
      (message "Greedy match: %s" (match-string 0 text))
    (message "No match")))
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

* minor-mode


** check if active
#+begin_src emacs-lisp
(bound-and-true-p which-key-mode)
#+end_src

* hotkeys

| Keymap | Function                             |
|--------+--------------------------------------|
| C-M-f  | forward-sexp (coresponding bracket)  |
| C-M-b  | backward-sexp (coresponding bracket) |

** org-mode
| Keymap | Function                    |
|--------+-----------------------------|
| C-c -  | add - ahead of current line |

* buffer & window
** get
+ 可以通过 =(get-buffer BUFFER_NAME)= / =(get-buffer-window= 直接拿到 =buffer= / =window=
+ 可以不存在的话是 *nil*
** switch
+ window 的话可以用 *ace-window* 的 =aw-switch-to-window WINDOW_NAME=


* function
| function            | key   | functionality                          |
| file-exists-p       | nil   | file exisit                            |
| file-name-directory | nil   | get the directory of a file            |
| buffer-file-name    | nil   | current buffer/file name               |
| backward-up-list    | C-M-u | upper level element  (method -> class) |


* GPG
#+begin_quote
 keeping your secrets encrypted on your file system is an easy way of keeping your secrets secret
#+end_quote

+ Gpg(GNU Privacy Guard) is natively supported in emacs called EasyPG
+ 只用一个gpg key管理所有加密文件和链接
+ 可以不用每次输密码获取 root 权限

** authinfo
+ =auth-sources= 变量指定 authinfo 文件
+ 格式 =machine <HOST> login <ACCOUNT> port <PORT> password <PASSWORD>=
  + example =machine localhost login root port sudo password rootpasswd123=
+ shell access =gpg2 -q --for-your-eyes-only --no-tty -d ~/.authinfo.gpg | sed -n 's,^machine gmail.com .*password \([^ ]*\).*,\1,p'=
** Creating a key
+ =gpg --gen-key=

** [[https://wiki.archlinux.org/title/GnuPG#Cache_passwords][cache password]]

* font

** describe char
+ display current char info
#+begin_src emacs-lisp
C-u C-x =
#+end_src


* align
+ 第一次知道 =C-u M-x= 调用的命令跟直接 =M-x= 调用的还是不一样的
+ =C-u M-x align-regexp= 使用的是更高级的 =align-regexp=
  + *regexp*: match the place you are interested in aligning; to do it, one of its parenthesis groups will be extended with spaces, or shortened by deleting characters
  + *parenthesis* group: choose which one
  + *spacing*: if the group is shorter than this, spaces will be added to it; if it's longer, characters will be deleted from it, starting at the end (unless it's longer for the purposes of alignment, of course)
  + *repeat*: well, this is obvious, I think
  + *justify*: non-blank characters inside the group won't be deleted, and necessary spaces will be added/deleted from the left. On your second case, try: regexp \([0-9]+\), group -1.
  + *column* (instead of spacing): align to that fixed column (of course, it doesn't work well with “repeat”).


* debug
** debug function
+ =M-x debug-on-entry= 设置入口
+ 直接运行函数
+ =cancel-debug-on-entry=

** keymap
 | Shortcut | Function           |
 |----------+--------------------|
 | d        | step through       |
 | c        | continue(step out) |

** on error
#+begin_src emacs-lisp
(setq debug-on-error t)
#+end_src
** bugs

*** poll freeze
#+begin_src c
in poll () at /usr/lib/libc.so.6
#+end_src

- disable XIM (maybe) ref: [[https://gitlab.freedesktop.org/xorg/lib/libx11/-/issues/35]]

** search by value
- ~apropos-value~

