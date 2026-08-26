import { Feed } from "feed";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getAllContent, getContentSource } from "./content";

const BASE_URL = "https://matyasfodor.com";

export async function getFeeds(): Promise<{
  rss: string;
  atom: string;
  json: string;
}> {
  const blogPosts = await getAllContent("blog", { includeHidden: false });
  const feed = new Feed({
    title: "Matyas Fodor - Yet another JS blog",
    description: "This is my personal feed about my endeavours in the world of web development",
    id: BASE_URL,
    link: BASE_URL,
    language: "en",
    copyright: "All rights reserved 2021, Matyas Fodor",
    updated: blogPosts[0] ? new Date(blogPosts[0].date) : new Date(),
    feedLinks: {
      json: `${BASE_URL}/blog/feed.json`,
      atom: `${BASE_URL}/blog/atom.xml`,
    },
    author: {
      name: "Matyas Fodor",
      link: "https://twitter.com/MTY_FDR",
    },
  });

  for (const post of blogPosts) {
    const source = await getContentSource("blog", post.slug);
    if (!source) continue;

    const content = String(
      await remark().use(remarkHtml, { sanitize: false }).process(source),
    );
    const url = `${BASE_URL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content,
      author: [{ name: post.author.name }],
      date: new Date(post.date),
    });
  }

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}
