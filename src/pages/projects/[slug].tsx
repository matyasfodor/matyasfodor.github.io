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
  const post = getPostBySlug(PROJECTS_FOLDER, params?.slug, [
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
  const slugs = getPostSlugs(PROJECTS_FOLDER);
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
