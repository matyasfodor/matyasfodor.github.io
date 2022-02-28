---
title: "URL Encoder"
excerpt: "This is a test project to see what does it take to build a simple developer utility"
# coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Matyas Fodor
  # picture: "/assets/blog/authors/jj.jpeg"
# ogImage:
# url: "/assets/blog/dynamic-routing/cover.jpg"
hidden: false
---

# URL encoder/decoder

A few weeks ago I was in the need of an URL encoder, and I wasn't quite satisfied with the available online tools, so I decided to build one on my own. The difference between the prior art and my project, [http://urlencode.matyasfodor.com/](https://http://urlencode.matyasfodor.com/) is that there's no pasted data sent to the server. Plus it is hopefully more visually pleasing. It is built with [Snowpack](https://www.snowpack.dev), TypeScript, and the very best organic, home-grown CSS, supporting dark mode.

## Materials & Methods

The developer experience of Snowpack is simply amazing. What differentiates Snowpack from other build tools is that it won't bundle the source during development. Why is it important? A typical build tool would re-bundle the source on every file save. This can be quite time-consuming as your project grows. It is not only directly impacting the development performance, but these little delays in the workflow are the hotbed of procrastination. Should Webpack be replaced by Snowpackin every project? Probably not. It serves a different purpose. Maintaining Webpack configuration can sometimes feel like a full-time job, but it is a time-proven developer tool. I would suggest using Snowpack whenever Webpack feels like overkill.

I chose Vercel as my hosting solution. It takes 11 seconds (!) to deploy a new version. I'm simply blown away.

## What's next?

My plan is to monetize the website with ads, but I have no false dreams of getting rich with an online URL encoder tool. It's more of an experiment of how to make it from zero to one. If I can cover the cost of the domain, I'm already happy. I'm still struggling to make the site eligible for Google Ads but that is a problem of tomorrow.
