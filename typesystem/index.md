# Type System


* Terminology

** Judgement
- A judgement is something we may know, that is, an object of knowledge
- A judgement is evident if we in fact know it

- \(e:t\) \Rightarrow the expression e has type t

- \(\Gamma\) \Rightarrow Context: a set of <variable, type> pairs

  + \(\vdash\) \Rightarrow turnstile

  + \(\Gamma \vdash e : t\) \Rightarrow expression e has type t in the context \(\Gamma\)

  + \(\Gamma , x:\tau\) \Rightarrow extends \(\Gamma\) with knowledge: \(x:\tau\)

** Inference Rules

- \(\frac{P1\ P2\ P3\ ...}{C}\)
  + C \Rightarrow conclusion
  + P \Rightarrow premise
  + If we konw P1 & P2 & P3 then we know C


*** Derivation
#+begin_quote
In ML, a typing derivation is a proof that some expression can have some type, given a particular context, not that the expression can only have that type or that the expression will have that type no matter where we encounter it.

a derivation for ρ ⊢ e : t is a proof that in some context ρ (which assigns types to variables in e), we can show that e can have (at least) the type t, and possibly others.
#+end_quote

- The one-step evaluation relation → is the smallest binary relation on terms
- When the pair (t , t') is in the evaluation relation, we say that "the evaluation statement (or judgment) t → t' is derivable."

**** Derivation Tree
\begin{equation}
\notag \large \dfrac{\dfrac{\dfrac{x:Bool \in x: Bool}{x:Bool \vdash x:Bool}}{\vdash \lambda x:Bool . x : Bool \rightarrow Bool} \qquad \dfrac{}{\vdash true: Bool} }{\vdash (\lambda x: Bool.x )\ true: Bool}
\end{equation}

** Reduction
- Also known as *subject evaluation*, *type preservation* or simply *preservation*

  A. $$\frac{\Gamma \vdash e_1:\tau\qquad e_1 \rightarrow e_2}{\Gamma \vdash e_2:\tau}$$

  B. $$\frac{}{if\ True\ then\ e1\ else\ e2 \rightarrow e1}$$

  C. $$\frac{e \Downarrow True}{if\ e\ then\ e1\ else\ e2}$$ $${if\ True\ then\ e1\ else\ e2\ \rightarrow\ e1}$$

** Substitution

- $$[x \rightarrow s]x = s$$
- $$e[x \backslash e^a] == [ x \rightarrow e^a] e$$

\begin{align}
& [ x \rightarrow e^{'}](let y=e_1\; in\; e_2 ) \\
= & let y = [x \rightarrow e^{'}]e_1\; in\; [x \rightarrow e^{'}]e_2
\end{align}

** Unification

** 推导 (deduction)

** Induction

** Continuation

** Foreign function interface (FFI)
** Encapsulation
** landin' knot
- represent recursion
  + 13.5.8

* Refinement Types

** Introduction
- programs can do things wrong:
  1. Divided by zero
  2. Buffer overflow
  3. mismatched dimension
     - wrong type casting
  4. logic bug
     - integer range [min, max]
  5. Correctness error
- Refinement type system uses predicates to enrich the type information

*** passes
1) STCL
2) branch conditions -- path-sensitive
3) infer refinements
4) type polymorphism -- context-sensitive
5) polymorphic data types
6) refinement polymorphism for different invariants
7) verify termination???
8) proof proposition over UDF

** Simply Typed \lambda-calculus
- primitive constants: =nat=
- primitive operations: =add=
- function type with constrain

*** Verification Conditions
- take the annotated program as input and return a VC

*** arithmetic overflow
- seems like we can simply add a upper bound (2^31 or 2^63) to avoid overflow here

** Branches and Recursion
- also convert to branches conditions to similar VC

** questions
*** Differences between refinement type system and symbolic execution
- To formally verify the division by, buffer overflow and integer range problems, refinement type system also add predicates and constrains over variable and use SMT solver to resolve these constrains, so what does refinement types do differently? or actually symbolic execution is one component of refinement type system?
*** what would the refinement type system do if the conditions cannot be solved by SMT?
- if the condition cannot be satisfied, then it should be a logic bug?
*** it is a bit confusing that how could you verify termination with a recursion function?

* Sized Types
- Input makes the program unpredictable. The inputs can taint data or even the control-flow, making memory mess and analysis tricky.
- Sized type system is to
  - check computation of each stream element terminates.
  - express bounds on the sizes of recursive data structures.

