---
title: "How to debug my parallel code"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  workshop:
    parent: "help"
    identifier: "how-to-debug"
weight: 401
toc: true
---

{{< alert icon="⚠️" >}}
Basically, this works if you're able to open an xterm window (or any other terminal).
{{< /alert >}}

- OpenFOAM comes with a Shell script to debug MPI programs more conveniently with open source tools (GDB/valgrind).
  - Find it with `which mpirunDebug` while your OpenFOAM installation is sourced
  - Use it instead of `mpirun` as in: `mpirunDebug -np 4 solver -parallel`
  - It can open 4 xterm windows, with GDB attached to each of the 4 processes.
  - You can also change the spawned terminal easily by looking for `xterm=`:
    - Default: `xterm="xterm -font fixed -title processor${proc} -geometry 120x15+$xpos+$ypos"`
    - Use kitty instead: `xterm="kitty --title processor${proc} -1 --class=mpirun"`

- Building OpenFOAM in Opt mode and adding `-g -ggdb -O0` to `EXE_INC` in `Make/options` of the libraries/solvers you want
  to debug is the way to go.
  - Building the whole thing in Debug mode is usually memory intensive when you debug your code even on very small cases.
  - Most of the information presented in [the wiki](https://openfoamwiki.net/index.php/HowTo_debugging#Parallel_debuggers)
    about this topic is still valid.

- There are commercial debuggers which support parallel debugging natively (e.g. [TotalView](https://totalview.io/)).

- It's also useful to set the following in your `~/.gdbinit` to set breakpoints right before leaving the client application
  (Mainly to get a stack trace on FATAL ERRORS)
```
# We hope that abort and exit are not inlined
set breakpoint pending on
# set a breakpoint if abort will return a non-zero status
break abort if $rdi != 0
# set a breakpoint if exit will return a non-zero status
break exit if $rdi != 0
```
