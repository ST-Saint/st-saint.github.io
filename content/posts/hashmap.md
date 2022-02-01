+++
title = "Hashmap"
author = ["ST-Saint"]
draft = false
date = "Tue, 01 Feb 2022 22:14:25 +0800"
categories = ["diary"]
tags = ["diary", "hash"]
+++

## Hashmap {#hashmap}

-   一般都说 hashmap 复杂度O(1), 感觉应该不完全是
-   研究一下


### Werid things {#werid-things}

-   容易想到如果有无限大数组, 直接当作桶对 object 取 hash, 期望不会 collide 就行
-   显然没有无限大内存，怎么做 index


### Java implement {#java-implement}

-   实现是 hash_array (length: n to the pow of 2)
-   处理 collision
    1.  linkedlist
    2.  R-B tree


#### Index {#index}

-   index map 的话, length 是 2 的幂次, hash 值直接取后n位, 作为 array 的 index
    -   有人说是高位和低位异或的, 听起来更有道理, 之后看看源码
-   array 小还是比较容易碰撞的, 元素多了就扩容


#### Resize {#resize}

<!--list-separator-->

-  when

    -   有个`loadFactor`, 估计是说 array 的 density 高了 or 碰撞太多就 resize, 之后看看源码

<!--list-separator-->

-  how

    -   double length 之后 array 都得遍历一下吧,
        -   list 直接重新算index插入
        -   BR tree 转回两个 list, 再重新计算要不要转成RB tree
    -   upper bound 好像是 2^30, 还蛮大的, 不知道内存会占多少G


#### <span class="org-todo todo TODO">TODO</span> Source code review {#source-code-review}


### Summary {#summary}

-   显然查询是乐观估计的O(1), 最差是O(log_n), 不过应该是达不到最差, resize得当的话应该一直接近O(1)
-   添加删除需要重构, 假设元素个数等于数组长度就扩容, 迭代元素的复杂度均摊是O(2n)
    -   不过RB tree建树是O(n\*log_n)的, 碰撞率是`v`的话, 这一部分的复杂度差不多是O(nv\*log_nv), 介于`v`太小所以也可以近似忽略吧
-   总的来说`hash` + `resize`算法好的话, 碰撞率太低了, 还是可以认为 hashmap 复杂度是近似O(1)的