** productive
- a request for the first ~i~ element of the stream is guaranteed to be processed in finite time means the program is productive
- I guess =head= is to read the first element of a stream and =tail= is the stream excluding the first element
- so we introduce type: ~ST^i~ for streams with at least i elements
- using sized types we can infer the lower bounds on the size of all the streams
- if we can claim a function has a type: ~ST^i -> ST^j && i>j~ then we can prove termination

** Primitive Recursion: Reverse
- sized type system can prove termination or productivity of functions in primitive recursive form

#+begin_src lisp
reverse :: \forall i. \forall t. LIST_i t -> LIST_i t
reverse xs =
case xs of
Nil -> Nil
Cons y ys -> append (reverse ys) (Cons y Nil)
#+end_src

1. =Nil -> Nil= has type ~LIST_{i+1} t~ (why i+t though)
2. append (Reverse ys) (Cons y Nil) :: LIST_{_{i+1}} -> t

*** Accumulating Parameters
- allow a limited form of polymorphic recursion: over sizes, but not types.

** Array Bounds Check
- We view an array as a function from indices to contents
  - an array of t with 6 elements has type ~NAT_6 -> t~

** questions
- I guess ~Mk~ and ~ST~ are all special keywords and ~ST~ is stream. However I still don't get what how to combine a ~NAT~ and a ~ST~
- Sized Type consider the length of the stream instead the value of streams. I think the value of input is also important. For example, the Array Bounds Check problem, a common scenario is the array having a dynamic length (i.e. depends on input), and the length becomes unknown to tpye system. So if we want to constrain the input refinement type sounds more reasonable but it will probably become a SAT problem. Even though I feel memory allocation is still a conflict between efficiency and safety. If you allow dynamically length it is more tricky to prove the safety but you gain some flexibility. Is it possible to combine sized type and refinement type to check more security properties of the program?

