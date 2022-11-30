---
layout: blog
title: Semantic Versioning(SemVer) and Conventional  Commits
draft: true
date: 2022-11-30T11:59:41.808Z
lastmod: 2022-11-30T11:59:41.849Z
keywords:
  - git
  - semver
  - conventionalcommits
tags:
  - git
  - semver
  - conventionalcommits
  - ""
categories: []
comment: true
toc: true
---
A﻿dopting best practices in your git and build workflows.

<!--more-->

# W﻿hat is Semver?

S﻿emantic versioning or just SemVer is a dependency naming guidline that aims to bring some sanity into naming libraries and packages in software development. It is a standard versioning system created by **Tom Preston Werner** (co-founder of Github) that’s used to communicate what changes are in a release.

An efficient and smooth versioning becomes crucial for efficient software delivery expecially for projects that expose a public API. This saves the developers the chaos that is **dependency hell**.Dependency hell is a colloquial term for the frustration of some software users who have installed software packages which have dependencies on specific versions of other software packages.

The dependency issue arises when several packages have dependencies on the same shared packages or libraries, but they depend on different and incompatible versions of the shared packages. If the shared package or library can only be installed in a single version, the user may need to address the problem by obtaining newer or older versions of the dependent packages. This, in turn, may break other dependencies and push the problem to another set of packages.

## Semantic Versioning Specifications

### Summary

Semantic versioning is based on three numbers that indicate the versions of the software and the compatibilities.They are `X.Y.Z` correspondind to `Major.Minor.Patch`
