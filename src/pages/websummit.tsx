import MetaTags from "../components/MetaTags";
import Layout, { LayoutProps } from "../components/Layout";
import { GetStaticProps } from "next";
import { BLOG_FOLDER, getAllPosts, PROJECTS_FOLDER } from "../lib/api";

function WebSummit({ posts, blogPosts }: LayoutProps) {
  return (
    <Layout posts={posts} blogPosts={blogPosts}>
      <MetaTags />
      <section>
        <h1>Greetings fellow Websummiter!&nbsp;👋🏻</h1>
        <p>
          I'm glad we met in Lisbon. I am Matyas, a startup co-founder and a
          software engineer. I am currently looking for my next gig. Over the
          years I worked in many positions at companies of different sizes and I
          tried to define what would be the ideal role for me. What I've enjoyed
          the most is laying down the fundations of a product and building a
          tech team. I am looking for a similar opportunity, but I am open to
          talk about other opportunities as well.
        </p>
        <h2>I can help you with</h2>
        <ul>
          <li>implementing your MVP</li>
          <li>building a software team</li>
          <li>validating the product</li>
        </ul>
        <h2>Why would you want to work with me?</h2>
        <ul>
          <li>Seasoned full-stack web developer</li>
          <li>Translates business needs to technical solutions with ease</li>
          <li>Pragmatic problem solver</li>
          <li>Have an extensive network of tech professionals</li>
        </ul>
        <h2>Some key highlights from my background:</h2>
        <ul>
          <li>
            Vast startup experience - having worked with five different startups
            in the past decade, across different industries
          </li>
          <li>Worked in multiple technical managerial roles</li>
          <li>Conducted 30+ interviews</li>
          <li>Co-founded and launched a successful fintech startup as a CTO</li>
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return Promise.resolve({
    props: {
      posts: getAllPosts(PROJECTS_FOLDER, ["slug", "title"], false),
      blogPosts: getAllPosts(BLOG_FOLDER, ["slug", "title"], false),
    },
  });
};

export default WebSummit;
