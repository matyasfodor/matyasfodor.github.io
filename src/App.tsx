import useDarkMode from "use-dark-mode";

import Toggle from "./Toggle";
import MetaTags from "./MetaTags";
import SocialLinks from "./SocialLinks";

import "./App.scss";

function App() {
  const darkMode = useDarkMode();
  return (
    <div className="App">
      <MetaTags />
      <header>
        <div className="toggleContainer">
          <Toggle value={darkMode.value} onChange={darkMode.toggle} />
        </div>
        <h1>Matyas Fodor</h1>
      </header>
      <section className="mainSection">
        <p>
          I am an AI graduate currently working as a fullstack developer and
          tech lead at{" "}
          <a rel="noreferrer noopener" href="https://www.benevolent.com/">
            BenevolentAI
          </a>
          .
        </p>
        <p>
          In my free time, I am tinkering with neural nets 🕸 and Rust 🦀 or
          visiting bakeries for overpriced ☕️ and 🥐.
        </p>
        <p>
          I am an endurance sports and functional training enthusiast, in 2018 I
          finished an iron man. 🏊‍♂️ 🚴‍♂️ 🏃‍♂️
        </p>
      </section>
      <footer>
        <SocialLinks />
      </footer>
    </div>
  );
}

export default App;
