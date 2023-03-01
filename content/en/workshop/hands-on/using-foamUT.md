---
title: "A unit-testing framework to do the exercises"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  workshop:
    parent: "hands-on"
    identifier: "using-foamUT"
weight: 203
toc: true
mermaid: true
---

<div class="text-center">
<a href="https://github.com/FoamScience/foamUT"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/FoamScience/foamUT.png" width="560px"></a>
<div class="text-center" style="padding-left=-10px;">
<img src="https://github.com/FoamScience/foamUT/blob/master/demo.gif?raw=true"/>
</div>
</div>

<br>

- We'll be using the unit-testing framework as a black-box to verify the correctness of your code in hands-on sessions.
  - You only need to change one file per activity; Mostly
- Exercises are provided as test units for convenient interaction with the code (compile-run-debug cycles).
- Clone [this repo](https://github.com/FoamScience/foamUT) and run [`Alltest`](https://github.com/FoamScience/foamUT/blob/master/Alltest) using your local OpenFOAM installation to make sure everything works as expected.

The following diagram depicts the general workflow of solving the exercises proposed during the hands-on sessions:

{{< mermaid class="bg-light text-center" >}}
%%{init: {'theme':'dark'}}%%
flowchart TD
    subgraph one[<b>foamUT repo</b>]
    subgraph dum1[ ]
    A("Alltest")
    G("Catch2")
    F[Compile and test<br>everything in tests<br>on cases]
    H("tests")
    I("cases")
    E[Unit-tests backend]
    end
    end
    subgraph two[<b>Exercises repo</b>]
    subgraph dum2[ ]
    B("exercises/exTest.C")
    J("Make")
    C[This is the file you modify]
    D[Make dir. for your<br> OpenFOAM fork]
    end
    end

    B ==> |Symlink/Copy into tests| H
    C -.- B 
    D -.- J

    G -.- E
    A -.- F
    A --> G
    F -.-> H
    F -.-> I

    classDef Title fill:none,stroke:none;
    class dum1,dum2 Title

    classDef graphDate fill-opacity:0.15,color:#E1B028
    classDef date fill-opacity:0.85,color:#FFFFFF,fill:#1d0e4e
    class one,two graphDate
    class A,B,G,H,I,J date
{{< /mermaid >}}


In short, the `Alltest` script runs all unit tests found in [`tests`](https://github.com/FoamScience/foamUT/tree/master/tests) directory on all OpenFOAM cases found in [`cases`](https://github.com/FoamScience/foamUT/tree/master/cases) directory. So, to run your own tests:

```bash
# Clone the repos
cd /tmp
git clone https://github.com/FoamScience/foamUT foamUT
git clone <Exercise-repo-URL> Ex01
# Replace sample tests with the exercise code
cd foamUT
rm -rf tests/exampleTests
ln -s $PWD/../Ex01/exercises tests/ex01
# Compile and run tests
./Alltest
```

{{< details  "Important notes about using foamUT" >}}
- If you want to see FATAL ERRORS (As if running a regular solver), put `Foam::FatalError.dontThrowExceptions();` at the start of the test case.
- Your code is supposed to work (all tests pass) both in serial and in parallel.
- The unit tests are timed-out in `Alltest` (change [`timeOut`](https://github.com/FoamScience/foamUT/blob/4b9da1eba5713c7e74e5b553a79614ed7e1c7d91/Alltest#L30) if it's too quick for you).
- The unit tests run in `/dev/shm` by default; you can change this in [`Alltest`](https://github.com/FoamScience/foamUT/blob/4b9da1eba5713c7e74e5b553a79614ed7e1c7d91/Alltest#L28)
- All cases run on 4 processors but tests may run on specific processors only.
{{< /details >}}

If your machine has less than 4 CPUs, you need to enable MPI oversubscribing; otherwise your parallel tests will fail
(This is useful for example if you're using Github codespaces or running CI jobs on Github machines which only have 2 CPUs):
```bash
sed -i 's/mpirun/mpirun --oversubscribe/g' Alltest
```

{{< alert icon="👉" >}}
Head out to [the wiki page](https://github.com/FoamScience/foamUT/wiki) if you're interested in the Unit-testing framework.
{{< /alert >}}

At this point, only one task remains:

0. [x] Register to the [Workshop's event]() and [login](/login) here with your Github account.
1. [x] Set up a Text Editor or an IDE for OpenFOAM development.
2. [x] Have a working OpenFOAM installation.
2. [x] Clone our unit-testing framework and make sure it works for you.
3. [ ] Solve a demo exercise so you get familiarized with the typical workflow during the hands-on sessions (You'll need no knowledge from the workshop for this).
