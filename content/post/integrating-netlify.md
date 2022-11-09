---
title: "Integrating Netlify"
date: 2022-11-09T15:17:00+03:00
lastmod: 2022-11-09T15:17:00+03:00
draft: true
keywords: []
description: "Migrating the content management to netlify"
tags: ["blog", "hugo", "netlify", "netlify-cms", "github"]
categories: []
author: "Ian Andwati"

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

This process has helped me a lot to master markdown syntax and some practice on my git skills. It’s fun to update the website content following these steps but sometimes it can be frustrating. At those times, I really miss the user interface of content management systems. After careful consideration I moved on with Netlify CMS.At its core, Netlify CMS is an open-source React app that acts as a wrapper for the Git workflow, using the GitHub, GitLab, or Bitbucket API. This provides many advantages, including:

- **Fast, web-based UI:** With rich-text editing, real-time preview, and drag-and-drop media uploads.
- **Platform agnostic:** Works with most static site generators.
- **Easy installation:** Add two files to your site and hook up the backend by including those files in your build process or linking to our Content Delivery Network (CDN).
- **Modern authentication:** Using GitHub, GitLab, or Bitbucket and JSON web tokens.
- **Flexible content types:** Specify an unlimited number of content types with custom fields.
- **Fully extensible:** Create custom-styled previews, UI widgets, and editor plugins.

# Redeploying to Netlify

I decided to move the site from github pages to Netlify hosting to take full control of the platform.Hugo sites on Netlify can benefit from automatic framework detection and control over Hugo version selection.When you link a repository for a project, Netlify tries to detect the framework your site is using. If your site is built with Hugo, Netlify provides a suggested build command and publish directory: hugo and public. The build process is straight forward but you can add custom options to your `netlify.toml` file, here are my options:

```toml
[build]
command = "hugo"
publish = "public"

[build.environment]
HUGO_VERSION = "0.105.0"
```

# Setting up Netlify CMS

You can adapt Netlify CMS to a wide variety of projects. It works with any content written in markdown, JSON, YAML, or TOML files, stored in a repo on GitHub, GitLab, or Bitbucket.You can Netlify CMS to a site that's built with a common static site generator, like Jekyll, Hugo, Hexo, or Gatsby.The official documentation for installing on your website can be found at the [official site](https://www.netlifycms.org/docs/intro/)

## Steps

**Step 1**

Create a static admin folder contains all Netlify CMS files, stored at the root of your published site. Where you store this folder in the source files depends on your static site generator.For Hugo it is the `static` folder.

`/static/admin`

**Step 2**

Inside the admin folder, create two files: `index.html` and `config.yml` . The first file `admin/index.html` is an entry point to Netlify CMS. You will access the CMS interface from `yourwebsite.com/admin` when everything is ready.

**Step 3**

The first file, `admin/index.html` , is the entry point for the Netlify CMS admin interface.Paste this code in index.html and save. This HTML starter page will load the Netlify CMS Javascript file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

**Step 4**

Now let’s move to the configuration section.These are the configurations that go into `config.yml` file.This process is different for every site. I followed the guidelines on the web site and made minor adjustments. It worked on my web site.The configuration options are available at the [docs](<https://www.netlifycms.org/docs/add-to-your-site/#:~:text=%2C%20MyTemplate)-,Configuration,-Configuration%20is%20different>).This is how I configured my config.yml file:

```yaml
backend:
  name: git-gateway
  branch: netlify-cms # Branch to update (optional; defaults to master)

# This line should *not* be indented
publish_mode: editorial_workflow

media_folder: "static/images/uploads" # Media files will be stored in the repo under static/images/uploads
public_folder: "/images/uploads" # The src attribute for uploaded media will begin with /images/uploads

collections:
  - name: "post" # Used in routes, e.g., /admin/collections/blog
    label: "posts" # Used in the UI
    folder: "content/post" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Draft", name: "draft", widget: "boolean", default: true }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Last Modified", name: "lastmod", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Keywords", name: "keywords", widget: "list" }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Categories", name: "categories", widget: "list" }
      - { label: "Comments", name: "comment", widget: "boolean", default: true }
      - {
          label: "Table of Contents",
          name: "toc",
          widget: "boolean",
          default: true,
        }
```