* typing vs typechecking
- 顶不住了, 先看看中文文档吧 [[https://github.com/FrankHB/pl-docs/blob/master/zh-CN/typing-vs-typechecking.md][typing-vs-typechecking]]


** 本体论(Ontology)
- 类型是一种抽象的实体(entity)
- 类型不是名称

*** 类型 = 分类？
- 不是
- 不是为了对现有对象"分类", 因为被“分类”的对象都是先前毫无意义, 只是通过这个类型才确定的, 而且具有这样类型的值 *只可能有一种完全等价的* 构造方式, 这就是所谓的 ~unit type~ 的实例

*** 类型是什么
- 对于某个类型系统中的类型——这种人为设计中的一份子
- 类型系统的设计者或者类型的设计者（类型系统的用户）希望它是什么

*** 历史上的类型是什么
- [[https://zh.wikipedia.org/zh-cn/%E7%BD%97%E7%B4%A0%E6%82%96%E8%AE%BA][罗素悖论]] - [[https://zh.wikipedia.org/zh-cn/%E7%B1%BB%E5%9E%8B%E8%AE%BA][类型论]]
  - 任给一个性质(例如："年满三十岁"就是一个性质)，满足该性质的所有集合总可以组成一个集合
  - 设有一性质P，并以一性质函数表示：P(x)，且其中的自变量x有此特性： x \notin x，
    - 不是, x \notin x 是什么意思

- 我靠我一直觉得 PL 讲的 type 本质都应该是数学集合, 好像还是有点道理, 然而类型系统好像是集合论的上位(也许)替代

*** 类型的意义
- 各种类型论中, 并没有要求"类型"成为和某种领域外实体的对应, 以作为建模或"分类"的基础, 而仅仅是项 (term) 上关联的一些抽象实体

** 派生概念

*** 类型正确(Type Correctness)

- 符合期望

- 类型是开发者对数据、对实体属性的描述, 显式类型是开发者对于程序设计的理解和限定的直接描述
  - 原文对可读性和重构的考虑脱离实际
  - 使用 ~var~, ~auto~ 借用 Type inference 省去对数据的描述是让开发者在上下文中丢失对数据的理解, 且不便于第三方审阅代码; 在重构时, 考虑代码改动对数据, 对上下文的影响是非常重要且易错的环节, 显式类型要求开发者对语义的改变进行考虑(当然如果开发者匆匆掠过是另一个问题), 类型推断提供了开发便利但不利于保证程序正确性
  - 即使使用 ~var~, ~auto~ ，一个不可忽视的事实是, 编译器生成的 binary 并不包含 ~var~ 类型, 实际 runtime 类型有且只有一个具体类型(如果有 runtime type), 如果没有 runtime type 那么数据就只是纯粹的数据而不带任何限制, 这与源代码中 ~var~, ~auto~ 所表达的类型不匹配, 而开发者因代码和运行时的差异对程序行为做出错误预测是非常不理想的设计缺陷
  - 一个可以接受的选择是type system在编译前就将 ~auto~ 替换成具体类型

*** 类型识别(Type Identification)
- 要判断类型是否相同, 比较给定的表示类型的数据结构（类型标识）和已知类型的对应数据结构是否相等

*** 类型转换(Type Conversion)
- 强制(coercion) 是一种隐式转换
- 多态(ad-hoc polymorphism) 而和铸型(casting) 显式转换


*** 类型安全(Type Safety)
- 较常用的一种安全机制的基本思路是，定义类型是某个域(domain)中值的集合, 保证类型安全需要考察的值是否总是符合其对应类型的约束.
  - 判断对象语言描述的程序是否符合类型安全这项任务能被程序表达和实现(包括语言自身的实现, 如编译时的检查).
  - 这样, 类型安全可以视为某一些语言规则中蕴含的性质
  - 当语言的规则不足以保证它表达的任意操作产生的值属于规则事先指定的值的集合之内, 这些规则就不是安全的

- 安全一般考虑两个方面, 一个是 confidentiality, 一个是 integrity
  - 未定义行为说成类型不安全其实是符合安全的描述的, 对应 integrity 的 control-flow & information-flow integrity

*** 类型检查(Typechecking)
- 现实的类型安全一般通过在语言设计中由两类手段提供支持
  1. 语言的构造性规则限制不安全类型构造的表达 -- typing
  2. 语言对潜在不安全的表达进行额外的语义检查 -- type checking (广义地也能包含typing)

- 尽管一般实现 typechecking 蕴含解一个判定性问题 -- 即作用于代码上判断出一个表示 "通过" 或"不通过"的二元结果, 却并不一定表示接受或者拒绝接受程序
  - 一条语言规则不会因为实现要求附加其它行为或不要求任何可预测的行为 (所谓未定义行为) 而不适合归类为 typechecking 规则; 举例: C 的许多使用非兼容类型 (compatible type) 的值的操作是未定义行为, 这不是 typing, 而指定了作用于指针类型上的 typechecking

*** 静态/动态 类型
- 静态类型或者动态类型都和 typing 的时机有关; 而单纯静态/动态, 对彻底不提供类型系统设计的 typeless 的语言都可能说得通

*** 强类型
- 强类型 (strong type/strong typing/strongly typed)
- manifest typing/latent typing

* Dependent typing
# 依赖类型可对应于谓词逻辑中的全称量词和存在量词
- a dependent type is a type whose definition depends on a value
- dependent types are used to encode logic's quantifiers like "for all" and "there exists"

  # 依赖类型的两个常见实例是依赖函数类型（又称依赖乘积类型、Π-类型）和依赖值对类型（又称依赖总和类型、Σ-类型）
# - 一个依赖类型函数的返回值类型可以依赖于某个参数的具体值, 而非仅仅参数的类型
#   - 例如, 一个输入参数为整型值n的函数可能返回一个长度为n的数组; 一个依赖类型值对中的第二个值可以依赖于第一个值, 例如, 依赖类型可表示这样的类型: 它由一对整数组成, 其中的第二个数总是大于第一个数。

- Two common examples of dependent types are dependent functions, which correspond to "for all" and dependent pairs, which correspond to "there exists". The return type of a dependent function may depend on the value (not just type) of one of its arguments.

  # 确定两个依赖于值的类型的等价性需要涉及具体的计算，若允许在依赖类型中使用任意值的话，其类型检查将会成为不可判定问题；
- Deciding the equality of dependent types in a program may require computations. If arbitrary values are allowed in dependent types, then deciding type equality may involve deciding whether two arbitrary programs produce the same result
  - the decidability of type checking may depend on the given type theory's semantics of equality, that is, whether the type theory is intensional or extensional.

# 一些以证明辅助为主要目的的编程语言采用强函数式编程（total functional programming），这消除了停机问题，同时也意味着通过它们自身的核心语言无法实现任意无限递归，不是图灵完全的，如 Coq 和 Agda

** Formal definition
*** Π type
- dependent types are similar to the type of an indexed family of sets
- formally, given a type ~A: U~ in a universe of types ~U~, one may have a family of types ~B: A \to U~, which assigns to each term ~a: A~ a type ~B(a): U~. We say that the type ~B(a)~ varies with ~a~.
- A function whose type of return value varies with its argument (i.e. there is no fixed codomain) is a dependent function and the type of this function is called dependent product type, pi-type (Π type) or dependent function type.
  - Written as ~\Pi_{(x:A)} B(x)~
*** Σ type
- The dual of the dependent product type is the dependent pair type, dependent sum type, sigma-type
- If, in the universe of types ~U~, there is a type ~A: U~ and a family of types ~B: A \to U~, then there is a dependent pair type ~\sum_{x:A} B(x)~
- The dependent pair type captures the idea of an ordered pair where the type of the second term is dependent on the value of the first. If ~(a,b):\sum_{x:A}B(x)~ then ~a: A~ and ~b: B(a)~

** Extra reading
*** Extensional and intensional definitions

**** Intensional definition
- An intensional definition gives meaning to a term by specifying necessary and sufficient conditions for when the term should be used.
- intensional definitions are best used when something has a clearly defined set of properties, and they work well for terms that have too many referents to list in an extensional definition.

**** Extensional definition
- An extensional definition gives meaning to a term by specifying its extension, that is, every object that falls under the definition of the term in question.
- An explicit listing of the extension, which is only possible for finite sets and only practical for relatively small sets, is a type of enumerative definition.
- Extensional definitions are used when listing examples would give more applicable information than other types of definition, and where listing the members of a set tells the questioner enough about the nature of that set.

#+begin_quote
A fundamental distinction is extensional vs intensional type theory. In extensional type theory, definitional (i.e., computational) equality is not distinguished from propositional equality, which requires proof. As a consequence type checking becomes undecidable in extensional type theory because programs in the theory might not terminate. For example, such a theory allows one to give a type to the Y-combinator; a detailed example of this can be found in Nordstöm and Petersson Programming in Martin-Löf's Type Theory.[2] However, this does not prevent extensional type theory from being a basis for a practical tool; for example, NuPRL is based on extensional type theory.
#+end_quote

*** intuitionistic logic
- In the semantics of classical logic, propositional formulae are assigned truth values from the two-element set ~\top, \bot~ ("true" and "false" respectively)
  - This is referred to as the 'law of excluded middle', because it excludes the possibility of any truth value besides 'true' or 'false'
- Propositional formulae in intuitionistic logic are not assigned a definite truth value and are only considered "true" when we have direct evidence, hence proof.
- if there is a constructive proof that an object exists, that constructive proof may be used as an algorithm for generating an example of that object, a principle known as the Curry–Howard correspondence between proofs and algorithms.
- the double negation of the law is retained as a tautology of the system: that is, it is a theorem that ~\neg(\neg (P \vee \neg P))~ regardless of the proposition ~P~
- In intuitionistic logic, only ~P \rightarrow \neg\neg P~ is theorem, ~\neg\neg P \rightarrow P~ is not

*** First-order logic
- First-order logic—also known as predicate logic, quantificational logic, and first-order predicate calculus
- Predicate logic is an extension of propositional logic, adding quantifiers.


*** Curry–Howard correspondence
- Curry–Howard correspondence (also known as the Curry–Howard isomorphism or equivalence) is the direct relationship between computer programs and mathematical proofs.
  - A proof is a program, and the formula it proves is the type for the program


**** General formulation

| Logic side                             | Programming side                             |
| universal quantification               | generalised product type (Π type)            |
| existential                            | quantification generalised sum type (Σ type) |
| implication                            | function type                                |
| conjunction                            | product type                                 |
| disjunction                            | sum type                                     |
| true formula                           | unit type or top type                        |
| false formula                          | empty type or bottom type                    |
| hypotheses                             | free variables                               |
| implication elimination (modus ponens) | application                                  |
| implication introduction               | abstraction                                  |
| assumption                             | variable                                     |
| axiom schemes                          | combinators                                  |
| modus ponens                           | application                                  |
| deduction theorem                      | abstraction elimination                      |

**** Hilbert-style deduction systems

***** axiom schemes
1. α → (β → α)
   A. K: \lambda xy.x
2. (α → (β → γ)) → ((α → β) → (α → γ))
   A. S: \lambda xyz.(x z (y z))

***** formalization
- Let Γ be a finite collection of formulas, considered as hypotheses. Then δ is derivable from Γ, denoted Γ ⊢ δ, in the following cases:
  A) δ is an hypothesis, i.e. it is a formula of Γ,
  B) δ is an instance of an axiom scheme; i.e., under the most common axiom system:
     a) δ has the form α → (β → α), or
     b) δ has the form (α → (β → γ)) → ((α → β) → (α → γ)),
  C) δ follows by deduction, i.e., for some α, both α → δ and α are already derivable from Γ (this is the rule of modus ponens)


