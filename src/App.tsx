import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faStrava,
} from "@fortawesome/free-brands-svg-icons";
import MetaTags from "react-meta-tags";

import "./App.scss";

const SocialLinks = () => {
  const links = [
    { link: "https://github.com/matyasfodor", icon: faGithub },
    { link: "https://twitter.com/MTY_FDR", icon: faTwitter },
    { link: "https://www.strava.com/athletes/4153821", icon: faStrava },
    { link: "https://www.linkedin.com/in/matyasfodor/", icon: faLinkedin },
  ];
  return (
    <div className="SocialLinks">
      {links.map(({ link, icon }) => (
        <div key={link}>
          <a href={link} rel="noreferrer noopener">
            <FontAwesomeIcon icon={icon} />
          </a>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div>
      <MetaTags>
        <title>Matyas Fodor | Personal website</title>
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
        <h4>Matyas Fodor</h4>
        <p>
          I am an AI graduate currently working as a fullstack software engineer
          and tech lead{" "}
          <a rel="noreferrer noopener" href="https://www.benevolent.com/">
            @BenevolentAI
          </a>
          .
        </p>
        <p>
          In my free time I enjoy cracking coding puzzles, visiting bakeries for
          overpriced ☕️ and 🥐.
        </p>
        <p>
          I prefer endurance sports and functional training, I finished an iron
          man in 2018.
        </p>
        <p>In my free time I am fiddling with neural nets🕸 and Rust 🦀.</p>
      </header>
      <footer>
        <SocialLinks />
      </footer>
    </div>
  );
}

export default App;
