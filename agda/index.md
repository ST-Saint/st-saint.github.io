# Agda


* Install

** cabal
#+begin_src sh
cabal update
cabel install Agda
#+end_src

* agda-mode
- To load and type-check the file, use ~C-c C-l~.

- Agda is edited interactively, using “holes”, which are bits of the program that are not yet filled in. If you use a question mark as an expression, and load the buffer using C-c C-l, Agda replaces the question mark with a hole. There are several things you can do while the cursor is in a hole:

  - C-c C-c: case split (asks for variable name)
  - C-c C-space: fill in hole
  - C-c C-r: refine with constructor
  - C-c C-a: automatically fill in hole
  - C-c C-,: goal type and context
  - C-c C-.: goal type, context, and inferred type

** translation
- ~agda-input-show-translations~

* Naturals: Natural numbers

** definition
#+begin_src agda
data ℕ : Set where
  zero : ℕ
  suc  : ℕ → ℕ
#+end_src

~ℕ~ is the name of the datatype we are defining, and ~zero~ and ~suc~ (short for successor) are the constructors of the datatype.

** Operations

*** add
#+begin_src agda
_+_ : ℕ → ℕ → ℕ
zero + n = n
(suc m) + n = suc (m + n)


_ : 2 + 3 ≡ 5
_ =
  begin
    2 + 3
  ≡⟨⟩    -- is shorthand for
    (suc (suc zero)) + (suc (suc (suc zero)))
  ≡⟨⟩    -- inductive case
    suc ((suc zero) + (suc (suc (suc zero))))
  ≡⟨⟩    -- inductive case
    suc (suc (zero + (suc (suc (suc zero)))))
  ≡⟨⟩    -- base case
    suc (suc (suc (suc (suc zero))))
  ≡⟨⟩    -- is longhand for
    5
  ∎
#+end_src

* Language syntax
** Comment
- ~--~
- ~{- xx -}~

*** pragma
#+begin_src agda
{-# BUILTIN NATURAL ℕ #-}
#+end_src

** Import

#+begin_src agda
import Relation.Binary.PropositionalEquality as Eq
open Eq using (_≡_; refl)
open Eq.≡-Reasoning using (begin_; _≡⟨⟩_; _∎)
#+end_src

- The second line opens that module, that is, adds all the names specified in the using clause into the current scope. In this case the names added are ~_≡_~, the equality operator, and refl, the name for evidence that two terms are equal.
- The third line takes a module that specifies operators to support reasoning about equivalence, and adds all the names specified in the using clause into the current scope. In this case, the names added are ~begin_~, ~_≡⟨⟩_~, and ~_∎~.


** underbars
Agda uses underbars to indicate where terms appear in infix or mixfix operators. Thus, ~_≡_~ and ~_≡⟨⟩_~ are infix (each operator is written between two terms), while ~begin_~ is prefix (it is written before a term), and ~_∎~ is postfix (it is written after a term).

** Precedence
- Application binds more tightly than (or has precedence over) any operator, and so we may write suc m + n to mean (suc m) + n
- Function arrows associate to the right and application associates to the left

  - ~ℕ → ℕ → ℕ~ stands for ~ℕ → (ℕ → ℕ)~
  - ~_+_ 2 3~ stands for ~(_+_ 2) 3~

#+begin_src agda
infixl 6  _+_  _∸_
infixl 7  _*_

-- infixl level

infixl ∸

-- associate to the left

infixr ∸

-- associate to the right

infix ∸

-- () is always required
#+end_src

** Congruence
- A relation is said to be a congruence for a given function if it is preserved by applying that function. If ~e~ is evidence that ~x ≡ y~, then ~cong f e~ is evidence that ~f x ≡ f y~, for any function ~f~.
 + Consecutive ~cong~
  #+begin_src agda
  cong (λ x → x O) (cong (λ x → x I) (to-from b))
  #+end_src

** symmetric
- If ~e~ provides evidence for ~x ≡ y~ then ~sym e~ provides evidence for ~y ≡ x~.

** Implicit arguments
- ~{ }~ in definition means arguments are implicit
- ~_~ asks Agda to infer the value of the explicit argument from context

** With
- The keyword ~with~ is followed by an expression and one or more subsequent lines. Each line begins with an ellipsis (...) and a vertical bar (|), followed by a pattern to be matched against the expression and the right-hand side of the equation.
- Equivalent to ~x = helper: y → x where helper y = ...~

