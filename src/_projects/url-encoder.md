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
---

It is available under [url-encode.io](https://url-encode.io). This project was built in a day or so. The idea is pretty simple and nothing new. There are some similar projects out there already. The concept was to create something secure - because no pasted data is sent to the server, and is built with the simples tools - [Snowpack](https://www.snowpack.dev), TypeScript, and the very best organic, home-grown CSS.

## Why Would I Build This?

You may ask, why would I spend time on building something that already exists. I looked around, and all the top-ranking solution for the "URL encode online" search query was quite badly designed, heavy-weight, and some of them send the content to be encoded/decoded to the server, which is not only unnecessary but raises security concerns as well. What if you are trying to encode some sensitive content? Yes, you probably shouldn't do that online in the first place. But! I clearly remember talking to a senior software engineer working for a quite prestigious software company, when I asked if he isn't concerned about using some online converter tool, he said, he thinks no one could make use of the payload he just pasted and he saves enough time just using an online tool that it offsets the risk. I think there must be other devs who think the same way, so there's a place on the web for a secure URL encoder tool.

## Materials & Methods

The developer experience of Snowpack is simply amazing. What differentiates Snowpack from other build tools is that it won't bundle the source during development. Why is it important? A typical build tool would re-bundle the source on every file save. This can be quite time-consuming as your project grows. It is not only directly impacting the development performance, but these little delays in the workflow are the hotbed of procrastination. Should Webpack be replaced by Snowpackin every project? Probably not. It serves a different purpose. Maintaining Webpack configuration can sometimes feel like a full-time job, but it is a time-proven developer tool. I would suggest using Snowpack whenever Webpack feels like overkill.

I chose Vercel as my hosting solution. It takes 11 seconds (!) to deploy a new version. I'm simply blown away.

## What's next?

My plan is to monetize the website with ads, but I have no false dreams of getting rich with an online URL encoder tool. It's more of an experiment of how to make it from zero to one. If I can cover the cost of the domain, and buy a coffee and croissant, I'm already happy. I'm still struggling to make the site eligible for Google Ads but that's gonna be a new endeavor.
