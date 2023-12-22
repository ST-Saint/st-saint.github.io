# Diary


* <2023-12-21 Thu>
- W2E 爷回来咯
- WSL 爷来咯

* <2023-12-12 Tue>
- T人不能和F人谈恋爱

* <2023-12-04 Mon>
- 原以为会顺其自然到来的未来并不会如期而至
- 呜呜，能不能让我去POPL

* <2023-11-14 Tue>
- だからもう会えないや, ごめんね

* <2023-11-04 Sat>
- 傻逼签证
- 什么时候出去玩

* <2023-10-23 Mon>
- 为什么 vertico 的历史记录老是丢, 好蠢
- 好困

* <2023-10-16 Mon>
- c++ v8 wcnm

* <2023-10-15 Sun>
- 能把 Asahi 这东西跑搞起来的真是 nmd 天才
[[../figures/AsahiLinux.png]]

* <2023-10-14 Sat>
- 呜呜, 好想打dota2

* <2023-10-04 Wed>
- tmlgbd ppt搞这么清楚干嘛, 花一年做个ppt非要把什么东西都在ppt里面写清楚, ppt这么清楚我直接把slides发给大家当paper读不就完了呗, 还要我上台讲个jb
- Motivation Motivation Motivation Motivation Motivation
  - 不是, 没有 motivation 我到底为什么要做啊

* <2023-10-02 Mon>
- 2023 年的冠军也很好, 只是偶尔还是会怀念 2018 年的夏天

* <2023-09-20 Wed>
- wcnm我真的懂memory吗，傻逼page到底怎么做的hardware trap啊
- 猫睡觉到底会不会落枕

* <2023-09-19 Tue>
- 我真的好想吃酱香饼，傻逼温哥华，呜呜

* <2023-09-10 Sun>
- 晋江排行榜上小说全是初中生在写，初中生在读吗？
- 写的都是什么垃圾

* <2023-08-28 Mon>
- 2017年已经是6年前了啊

* <2023-06-24 Sat>
- 生日快乐
- 我tm嗑死

* <2023-06-18 Sun>
- 心乱了

* <2023-05-08 Mon>
#+begin_quote
最痛的痛是原谅
#+end_quote

- 怎么会有人写得出这种词啊

* <2023-05-05 Fri>
- 换到loveit咯, 不错不错
  - [ ] taxonomy
  - [ ] 排序
  - [ ] 多语言
- [ ] 用cherry是不是可以把 Spectre-STL 的表达式转成单个变量表达式判断相等呢

* <2023-04-03 Mon>
- Ok, I guess math is also philosophy
- Programming language is also philosophy

* <2023-03-19 Sun>[2/4]
- 人贵自知
- 它猫猫的
- 怎么这么多b事

** TODO Constant-time + Data-oblivious

- 读+测试 binsec/rel + pitchfork

** TODO ebpf
- parse bpd bytecode
  - 带 indirect jump 的 code 要怎么 parse 啊?
- instrument USLH
  - 真的有必要 USLH 吗, 又有点忘了
  - 还真要, USLH 多了 ~rep~, ~arith~ 虽然不知道为什么需要特殊处理 ~arith~

** DONE type-system
- 做个 TAL/checked-C ++ 算了
- 普通 taint analysis 分析 secret independent control-flow + memory access

** DONE upfuzz dinv
- reconstruct output stream
- 普通记录个 =bytestream= 先

* <2023-03-14 Tue>
#+begin_quote
怪不得故事里的反派会一脸欢愉地盘算着阴谋诡计，我终于有些理解他们的心情了
#+end_quote

- [X] emacs 配置真难做吧, project + vertico 搭配不好, sort 又慢, 可能还得自己写 cache 或者等 project.el 自己加 sort, workspace 也难搞的一b, 为什么所有人想的都是 restore 一个 layout 呢, 就没有人想单纯的切换一个基于 project 隔离 buffer 的工作区吗
  - 居然一晚上自己搞好了, 我真nb

* <2023-03-09 Thu>[0/0]
- 这些个 b paper 给个 git repo 不带 docker 给个勾八跑不起来的脚本全 tm 狗屎狗屎狗屎 bsbsbs

* <2023-03-08 Wed>[0/4]
- fk trt, 怎么会这么 jb 冷啊, 5点钟太阳直接照瞎, dt 还没地方玩
- [ ] secure boot 好像也只是一个 checksum 证明一个 OS/image 是你知道的那个 image 吧, 但是也没有证明这个 OS/image 有哪个些 property 啊. 比如一个 application contact 说我不会恶意监控你的 sensor 扫你的盘, 我怎么知道这个 app 会不会遵守协议.
- [ ] 在 cloud 上对所有 application 先做 verification 加个 signature 再允许部署不好吗, 直接解决 peer adversary 的问题. 当然要 verify 的好像有点多
- [ ] zero-knowledge 到底能证明什么 knowledge 啊, 感觉不能验证上面的东西, 但是只是证明自己知道个数也太弱了吧
- [ ] network QoS的问题, 如果 NIC 一直 duplicate packet 去到两个独立的 server, 是不是用两倍的 bandwidth + server 资源可以保证 ~2-p~ 的 QoS.
  - 不过 ~2-p~ 的 QoS 好像也没好到哪去……


* <2023-03-03 Fri>[1/1]
- [X] DEFCON 上面应该没有 serverlesss attack 的 talk, 应该需要在 [[https://www.blackhat.com/html/archives.html][blackhat]] 上找找
  - blackhat 也没有

* <2023-03-02 Thu>[1/2]
- [X] 为什么 Dynamic Link Library 跟 process isolation 可以兼容？process isolation 给每个 process 独立的 virtual address, 每个 process 访问 so 应该都需要拷贝一份到自己VA. 这 so 哪里 shared 了?
  + 不知道为什么记错 VA 的概念了, 整个 system 都使用一个 Virtual Address Space, 只是每个 process 被分配到一段 exclusive 的区域, 以 page 管理
  + dynamic library 是通过 RWX ACL share 的, 如果一个 process 试图改变 dynamic library 的 permission, 内核直接创建一份 dynamic library 的 copy 防止 poisoning
- [ ] ebpf 的 data segment 在 verifier 阶段是不确定的吗？ code segment 应该已经确定了 base address 不然 verifier 怎么做到 rewrtie indirect jumps to direct jumps? code 确定 data 不确定这合理吗

