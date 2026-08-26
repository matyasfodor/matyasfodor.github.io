import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentType } from "react";

export type ContentKind = "blog" | "projects";

export type ContentMetadata = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: { name: string };
  hidden: boolean;
  ogImage?: { url: string };
};

type ContentEntry = {
  metadata: ContentMetadata;
  sourcePath: string;
  load: () => Promise<{ default: ComponentType }>;
};

const contentEntries = {
  blog: {
    "efficient-zip": {
      metadata: {
        slug: "efficient-zip",
        title: "Efficient zip function in JavaScript",
        excerpt: "A case study of porting a standard Python utility to JavaScript",
        date: "2021-11-14T00:46:07.322Z",
        author: { name: "Matyas Fodor" },
        hidden: false,
      },
      sourcePath: "src/_blog/efficient-zip.mdx",
      load: () => import("../_blog/efficient-zip.mdx"),
    },
  },
  projects: {
    "url-encoder": {
      metadata: {
        slug: "url-encoder",
        title: "URL Encoder",
        excerpt: "This is a test project to see what does it take to build a simple developer utility",
        date: "2020-03-16T05:35:07.322Z",
        author: { name: "Matyas Fodor" },
        hidden: true,
      },
      sourcePath: "src/_projects/url-encoder.mdx",
      load: () => import("../_projects/url-encoder.mdx"),
    },
  },
} satisfies Record<ContentKind, Record<string, ContentEntry>>;

function findEntry(kind: ContentKind, slug: string): ContentEntry | null {
  const entries: Record<string, ContentEntry> = contentEntries[kind];
  return entries[slug] ?? null;
}

export function getContentSlugs(kind: ContentKind): string[] {
  return Object.keys(contentEntries[kind]);
}

export async function getContent(
  kind: ContentKind,
  slug: string,
): Promise<{ Content: ComponentType; metadata: ContentMetadata } | null> {
  const entry = findEntry(kind, slug);
  if (!entry) return null;

  const { default: Content } = await entry.load();
  return { Content, metadata: entry.metadata };
}

export async function getContentSource(
  kind: ContentKind,
  slug: string,
): Promise<string | null> {
  const entry = findEntry(kind, slug);
  if (!entry) return null;
  return readFile(join(process.cwd(), entry.sourcePath), "utf8");
}

export async function getAllContent(
  kind: ContentKind,
  { includeHidden = true }: { includeHidden?: boolean } = {},
): Promise<ContentMetadata[]> {
  return Object.values(contentEntries[kind])
    .map(({ metadata }) => metadata)
    .filter(({ hidden }) => includeHidden || !hidden)
    .sort((a, b) => b.date.localeCompare(a.date));
}
