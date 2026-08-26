import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getContentSlugs } from "../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContentSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContent("blog", slug);
  if (!entry) return {};

  return {
    title: entry.metadata.title,
    description: entry.metadata.excerpt,
    openGraph: entry.metadata.ogImage
      ? { images: [entry.metadata.ogImage.url] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getContent("blog", slug);
  if (!entry) notFound();

  return (
    <article>
      <entry.Content />
    </article>
  );
}
