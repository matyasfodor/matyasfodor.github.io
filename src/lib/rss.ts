import fs from "fs";
import { Feed } from "feed";
import { evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime';
import {renderToString} from 'react-dom/server';

import { BLOG_FOLDER, getAllPosts, Post } from "../lib/api";

const BASE_URL = "https://matyasfodor.com";

export const getRss = async (
  blogPosts: Post[]
): Promise<{
  rss: string;
  atom: string;
  json: string;
}> => {
  const feed = new Feed({
    title: "Matyas Fodor - Yet another JS blog",
    description:
      "This is my personal feed about my endeavours in the word of web development",
    id: BASE_URL,
    link: BASE_URL,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: "http://example.com/image.png",
    // favicon: "http://example.com/favicon.ico",
    copyright: "All rights reserved 2021, Matyas Fodor",
    updated: new Date(2013, 6, 14), // optional, default = today
    // generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: `${BASE_URL}/json`,
      atom: `${BASE_URL}/atom`,
    },
    author: {
      name: "Matyas Fodor",
      // email: "johndoe@example.com",
      link: "@MTY_FDR",
    },
  });

  for (let post of blogPosts) {
    // @ts-ignore
    const { default: mdxSource } = evaluateSync(post.content, {
      ...runtime,
      remarkPlugins: [],
      rehypePlugins: [],
      development: false
    });

    const content = renderToString(mdxSource({}));

    const url = `${BASE_URL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content,
      author: [
        {
          name: "Matyas Fodor",
          link: "@MTY_FDR",
        },
      ],
      date: new Date(post.date),
      // image: post.image,
    });
  }

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
};

export const generateRss = async () => {
  const { rss, atom, json } = await getRss(
    getAllPosts({
      folder: BLOG_FOLDER,
      fields: ["title", "date", "slug", "author", "content"],
      includeHidden: false,
    })
  );

  if (!fs.existsSync("public/blog")) {
    fs.mkdirSync("public/blog");
  }
  fs.writeFileSync("public/blog/rss.xml", rss);
  fs.writeFileSync("public/blog/atom.xml", atom);
  fs.writeFileSync("public/blog/feed.json", json);
};