* From System F to Typed Assembly Language
** abstract
- type-preserving transformation from the System-F to Typed Assembly Language (TAL)
- admit low-level compiler optimization
- CPS & A polymorphic closure conversion phases
- Get type-correct source program and map it to type-correct ASM
- Compiler
*** question
- _suitable for use in systems where untrusted and potentially malicious code must be checked for safety before execution._ but in untrusted environment usually we could only access binary without source code
- CPS conversion, closure conversion, unboxing, subsumption elimination, or region inference
** introduction
- some type information are lost
- admits most conventional low-level optimizations such as
  1. global register allocation
  2. copy propagation
  3. constant folding
  4. dead-code elimination.
- [ ] _Except for a small number of atomic code patterns_. What patterns?
- support code motion
  1. instruction scheduling
  2. common-subexpression
  3. elimination
  4. loop-invariant removal
- not support
  1. run-time code generation
  2. intensional polymorphism
  3. array bounds check elimination
*** SPIN
- type-check in Linux kernel
** overview
*** TAL
*** type-preserving compiler
**** workflow
1. \lambda^F -> CPS conversion
2. \lambda^k -> Closure conversion
3. \lambda^C -> Hoisting
4. \lambda^H -> Allocation
5. \lambda^A -> Code Generation
** System-F
- polymorphic \lambda-calculus
** CPS
- continuation passnig style -- eliminates the need for a control stack
- all unconditional control transfer: function invocation and return are achieved via function call.
** \lambda^K
- \lambda^K consists of a series of let bindings followed by a function call
- only one abstraction for both type and value variables
- [ ] halt?
- functions do not return values but it just jumps
- expression never return values
- ∆; Γ ⊢_K e indicates that the term e is well formed
*** Translation
- ~K_exp 〚 e 〛~  takes a continuation k, computes the value of e and hands that value to k
- [ ] variable capture?
- [ ] can all STLC be transformed into CPS?
- a realistic CPS-converter would eliminate "administrative" redices and optimize tail recursion
** Simplified polymorphic closure conversion
- Making closure explicit and therby separating program code from data
  1. [ ] rewrite functions so that there is no free varaibles. how?
     A. function calls are performed by calling code with the environment as an addtional argument
  2. hoisting: lift the code blocks to the top of the program
  3. adopt the type-erasure interpretation of polymorphism which substitude the free type variables directly into code blocks
