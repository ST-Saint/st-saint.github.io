# GhostRider



* Notes

** MTO & ORAM
- Memory-trace obliviousness (MTO): Even an adversary that observes memory, bus traffic, and access times while the program executes can learn nothing about the program's sensitive input and output.

-  One way to achieve MTO is to employ Obilivous RAM (ORAM), allocating all code and data in a single ORAM bank, and to *also disable caches* or *fix the rate* of memory traffic.

*** Naive Implementations
- The simplest way to deploy ORAM is to implement a single, large ORAM bank that contains all the code and data
- 10x - 100x overhead

