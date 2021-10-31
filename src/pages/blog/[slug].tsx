import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import {
  BLOG_FOLDER,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  Post,
  PROJECTS_FOLDER,
} from "../../lib/api";
import Layout, { LayoutProps } from "../../components/Layout";
import markdownToHtml from "../../lib/markdownToHtml";
import { FC } from "react";

type Params = {
  slug: string;
};

type Props = {
  post?: Post & { content: string };
} & LayoutProps;

const Project: FC<Props> = ({ posts, post, blogPosts }: Props) => {
  if (!post) {
    return <div>Loading..</div>;
  }
  return (
    <Layout posts={posts} blogPosts={blogPosts}>
      <article>
        <Head>
          <title>{post.title}</title>
          {/* <meta property="og:image" content={post.ogImage.url} /> */}
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/xt256.min.css"
          ></link>
        </Head>
      </article>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    return { props: { posts: [], blogPosts: [] } };
  }
  const post = getPostBySlug(BLOG_FOLDER, params?.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    // "ogImage",
    // "coverImage",
  ]) as Post;
  const content = await markdownToHtml(post.content || "");

  return Promise.resolve({
    props: {
      post: {
        ...post,
        content,
      },
      posts: getAllPosts(PROJECTS_FOLDER, ["slug", "title"], false),
      blogPosts: getAllPosts(BLOG_FOLDER, ["slug", "title"], false),
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