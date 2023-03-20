import MetaTags from "../components/MetaTags";
import Layout, { LayoutProps } from "../components/Layout";
import { GetStaticProps } from "next";
import { BLOG_FOLDER, getAllPosts, PROJECTS_FOLDER } from "../lib/api";
import { useRouter } from "next/router";
import { FEATURES } from "../lib/consts";

function App({ posts, blogPosts }: LayoutProps) {
  const router = useRouter();
  const { feat } = router.query;

  if (feat === FEATURES.WEBSUMMIT) {
    router.replace("/websummit");
  }

  return (
    <Layout posts={posts} blogPosts={blogPosts}>
      <MetaTags />
      <section>
        <p>
          I am an AI graduate currently working as a tech lead at{" "}
          <a rel="noreferrer noopener" href="https://www.benevolent.com/">
            BenevolentAI
          </a>
          .
        </p>
        <p>
          In my free time, I am tinkering with neural nets{" "}
          <span className="noGlow">🕸</span> and Rust{" "}
          <span className="noGlow">🦀</span> or visiting bakeries for overpriced{" "}
          <span className="noGlow">☕️</span> and{" "}
          <span className="noGlow">🥐</span>.
        </p>
        <p>
          I am an endurance sports and functional training enthusiast, in 2018 I
          finished an Ironman. <span className="noGlow">🏊‍♂️ 🚴‍♂️ 🏃‍♂️</span>
        </p>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const rssLib = await import("../lib/rss");

  await rssLib.generateRss();
  return Promise.resolve({
    props: {
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

export default App;
