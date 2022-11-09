---
title: "Integrating Netlify"
date: 2022-11-09T15:17:00+03:00
lastmod: 2022-11-09T15:17:00+03:00
draft: true
keywords: []
description: "Migrating the content management to netlify"
tags: ["blog", "hugo", "netlify"]
categories: []
author: ""

# You can also close(false) or open(true) something for this content.
# P.S. comment can only be closed
comment: true
toc: true
autoCollapseToc: false
postMetaInFooter: true
hiddenFromHomePage: false
# You can also define another contentCopyright. e.g. contentCopyright: "This is another copyright."
contentCopyright: false
reward: false
mathjax: false
mathjaxEnableSingleDollar: false
mathjaxEnableAutoNumber: false

# You unlisted posts you might want not want the header or footer to show
hideHeaderAndFooter: false

# You can enable or disable out-of-date content warning for individual post.
# Comment this out to use the global config.
#enableOutdatedInfoWarning: false

flowchartDiagrams:
  enable: false
  options: ""

sequenceDiagrams:
  enable: false
  options: ""
---

Migrating to a better content management system through Netlify CMS

<!--more-->

# Heavy Lifting

I use [Visual Studio Code](https://code.visualstudio.com/) to manually edit the blog post content in this website. This is quite a hassle because I have to deal with
markdown files. There are many problems to this approach and several gotchas. I have to work on a local site repository to be able to edit the content. My github credentials are also required to push my local changes to my remote repository on github so that it can trigger the build process and publish the site.

This process has helped me alot to master markdown sysntax and some practice on my git skills. It’s fun to update the website content following these steps but sometimes it can be frustrating. At those times, I really miss the user interface of content management systems.
