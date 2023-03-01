---
title: "Prerequisites for optimal experience"
description: "Prerequisites for optimal experience during the learning process offered by the OpenFOAM parallelization workshop."
lead: "Before we start this short OpenFOAM course, let me outline the most important prerequisites for optimal experience during the learning process offered by the OpenFOAM parallelization workshop."
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  workshop:
    parent: "prologue"
    identifier: "prereqs"
weight: 1
toc: true
lecture: true
mermaid: true
url: "/workshop/prologue/prereqs"
---

Please make sure you are familiar with the following concepts before you start (it's not a lot if I can fit it in a single diagram) so you
don't feel overwhelmed during the hands-on sessions. Watching someone else coding in a live session with their own environment and
workflow can be confusing.

{{< mermaid class="bg-light text-center" >}}
%%{init: {'theme':'dark'}}%%
flowchart LR
    A(("&nbsp; &nbsp; &nbsp; "))
    B("OpenFOAM build system")
    C("C++")
    D("MPI")
    E("CMD")
    F("Bash")
    G("Git")
    H("HPC Environment")
    I("Make/files")
    J("Make/options")
    K("wmake")
    L("Github account")
    M("IDE")
    N("VSCode")
    O("Vim...")

    A --- C & B & E
    E --- F & G & H
    B -.- I & J & K
    D & L & M --- A
    O & N -.- M

    classDef graphDate fill-opacity:0.15,color:#E1B028
    classDef date fill-opacity:0.85,color:#FFFFFF,fill:#1d0e4e
    class A,B,C,E,F,G,L date
{{< /mermaid >}}

## Required skills and knowledge

- Basic C++ programming knowledge (This is a **must**, at least you've worked with templates before).
- Being familiar with OpenFOAM environment and build system (At least, you've compiled a solver or a library before).
- MPI knowledge is optional.

## Required tools

- An OpenFOAM installation on a recent Linux distribution (refer to [OpenFOAM Environment 101](/workshop/hands-on/openfoam-env-101/)
  for recommended setup).
- Knowledge of the common command line interface (Bash, Git) is recommended.
- A Github Account (needed to view video content on this website).
- An IDE (configured for C++ development) is optional but recommended (or use Github CodeSpaces).
