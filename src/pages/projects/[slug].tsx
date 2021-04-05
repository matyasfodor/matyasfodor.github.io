import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { getAllPosts, getPostBySlug, getPostSlugs, Post } from "../../lib/api";
import Layout from "../../components/Layout";
import markdownToHtml from "../../lib/markdownToHtml";
import { FC } from "react";
import { PostProps } from "../../commonTypes";

type Params = {
  slug: string;
};

type Props = {
  post?: Post & { content: string };
} & PostProps;

const Project: FC<Props> = ({ posts, post }) => {
  if (!post) {
    return <div>Loading..</div>;
  }
  return (
    <Layout posts={posts}>
      <article>
        <Head>
          <title>{post.title}</title>
          {/* <meta property="og:image" content={post.ogImage.url} /> */}
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
    return { props: { posts: [] } };
  }
  const post = getPostBySlug(params?.slug, [
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
      posts: getAllPosts(["slug", "title"]),
    },
  });
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPostSlugs();
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
