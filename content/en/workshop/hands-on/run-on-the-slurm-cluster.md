---
title: "Run tests on a SLURM cluster"
description: ""
lead: "Practice running parallel test jobs on a makeshift SLURM cluster which has OpenFOAM installed using Docker containers."
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  workshop:
    parent: "hands-on"
    identifier: "run-slurm-cluster"
weight: 205
mermaid: true
toc: true
---

{{< alert icon="👉" >}}
Please attempt to do this only after you feel comfortable enough with running the unit tests using `Alltest` script.
{{< /alert >}}

Now that you're feeling more confident about reading/writing MPI-ready code in OpenFOAM; it's time
we put what you learned so far to work. In this activity, you'll try to run your unit-tests from
previous exercises in a SLURM cluster (which emulated real-world clusters, but is made up from
Docker containers instead of physical machines for convenience).

<div class="card-bar"></div><br>

## Get a makeshift cluster running

First let's start with the requirements (Avoid distribution repositories for these):

1. Docker must be installed. [Check get.docker.com script](https://get.docker.com)
2. You also need a recent version of [docker-compose](https://docs.docker.com/compose/install/other/) 

To make a decent test SLURM cluster, you need a machine with at least 4 CPUs.
From there, it's a matter of cloning my already configured repository and installing required software:

{{< alert icon="👉" >}}
All directories are relative to this `docker-openfoam-slurm-cluster` directory we're creating.
You can create it wherever you want.
{{< /alert >}}

```bash
git clone https://github.com/FoamScience/docker-openfoam-slurm-cluster
cd docker-openfoam-slurm-cluster
# Build containers for different cluster nodes - See the diagram bellow
# All nodes are based off centOS 7 with OpenFOAM v2206 installed
# This takes around 4GB of disk space and some time to complete
docker-compose build
# Fire up the cluster
docker-compose up -d
```

The previous commands will result in the creation of a SLURM cluster with the following architecture
(We're ignoring a container dedicated to host databases as it's not as important for our purposes):

{{< mermaid class="bg-light text-center" >}}
%%{init: {'theme':'dark'}}%%
flowchart TD
    subgraph one[<b>SLURM Cluster</b>]
    A1("axc-compute-01")
    A2("axc-compute-02")
    A3("axc-compute-03")
    A4("axc-compute-04")
    H0[<b>headnode</b>]
    B0[["slurmctld"]]
    C0[["slurmd"]]
    subgraph dum1[ ]
    end
    end
    subgraph two[<b>Local machine / Host</b>]
    F(["dir: var/axc"])
    subgraph dum2[ ]
    end
    end

    H0 === A1 & A2 & A3 & A4
    B0 -.- H0
    A1 & A2 & A3 & A4 -.- C0
    F ==> |Maps to /axc on all machines| H0

    classDef Title fill:none,stroke:none;
    class dum1,dum2 Title

    classDef graphDate fill-opacity:0.15,color:#E1B028
    classDef date fill-opacity:0.85,color:#FFFFFF,fill:#1d0e4e
    class one,two graphDate
    class H0,A1,A2,A3,A4 date
{{< /mermaid >}}

- You submit jobs on the head-node
- The head-node controls job execution on the 4 compute notes
- To avoid excessive file copying, `var/axc` (inside the `docker-openfoam-slurm-cluster` directory)
  on your local machine is mounted to `/axc` on all cluster nodes. All nodes get access to anything you put in there.
- `root` is the default user for all operations inside the cluster.

It's also good to do a pre-flight check to see if everything is working as expected
(What's important is being able to perform `mpirun` calls):

```bash
# Gain a root shell at the head-node
docker exec -it axc-headnode bash
# Source the OpenFOAM env. on the container
(axc-headnode) source /usr/lib/openfoam/openfoam2206/etc/bashrc
# Try an MPI job on all 4 compute nodes.
# This should report 4 different IP addresses
# Note the --allow-run-as-root
# And note that mpirun does not need -np because it's built with SLURM support
(axc-headnode) salloc -N 4 mpirun --allow-run-as-root hostname -I
```

## Compile your test driver and prepare your case

Now that we have verified that we can submit `mpirun` jobs to SLURM, we can attempt to compile the test driver
(`foamUT` dependencies are already compiled and put at the right places in the nodes):

```bash
# On your host machine, clone foamUT to the shared directory:
git clone https://github.com/FoamScience/foamUT var/axc/foamUT
# Access a shell at the head node:
docker exec -it axc-headnode bash
# On the head node:
(axc-headnode) source /usr/lib/openfoam/openfoam2206/etc/bashrc
(axc-headnode) cd /axc/foamUT/tests/exampleTests
(axc-headnode) wmake
```

The resulting binary (`/axc/foamUT/tests/exampleTests/testDriver`) also stays inside this shared directory,
so compiling on one of the CentOS containers is enough (since they are identical).

We'll also be using the cavity case provided with `foamUT` (you can do this on the head node):
```bash
# Copy the case
(axc-headnode) cp -r /axc/foamUT/cases/cavity /axc/testCase
(axc-headnode) cd /axc/testCase
# Create the mesh and decompose it
(axc-headnode) blockMesh
(axc-headnode) decomposePar
```

## Submit a SLURM job to run example tests on the prepared case

To submit a simulation job, we first need to understand how the test driver works:
```bash
testDriver [catch_options] --- [openfoam_options]
```

So, to perform a job on the `testCase` case which executes the parallel tests in parallel
(This is handled normally by the `Alltest` script):

```bash
# --allow-run-as-root needed because mpirun will run as root
# and don't forget the -parallel flag
(axc-headnode) salloc -N 4 mpirun --allow-run-as-root \
    /axc/foamUT/tests/exampleTests/testDriver '[parallel]' \
    --- \
    -case /axc/testCase -parallel
```

{{< details  "Can we run Alltest on the SLURM cluster?" >}}
Sure we can, all we have to do is to replace `mpirun -np "$nProcs"` with `salloc -N "$nProcs" mpirun`:

```bash
# This compiles only on head node, but runs tests on nProcs compute nodes
sed -Ei 's/mpirun (.*) -np "\$nProcs"/salloc -N "\$nProcs" mpirun \1/g' Alltest
```
{{< /details >}}

Whether the tests pass for us or not is not important as paying attention to the output:
```
Case   : /axc/testCase
nProcs : 4
Hosts  :
(
    (axc-compute-01 1)
    (axc-compute-02 1)
    (axc-compute-03 1)
    (axc-compute-04 1)
)
```
and making sure every compute node is participating with 1 CPU, which proves that our training cluster is working as expected.

```bash
# On your host machine
# Make the cluster go offline without removing containers
docker-compose stop
# Bring down the cluster (stop and remove containers)
docker-compose down
```

If you need it, here is a [short cheatsheet for SLURM](https://slurm.schedmd.com/pdfs/summary.pdf)
