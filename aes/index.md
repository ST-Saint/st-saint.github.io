# AES



* AES (Advanced Encryption Standard)
- The Advanced Encryption Standard is symmetric encryption specification

** Key
- keys could be 128, 192, and 256 bits
- The repetition go through 10, 12 or 14 rounds

** Block
- 16 bytes
- a 4x4 matrix holds the data in a single block

** Round
- Each round consists of 4 steps
  1. applying a key - addRoundKey()
  2. substituting bytes - subBytes()
  3. shifting rows - shiftRows()
  4. mixing columns - mixColumns()

** S-Box
- Substitution Box

* Add Round Key
- A bit-wise XOR between the 16-byte state and the appropriate 16-bytes of the expanded key.
- You pass the block data stored in the state array through an XOR function with the first key generated (K0). It passes the resultant state array on as input to the next step.


\begin{align*}
& \begin{bmatrix}
block_{1,1} & block_{1,2} & block_{1,3} & block_{1,4} \\
block_{2,1} & block_{2,2} & block_{2,3} & block_{2,4} \\
block_{3,1} & block_{3,2} & block_{3,3} & block_{3,4} \\
block_{4,1} & block_{4,2} & block_{4,3} & block_{4,4} \\
\end{bmatrix} \bigoplus
\begin{bmatrix}
key_{1,1} & key_{1,2} & key_{1,3} & key_{1,4} \\
key_{2,1} & key_{2,2} & key_{2,3} & key_{2,4} \\
key_{3,1} & key_{3,2} & key_{3,3} & key_{3,4} \\
key_{4,1} & key_{4,2} & key_{4,3} & key_{4,4} \\
\end{bmatrix} \\
= &
\begin{bmatrix}
block_{1,1} \bigoplus key_{1,1} & block_{1,2} \bigoplus key_{1,2} & block_{1,3} \bigoplus key_{1,3} & block_{1,4} \bigoplus key_{1,4} \\
block_{2,1} \bigoplus key_{2,1} & block_{2,2} \bigoplus key_{2,2} & block_{2,3} \bigoplus key_{2,3} & block_{2,4} \bigoplus key_{2,4} \\
block_{3,1} \bigoplus key_{3,1} & block_{3,2} \bigoplus key_{3,2} & block_{3,3} \bigoplus key_{3,3} & block_{3,4} \bigoplus key_{3,4} \\
block_{4,1} \bigoplus key_{4,1} & block_{4,2} \bigoplus key_{4,2} & block_{4,3} \bigoplus key_{4,3} & block_{4,4} \bigoplus key_{4,4} \\
\end{bmatrix}
\end{align*}

* Sub Bytes
- replace each bytes in the block with the values in S-Box

\begin{align*}
\begin{bmatrix}
block_{1,1} & block_{1,2} & block_{1,3} & block_{1,4} \\
block_{2,1} & block_{2,2} & block_{2,3} & block_{2,4} \\
block_{3,1} & block_{3,2} & block_{3,3} & block_{3,4} \\
block_{4,1} & block_{4,2} & block_{4,3} & block_{4,4} \\
\end{bmatrix} \rightarrow
\begin{bmatrix}
S-Box(block_{1,1}) & S-Box(block_{1,2}) & S-Box(block_{1,3}) & S-Box(block_{1,4}) \\
S-Box(block_{2,1}) & S-Box(block_{2,2}) & S-Box(block_{2,3}) & S-Box(block_{2,4}) \\
S-Box(block_{3,1}) & S-Box(block_{3,2}) & S-Box(block_{3,3}) & S-Box(block_{3,4}) \\
S-Box(block_{4,1}) & S-Box(block_{4,2}) & S-Box(block_{4,3}) & S-Box(block_{4,4}) \\
\end{bmatrix}
\end{align*}

* Shift Rows
[[https://upload.wikimedia.org/wikipedia/commons/6/66/AES-ShiftRows.svg]]

* Mix Column
- Matrix production in Galois field

\begin{align*}
\begin{bmatrix}
2 & 3 & 1 & 1 \\
1 & 2 & 3 & 1 \\
1 & 1 & 2 & 3 \\
3 & 1 & 1 & 2
\end{bmatrix} \times
\begin{bmatrix}
block_{1,1} & block_{1,2} & block_{1,3} & block_{1,4} \\
block_{2,1} & block_{2,2} & block_{2,3} & block_{2,4} \\
block_{3,1} & block_{3,2} & block_{3,3} & block_{3,4} \\
block_{4,1} & block_{4,2} & block_{4,3} & block_{4,4} \\
\end{bmatrix}
\end{align*}

