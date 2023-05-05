# Diary



* <2023-04-03 Mon>
- Ok, I guess math is also philosophy
- Programming language is also philosophy

* <2023-03-19 Sun>[0/4]
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

** TODO type-system
- 做个 TAL/checked-C ++ 算了
- 普通 taint analysis 分析 secret independent control-flow + memory access

** TODO upfuzz dinv
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

