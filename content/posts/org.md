---
title: "Org Cheat Shell"
author: ["ST-Saint"]
draft: false
date: <2022-01-15 Sat>
layout: cheatsheet
---

## configuration {#configuration}

-   reveal.js

<!--listend-->

```org
#+REVEAL_THEME: Serif
```

-   all

<!--listend-->

```org
#+OPTIONS: broken-links:t \n:t
#+LATEX_HEADER: \hypersetup{colorlinks=true,linkcolor=black}
#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup
```

-   连接

    ```org
      #+OPTIONS: broken-links:t \n:t
    ```
-   换行

    ```org
      #+OPTIONS: \n:t
    ```

-   TOC 颜色

    ```org
    #+LATEX_HEADER: \hypersetup{colorlinks=true,linkcolor=black}
    ```
-   HTML theme

    ```org
    #+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup
    ```


## fonts {#fonts}


### Emphasis and Monospace {#emphasis-and-monospace}

1.  **bold**
2.  _italic_
3.  <span class="underline">underlined</span>
4.  `verbatim`
5.  `code`
6.  ~~strike-through~~


## open {#open}

-   快速打开文件

    ```emacs-lisp
    ("<SPC> n f" '+default/find-in-notes)
    ```


## capture {#capture}

-   capture 文件位置加入 org 文档

<!--listend-->

```emacs-lisp
("<SPC> X" 'org-capture)
("C-c C-w" 'refile)
```

[capture]({{< relref "org" >}})


## link {#link}


### 插入链接 {#插入链接}

```emacs-lisp
("<SPC> m l l" 'org-insert-link)
```


### 编辑连接 {#编辑连接}

```emacs-lisp
("C-c '" 'org-edit-special)
("C-C C-l" 'org-insert-link)
```


### 图片 {#图片}

-   调整图片大小

<!--listend-->

```org
#+attr_html: :width 1000px
```


## Code Snippet {#code-snippet}


### edit {#edit}

进入模式编辑

```emacs-lisp
("C-c '" 'org-edit-special)
```


### execute {#execute}

```emacs-lisp
("C-c C-c" 'org-ctrl-c-ctrl-c)
```


## agenda {#agenda}


### open agenda {#open-agenda}

```emacs-lisp
("<SPC> o A" 'org-agenda)
```


### pomodoro {#pomodoro}

-   start

<!--listend-->

```emacs-lisp
("<SPC> p m" 'org-pomodoro)
("C-c p m" 'org-pomodoro)
```

-   recent task

<!--listend-->

```emacs-lisp
("<SPC> n o" 'org-clock-goto)
```


### time {#time}


#### 插入时间 {#插入时间}

```emacs-lisp
("C-c ." 'org-time-stamp)
("<SPC> m d t" 'org-time-stamp)
```


#### time range {#time-range}

1.  in one day

<!--listend-->

```org
<2021-06-06 Sun 18:00-20:00>
```

1.  cross days

<!--listend-->

```org
<2021-06-06 Sun>--<2021-06-08 Tue>
```

1.  evaluate time range

<!--listend-->

```emacs-lisp
("<SPC> m c t" 'org-evaluate-time-range)
```
