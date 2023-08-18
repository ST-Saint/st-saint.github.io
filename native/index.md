# Native Emacs


* Keymap

| Keymap | Function                             |
|--------+--------------------------------------|
| C-M-f  | forward-sexp (coresponding bracket)  |
| C-M-b  | backward-sexp (coresponding bracket) |

** org-mode
| Keymap | Function                    |
|--------+-----------------------------|
| C-c -  | add - ahead of current line |



* debug
#+begin_src emacs-lisp
(setq debug-on-error t)
#+end_src


* function
| function            | key   | functionality                          |
| file-exists-p       | nil   | file exisit                            |
| file-name-directory | nil   | get the directory of a file            |
| buffer-file-name    | nil   | current buffer/file name               |
| backward-up-list    | C-M-u | upper level element  (method -> class) |



* align
+ 第一次知道 =C-u M-x= 调用的命令跟直接 =M-x= 调用的还是不一样的
+ =C-u M-x align-regexp= 使用的是更高级的 =align-regexp=
  + *regexp*: match the place you are interested in aligning; to do it, one of its parenthesis groups will be extended with spaces, or shortened by deleting characters
  + *parenthesis* group: choose which one
  + *spacing*: if the group is shorter than this, spaces will be added to it; if it's longer, characters will be deleted from it, starting at the end (unless it's longer for the purposes of alignment, of course)
  + *repeat*: well, this is obvious, I think
  + *justify*: non-blank characters inside the group won't be deleted, and necessary spaces will be added/deleted from the left. On your second case, try: regexp \([0-9]+\), group -1.
  + *column* (instead of spacing): align to that fixed column (of course, it doesn't work well with “repeat”).

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

* debug
+ =M-x debug-on-entry= 设置入口
+ 直接运行函数

** keymap
 | Shortcut | Function           |
 |----------+--------------------|
 | d        | step through       |
 | c        | continue(step out) |

* font

** describe char
+ display current char info
#+begin_src emacs-lisp
C-u C-x =
#+end_src

* mu4e

** init
#+begin_src shell
mu init --maildir=/home/yayu/.mail --my-address=@gmail.com --my-address=@ubc.ca
#+end_src

* bugs

** poll freeze
#+begin_src c
in poll () at /usr/lib/libc.so.6
#+end_src

- disable XIM (maybe) ref: [[https://gitlab.freedesktop.org/xorg/lib/libx11/-/issues/35]]
