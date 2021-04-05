import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/api";
import { PostProps } from "../commonTypes";

function App({ posts }: PostProps) {
  return (
    <Layout posts={posts}>
      <MetaTags />
      <section>
        <p>
          I am an AI graduate currently working as a fullstack developer and
          tech lead at{" "}
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
  return Promise.resolve({
    props: {
      posts: getAllPosts(["slug", "title"]),
    },
  });
};

export default App;
