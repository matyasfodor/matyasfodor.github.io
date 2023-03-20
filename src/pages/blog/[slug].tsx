import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { MDXRemote } from 'next-mdx-remote'

import { serialize } from 'next-mdx-remote/serialize'
import { FC } from "react";
import rehypeHighlight from "rehype-highlight";

import {
  BLOG_FOLDER,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  Post,
  PROJECTS_FOLDER,
} from "../../lib/api";
import Layout, { LayoutProps } from "../../components/Layout";
type Params = {
  slug: string;
};

const components = {
  TestComponent: () => <p>Hello from TestComponent</p>
}

type Props = {
  source: {
    scope: unknown,
    compiledSource: string,
  } | null,
  frontMatter: {
    title: string
    ogImage?: {
      url: string
    }
  } | null,
} & LayoutProps;

const Project: FC<Props> = ({ 
  posts, blogPosts, 
  source, frontMatter }: Props) => {
  if (source === null || frontMatter === null || !source.compiledSource) {
    return <div>Loading..</div>;
  }
  return (
    <Layout posts={posts} blogPosts={blogPosts}>
      <article>
        <Head>
          <title>{frontMatter.title}</title>
          <meta property="og:image" content={frontMatter?.ogImage?.url} />
        </Head>
      </article>

      <MDXRemote {...source} frontmatter={frontMatter} components={components} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    return { props: { posts: [], blogPosts: [], source: null, frontMatter: null } };
  }
  const post = getPostBySlug(BLOG_FOLDER, params?.slug ?? '', [
    "title",
    "date",
    "slug",
    "author",
    "content",
    // "ogImage",
    // "coverImage",
  ]) as Post;

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
    },
    scope: post,
  })

  return Promise.resolve({
    props: {
      source: mdxSource,
      frontMatter: post,
      posts: getAllPosts({
        folder: PROJECTS_FOLDER,
        fields: ["slug", "title"],
        includeHidden: false,
      }),
      blogPosts: getAllPosts({
        folder: BLOG_FOLDER,
        fields: ["slug", "title"],
        includeHidden: false,
      }),
    },
  });
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPostSlugs(BLOG_FOLDER);
  return Promise.resolve({
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  });
};

export default Project;
