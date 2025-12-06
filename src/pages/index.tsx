import MetaTags from "../components/MetaTags";
import Layout, { LayoutProps } from "../components/Layout";
import { GetStaticProps } from "next";
import { BLOG_FOLDER, getAllPosts, PROJECTS_FOLDER } from "../lib/api";
import { useRouter } from "next/router";
import { FEATURES } from "../lib/consts";
import {generateRss} from "../lib/rss";

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
          I'm a <strong>freelance product engineer</strong> working on technical problems 
          in <strong>biotech</strong>, <strong>fintech</strong>, and <strong>trusted 
          computing</strong>. As an <strong>AWS Certified Solutions Architect</strong>, I build 
          full-stack solutions—from React frontends to backend infrastructure.
        </p>
        <p>
          My work spans React/TypeScript interfaces, data pipelines for large-scale workloads, 
          cloud architectures, and performance-critical Rust code. I focus on projects that need 
          both technical depth and practical problem-solving: marketplaces, system optimization 
          through benchmarking, and complex integrations.
        </p>
        <p>
          I'm interested in projects where <strong>versatility matters</strong>—building custom 
          tooling, designing automation pipelines, and optimizing constrained systems. I use 
          data-driven approaches to get measurable results efficiently.
        </p>
        <p>
          Outside of work, I do endurance sports, bouldering, and bikepacking. 
          I also spend too much time looking for good espresso ☕️.
        </p>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await generateRss();
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
