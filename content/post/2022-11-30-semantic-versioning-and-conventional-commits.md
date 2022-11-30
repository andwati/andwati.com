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
  - professionalism
  - workflow
tags:
  - git
  - semver
  - conventionalcommits
  - prodessionalism
  - workflow
categories:
  - professionalism
  - workflow
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

* **Major Version (X):**Introduces major changes to the code and breaking changes toward backward compatibility
* **Minor Version (Y):** These code changes don’t introduce breaking changes. This could be adding a new feature that doesn't break changes but are not exactly bug fixes.
* **Patches (Z):** Mainly correspond to bug fixes

### Examples in common packages

#### React(v18.2.0)

![react](/images/uploads/react.png "React versioning")

- **Major -> 18**
- **Minor -> 2**
- **Patch -> 0**

#### Pipx(v1.1.0)

![](/images/uploads/pipx.png)

- **Major -> 1**
- **Minor -> 1**
- **Patch -> 0**