*** Translation
- ~C〚·〛~: \beta represent the type of the value environment for the closure
*** Hoisting
- =fix= is no longer a value form.
- code blocks are defined by =letrec= prefix
- [ ] =letrec= and mutually recursive and CPS?
** Explicit allocation
- eliminate the value form for tuples
- introduce new declaration forms for allocating and initializing tuples
  - n-element tuple can be separated into an allocation and n initialization
*** Translation
- [ ] memory layout of nested structure?
** Typed Assembly language
- simultaneously abstract
  1. a type environment
  2. a set of type arguments
  3. a set of value arguments
- assume an infinite supply of registers
  - if it is finite, spilling registers into a tuple and reloading values from this tuple
- distinguishable labels and registers
*** TAL syntax
- TAL machine state:
  1. heap
  2. register file
  3. instructions
*** TAL Operational Semantics
- a type-erasure interpretation does not erase the type from the semantics
*** TAL Static Semantics
- specify when programs are well formed and ensure the program will not get stuck
- formation judgments are for heaps + register file + instructions
*** Code generation
- For translation of function types, registers are assigned to value arguments
  - x = v \Rightarrow mov r_x, v
  - x = v_1 P v_2 \Rightarrow mov r_x, v1; arith r_x, r_x, v_2
  - if0(v, e_1, e_2) \Rightarrow mov r_tmp, v; bnz r_tmp, \ell[α]; I_1
  - ...
** Optimization
- how to reason the soundness of optimization?
  - measure the equivalence?
  - imaging a code snippet as a block-box ~B~. after some optimization, we can get a block-box ~B'~ which generates exactly some output as ~B~ for arbitrary input but require less latency.
  - that sounds so weird how could know what attributes are lost or kept during the optimization?

