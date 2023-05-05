# Elisp


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


* buffer & window
** get
+ 可以通过 =(get-buffer BUFFER_NAME)= / =(get-buffer-window= 直接拿到 =buffer= / =window=
+ 可以不存在的话是 *nil*
** switch
+ window 的话可以用 *ace-window* 的 =aw-switch-to-window WINDOW_NAME=

