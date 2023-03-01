---
title: "OpenFOAM environment 101"
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
    identifier: "openfoam-env-101"
weight: 201
toc: true
---

You need to be on a Linux machine somehow.

Common options if you're running on a Linux OS (or macOS, choose what suits you):

- [OpenFOAM in a Docker container](/workshop/hands-on/openfoam-in-containers/) (Preferred method).
- A local installation of OpenFOAM.
- [Github's Codespace]() for a fully remote experience (which uses the same Docker image and the unit testing framework).

If your main OS is Windows, you have a couple of options (Again, choose whatever you're comfortable with):

- [OpenFOAM in a Docker container]() (Preferred method).
- Install a Linux virtual machine.
- [Github's Codespace]() for a fully remote experience (which uses the same Docker image and the unit testing framework).
- Use [BlueCFD](http://bluecfd.github.io/Core/) type of deal, although then I wouldn't be able to help much if you run into MPI problems.

In order to optimize your experience during the hands-on sessions, I ask you to go through a quick pre-flight checklist:

0. [x] Register to the [Workshop's event]() and [login](/login) here with your Github account.
1. [x] Set up a Text Editor or an IDE for OpenFOAM development.
2. [ ] Have a working OpenFOAM installation.
2. [ ] Clone our unit-testing framework and make sure it works for you.
3. [ ] Solve a demo exercise so you get familiarized with the typical workflow during the hands-on sessions (You'll need no knowledge from the workshop for this).
