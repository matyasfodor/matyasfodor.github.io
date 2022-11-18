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
import { FC, useEffect, useState } from "react";

type Props = {
  post?: Post & { content: string };
} & LayoutProps;

const PaceCalculator = ({ posts, blogPosts, tools }: Props) => {
  const [distance, setDistance] = useState(10);
  const [time, setTime] = useState(30);
  const [pace, setPace] = useState(distance / time);
  const [locked, setLocked] = useState(null);

  const handleDistanceChange = () => {
    console.log("Handle Distance Change");
  };

  const handleTimeChange = () => {
    console.log("Handle Time Change");
  };

  const handlePaceChange = () => {
    console.log("Handle Pace Change");
  };

  return (
    <Layout posts={posts} blogPosts={blogPosts} tools={tools}>
      <article>
        <Head>
          <title>Running pace calculator</title>
        </Head>
        <form>
          <div>
            <label>
              Distance:
              <input
                type="number"
                value={distance}
                onChange={handleDistanceChange}
              ></input>
            </label>
          </div>

          <div>
            <label>
              Time:
              <input
                type="number"
                value={time}
                onChange={handleTimeChange}
              ></input>
            </label>
          </div>

          <div>
            <label>
              Pace:
              <input
                type="number"
                value={pace}
                onChange={handleDistanceChange}
              ></input>
            </label>
          </div>
        </form>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) {
    return { props: { posts: [], blogPosts: [], tools: [] } };
  }

  return Promise.resolve({
    props: {
      posts: getAllPosts(PROJECTS_FOLDER, ["slug", "title"], false),
      blogPosts: getAllPosts(BLOG_FOLDER, ["slug", "title"], false),
      tools: [{ slug: "pace-calculator", title: "Pace Calculator" }],
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

export default PaceCalculator;
