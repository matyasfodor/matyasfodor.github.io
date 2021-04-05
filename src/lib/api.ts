import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  content: string;

  // metadata
  excerpt: string;
  date: string;
  author: {
    name: string;
  };
};

const postsDirectory = join(process.cwd(), "src", "_projects");

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getPostBySlug(
  slug: string,
  fields: (keyof Post)[] = []
): Partial<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Partial<Post> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: (keyof Post)[] = []): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields) as Post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
