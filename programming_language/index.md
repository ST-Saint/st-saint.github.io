# Programming_Language


* Terminologies
** Fully qualified name
- In computer programming, a fully qualified name is an unambiguous name that specifies which object, function, or variable a call refers to without regard to the context of the call.

** Encapsulation

** Total Function
1. Every function must be a total (as opposed to partial) function. That is, it must have a definition for everything inside its domain.
2. A restricted form of recursion, which operates only upon 'reduced' forms of its arguments, such as Walther recursion, substructural recursion, or "strongly normalizing" as proven by abstract interpretation of code.
3. No effects?
** Congruence
- A relation is said to be a congruence for a given function if it is preserved by applying that function. If e is evidence that ~x ≡ y~, then ~cong f e~ is evidence that ~f x ≡ f y~, for any function ~f~.
** Heaps
- definition: ~H ::= · | H, x \to c~
- memory: ~\sigma~
- evaluate to: ~H ; e ⇓ c~, \[ ⟦x⟧_{\sigma} = \sigma (x) \]

** Inference rules
- Structure:
  - Top: hypotheses
  - Bottom: conclusion (read first)
  - By definition, if all hypotheses hold, then the conclusion holds

- constant: \[\frac{}{H;c \Downarrow c}\]
- variable: \[\frac{}{H; x \Downarrow H(x)}\]
- add: \[\frac{H;e_1 \Downarrow c_1 \quad H;e_2 \Downarrow c_2}{H; e_1 + e_2 \Downarrow c_1 + c_2}\]

** Instantiating rules
Example instantiation:
\[\frac{}{\cdot,y \mapsto 4 ; y \Downarrow 4}\]
Instantiates:
\[\frac{}{H;c \Downarrow c}\]


** Derivations
- A (complete) derivation is a tree of instantiations with axioms at
the leaves

** Theorems
- Progress: For all H and e, there exists a c such that \[H ; e \Downarrow c\]
- Determinacy: For all H and e, there is at most one c such
that \[H ; e \Downarrow c\]

** On to statements

A statement does not produce a constant. It produces a new, possibly-different heap.

"small-step" semantic: \[H_1 ; s_1 \to H_2 ; s_2 \]

*** Statement semantics
assign: \[\frac{H;e \Downarrow c}{H;x:=e \to H, x \mapsto c; skip}\]

seq1: \[\frac{}{H ; skip ; s \to H ; s}\]
seq2: \[\frac{H;s_1 \to H' ; s'_1}{H;s_1 ;s_2 \to H'; s'_1 ; s_2 }\]

if1: \[\frac{H ; e \Downarrow c \quad c > 0}{H; if \; e \; s_1 \; s_2 \to H; s_1}\]

if2: \[\frac{H ; e \Downarrow c \quad c \le 0}{H; if \; e \; s_1 \; s_2 \to H; s_2}\]

while e s (do s and loop if e > 0): \[\frac{}{H ; while \; e \; s \to H ; if \; e \; (s; while \; e \; s) \; skip}\]


machine iterates: \[H_1;s_1 \to H_2;s_2 \to H_3;s_3 \cdots\]

\[H_1 ; s_1 \to^{n} H_2 ; s_2\] mean “becomes after n steps”
\[H_1 ; s_1 \to^{*} H_2 ; s_2\] mean “becomes after 0 or more steps”

The program s produces c if \[\cdot ; s \to^{∗} H ; skip \; \text{and} \; H(ans) = c\]

** First-order Logic

** Separation Logic

** Floyd-Hoare logic

** Effect Handlers

** Gradual Type

* Curry–Howard Correspondence
| Type   | Programming view                             | Proving view                                              |
| A -> B | Function transforming A values into B values | A implies B (transforms evidence of A into evidence of B) |
| forall | ??                                           | Universal quantification                                  |
| A * B  | Pairs of values                              | Logical conjunction (A /\ B)                              |
| A + B  | “Tagged union”: either an A or a B           | Logical disjunction (A \/ B)                              |
| unit   | Trivial type with just one value             | TRUE                                                      |
| empty  | Type with no values                          | FALSE                                                     |
| exists | ??                                           | Existential quantification                                |

** Currying
- /Currying/ is the technique of translating a function that takes multiple arguments into a sequence of families of functions, each taking a single argument
  - The idea actually appears in the Begriffsschrift of Gottlob Frege, published in 1879.
- Function arrows associate to the right and application associates to the left

  + ~ℕ → ℕ → ℕ~ stands for ~ℕ → (ℕ → ℕ)~

  + ~_+_ 2 3~ stands for ~(_+_ 2) 3~

