# Calc


* [[https://github.com/lujun9972/emacs-document/blob/master/calc/emacs-calculator%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.org][emacs-calculator]]

+ 逆波兰表示法.
+ 栈垂直向下生长.
** 类型
*** 模数
+ =mod=
*** 复数
+ =(-1, 2)= -> =-1 + 2i=
*** 分数
+ =numerator:denominator=
+ 会自动约分
*** 基数
+ 输入 =radix#exp=
*** 向量
+ =[4, 1, 5]=
#+begin_example
 [ [ 1, 2, 3 ]
      [ 4, 5, 6 ]
      [ 6, 7, 8 ] ]
#+end_example
*** 代数表达式
+ 以 ='= 开头输入
+ =a^3 + a^2 b / c d - a / b=
+ "big language"
+ 使用 =evaluates-to= 赋值

#+begin_example
                  2
      3   b a    a
 1:  a  + ---- - -
          c d    b
#+end_example
*** 图形
+ gnuplot
*** HMS 表示时间角度
+ =1:  7@ 55' 13"= -> 7h 55m 13s
*** 时间
+ =1:  <6:59:34pm Tue Jun 23, 2009>=
+ 输入的数字会作为天来看待

** shortcut
| Key       | Function             |
|-----------+----------------------|
| Q         | Sqrt                 |
| p         | set precision        |
| BACKSPACE | pop/delete           |
| TAB       | swap number in stack |
| d r       | change radix display |
| U c       | unit conversion      |
| a x       | calc expand          |
| a s       | calc simplify        |
| a d       | derivative           |
| a i       | integral             |

