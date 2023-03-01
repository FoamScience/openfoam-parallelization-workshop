---
title: "OpenFOAM in containers"
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
    identifier: "openfoam-in-containers"
weight: 202
toc: true
---

There are many OpenFOAM images for all sorts of containerization systems out there. However, my images,
which are hosted at [ghcr.io](https://ghcr.io), are specifically built to participate in MPI communications:

- [ghcr.io/foamscience/jammy-openfoam:v2206](https://github.com/users/FoamScience/packages/container/jammy-openfoam/44898482?tag=v2206)
- [ghcr.io/foamscience/jammy-openfoam:fe5](https://github.com/users/FoamScience/packages/container/jammy-openfoam/44946661?tag=fe5)
- [ghcr.io/foamscience/jammy-openfoam:9](https://github.com/users/FoamScience/packages/container/jammy-openfoam/44886760?tag=9)

You can fire up a quick local container with the following Shell command (Assuming Docker is installed - see [get.docker.com](https://get.docker.com/)):
```bash
docker run  \
    --rm `# Disposable container, destroyed as soon as you leave it.` \
    -it `# Interactive with a tty so you can run a shell` \
    --name openfoam `# Container name` \
    ghcr.io/foamscience/jammy-openfoam:v2206 `# Docker image` \
    bash `# Command to run in the container, default: SSH server`
```

This command will throw you into a container which has OpenFOAM v2206 installed,
acting as the `openfoam` user which is all set to run OpenFOAM simulations. The default working directory you
start with is `~/data`.

Refer to [Docker CLI cheatsheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf) if it's your first time
interacting with Docker.


At this point; I assume you have easy access to an OpenFOAM installation.

0. [x] Register to the [Workshop's event]() and [login](/login) here with your Github account.
1. [x] Set up a Text Editor or an IDE for OpenFOAM development.
2. [x] Have a working OpenFOAM installation.
2. [ ] Clone our unit-testing framework and make sure it works for you.
3. [ ] Solve a demo exercise so you get familiarized with the typical workflow during the hands-on sessions (You'll need no knowledge from the workshop for this).
