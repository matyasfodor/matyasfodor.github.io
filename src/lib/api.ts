import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export const BLOG_FOLDER = "_blog";
export const PROJECTS_FOLDER = "_projects";

export type Post = {
  slug: string;
  title: string;
  content: string;
  hidden: boolean;

  // metadata
  excerpt: string;
  date: string;
  author: {
    name: string;
  };
};

const postsDirectory = join(process.cwd(), "src");

export function getPostSlugs(folder: string) {
  return fs
    .readdirSync(join(postsDirectory, folder))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getPostBySlug(
  folder: string,
  slug: string,
  fields: (keyof Post)[] = []
): Partial<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, folder, `${realSlug}.md`);
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

export function getAllPosts(
  folder: string,
  fields: (keyof Post)[] = [],
  includeHidden = true
): Post[] {
  const slugs = getPostSlugs(folder);
  const posts = slugs
    .map((slug) => getPostBySlug(folder, slug, [...fields, "hidden"]) as Post)
    .filter(({ hidden }) => {
      console.log("!includeHidden || !hidden", !includeHidden, !hidden);
      return includeHidden || !hidden;
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
