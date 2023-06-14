# Covert and Side Channels



* Definition
- A covert channel is an intentional communication between a sender and a receiver via a medium not designed to be a communication channel. Basically a covert channel is any unconventional means of communication.
- Side Channel is similar to a covert channel, but the sender does not intend to communicate information to the receiver, rather sending (i.e. leaking) of information is a side effect of the implementation and execution
  - Side Channel do not rely on code vulnerability or theoretical weaknesses of algorithms
** Means for transmitting information
+ Timing
+ Power
+ Thermal emanations
+ Electro-magnetic (EM) emanations
+ Acoustic emanations
** Types of Covert Channels
- Storage
  + Communicates data by directly of indirectly writing to a storage location and another process directly or indirectly reading that location
  + e.g. Printer Queues, file locsk, shared buffer(?)
- Timing
  + Uses the time of an operation to communicate data
  + e.g. CPU cache (? I don't get it)
- Steganography
  - Hides information inside a typical communication channel
* Goals of Side and Covert Channels
- Goals of Side and Covert Channels Goal of side or covert channels is to break the logical protections/isolation of the computer system and leak confidential or sensitive information
  A. attacks on confidentiality
     - All attacks fall in this category, they establish a channel to exfiltrate information
  B. attack integrity (? I don't know)
  C. Beyond leaking data
     a. Leak control flow or execution patterns
     b. Leak memory access patterns
     c. Leak hardware usage patterns
** Channels: Victim-to-Attacker and Attacker-to-Victim
*** victim to an attacker
- attacker does not affect the victim's execution
*** attacker to victim
- victim responds the attacker's interference

* What Makes a Good Covert Channel
- Hard to detect
- High Bandwidth
- Easy to achieve
- Encryption
** example of covert channel
- embed data in an image
** example of side channel
1. Timing
2. CPU Cache
3. Power Usage
4. Electromagnetic field
5. Acoustic
6. Thermal
7. Speculation



* Timing Side Channels
- This is particularly problematic when the execution time depends on secret data
-  Can be exceptionally dangerous since they do not require the adversary and victim to necessarily share resources
** source code timing side channel
*** Instruction with Different Execution Timing
   - Execution of different instructions takes different amount of time (e.g. ADD vs. FPMUL)
*** Variable Instruction Timing
   - Execution of a specific instruction takes different time (e.g. AVX instructions are fast or slow when AVX is powered on and off, respectively)
   - For a specific instruction, its timing depends on the state of the processor. Different state, or different execution history of instructions, affect timing of certain instructions:
     A. Memory loads and stores: memory access hitting in the cache vs. memory access going to DRAM
     B. Multimedia instructions: whether AVX unit is powered on or not affects timing
     C. Reading from special registers such as RNG: random number generator slows down if it is used a lot and entropy drops
     D. Instructions that trigger some state cleanup, e.g. interrupt latency for SGX enclaves depends on amount of data processor has to clean up and secure before handling the interrupt
*** Functional Unit Contention
   - Sharing of hardware leads to contention, whether a program can use some hardware leaks information about other programs
*** Stateful Functional Units
   - Program’s behavior can affect state of the functional units, and other programs can observe the output (which depends on the state)
*** Prediction Units
   - Prediction units can be used to build timing channels, this is different from prediction units being used as part of transient attacks
*** Memory Hierarchy
   - Data caching creates fast and slow execution paths, leading to timing differences depending on whether data is in the cache or not

** Other Timing Attacks
- Not all attacks need a secret dependent branch to cause timing differences
- Some instructions will take different amounts of time to execute based on their operands (e.g. division)
- More timing variation can occur based on where data is located in the memory hierarchy (i.e. registers, cache, ram, disk)

** constant-time software
- Constant time software implementations strive to choose instructions to try to make software run in constant time independent of any secret values

  - "constant time" is not always same time, just that time is independent of secret values

- Instructions with different execution timing are easiest to deal with

- Other sources of timing differences make it more difficult or even *not possible* to make software run in constant time

