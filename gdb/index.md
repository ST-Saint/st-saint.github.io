# GDB Cheat Sheet


* Configuration
- Save history
#+begin_src conf
set history save on
#+end_src

* Layout

* Print

** address
#+begin_src gdb
x/nfu addr
#+end_src


* Kernel Debugging
#+begin_src
(gdb) apropos lx
function lx_current -- Return current task
function lx_module -- Find module by name and return the module variable
function lx_per_cpu -- Return per-cpu variable
function lx_task_by_pid -- Find Linux task by PID and return the task_struct variable
function lx_thread_info -- Calculate Linux thread_info from task variable
lx-dmesg -- Print Linux kernel log buffer
lx-lsmod -- List currently loaded modules
lx-symbols -- (Re-)load symbols of Linux kernel and currently loaded modules
#+end_src

* V8

** compile
*** args
#+begin_src conf
# Build arguments go here.
# See "gn args <out_dir> --list" for available build arguments.
is_component_build = true
is_debug = true
symbol_level = 2
target_cpu = "x64"
use_goma = false
v8_enable_backtrace = true
v8_enable_fast_mksnapshot = true
v8_enable_slow_dchecks = true
v8_optimized_debug = false
v8_expose_symbols = true
v8_symbol_level = 2
cppgc_enable_object_names = true
v8_enable_disassembler = true
v8_enable_gdbjit = true
#+end_src

*** command
#+begin_src shell
gn args out/Debug
#----- add args -----#
gn gen out/Debug
#+end_src

** debug

*** gdbinit
=v8/tools/gdbinit=

**** functions

***** job
#+begin_src gdb
Print a v8 JavaScript object
Usage: job tagged_ptr
#+end_src

***** jh
#+begin_src gdb
Print content of a v8::internal::Handle
Usage: jh internal_handle
#+end_src

***** jlh
#+begin_src gdb
print-v8-local, jl, jlh
Print content of v8::Local handle.
#+end_src

***** jco
#+begin_src gdb
Print a v8 Code object from an internal code address
Usage: jco pc
#+end_src

***** jtt
#+begin_src gdb
Print the complete transition tree of the given v8 Map.
Usage: jtt tagged_ptr
#+end_src

***** jst
#+begin_src gdb
Print the current JavaScript stack trace
Usage: jst
#+end_src

***** jss
#+begin_src gdb
Skip the jitted stack on x64 to where we entered JS last.
Usage: jss
#+end_src

***** bta
#+begin_src gdb
Print stack trace with assertion scopes
Usage: bta
#+end_src

***** heap_find
#+begin_src gdb
Find the location of a given address in V8 pages.
Usage: heap_find address
#+end_src

***** cpcp
#+begin_src gdb
Prints compressed pointer (raw value) after decompression.
Usage: cpcp compressed_pointer
#+end_src

***** cpm
#+begin_src gdb
Prints member, compressed or not.
Usage: cpm member
#+end_src


*** js debug commands
- ~DebugPrint~
- ~DebugTrace~
- ~SystemBreak~
- [[https://source.chromium.org/chromium/v8/v8.git/+/05720af2b09a18be5c41bbf224a58f3f0618f6be:src/runtime/runtime.h;l=574][full commands]]

