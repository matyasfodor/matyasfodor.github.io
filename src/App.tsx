import MetaTags from "react-meta-tags";
import useDarkMode from "use-dark-mode";

import Toggle from "./Toggle";
import SocialLinks from "./SocialLinks";

import "./App.scss";

function App() {
  const darkMode = useDarkMode();
  return (
    <div className="App">
      <MetaTags>
        <title>Matyas Fodor Software Engineer</title>
        <meta
          name="description"
          content="Personal website of Matyas Fodor, a fullstack software engineer proficient in Python, TypeScript and JavaScript."
        />
        <meta property="og:title" content="Matyas Fodor" />
        {/* TODO add image */}
        {/* <meta property="og:image" content="path/to/image.jpg" /> */}
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="software engineer,software developer,algorithms,python,typescript,javascript,react,rust,nextjs,prisma,graphql"
        />
      </MetaTags>
      <header>
        <div className="toggleContainer">
          <Toggle value={darkMode.value} onChange={darkMode.toggle} />
        </div>
        <h1>Matyas Fodor</h1>
      </header>
      <section className="mainSection">
        <p>
          I am an AI graduate currently working as a fullstack software engineer
          and tech lead at{" "}
          <a rel="noreferrer noopener" href="https://www.benevolent.com/">
            BenevolentAI
          </a>
          .
        </p>
        <p>
          In my free time I enjoy cracking coding puzzles, visiting bakeries for
          overpriced ☕️ and 🥐.
        </p>
        <p>
          I am an endurance sports and functional training enthusiast, I
          finished an iron man in 2018. 🏊‍♂️ 🚴‍♂️ 🏃‍♂️
        </p>
        <p>In my free time I am tinkering with neural nets 🕸 and Rust 🦀.</p>
      </section>
      <footer>
        <SocialLinks />
      </footer>
    </div>
  );
}

export default App;
