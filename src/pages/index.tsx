import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";

function App() {
  return (
    <Layout>
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
          finished an iron man. <span className="noGlow">🏊‍♂️ 🚴‍♂️ 🏃‍♂️</span>
        </p>
      </section>
    </Layout>
  );
}

export default App;
