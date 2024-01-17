# Memory



* Virtual address & Translation
** Address
- Most modern computers are byte-addressable. Each address identifies a single byte (eight bits) of storage. Data larger than a single byte may be stored in a sequence of consecutive addresses.
** Page
- A process executes in its private virtual address space, composed of pages, each representing a contiguous range of addresses. The typical page size is 4 KiB, although processors also support larger pages, 2 MiB and 1 GiB on the ubiquitous 64-bit x86 (“x64”) processor architecture.
** Page Table
- Translations from virtual pages to physical frames are stored in ~page tables~
** TLB
- Processors cache recently used page table entries in the ~translation look-aside buffer~ (TLB)

* Cache
** cache hierarchy
- Each core typically has two private top-level caches, one each for data and instructions, called level-1 (L1) caches. A typical L1 cache size is 32 KiB with a 4-cycle access time

- Modern x86 processors typically also support core-private, unified L2 caches of intermediate size and latency

- The LLC is shared among all the cores of a multi-core chip and is a unified cache, i.e., it holds both data and instruction
** Cache line
- Caches are organized in *fixed-size* lines, which are the units of allocation and transfer down the cache hierarchy. A typical line size B is 64 bytes.
- The log_2(B) lowest-order *bits* of the address, called the line offset, are used to locate a datum in the cache line.
** Cache Associativity

** Index and Tag
- The L1 is typically indexed by virtual address, while all other caches are indexed by physical address.
