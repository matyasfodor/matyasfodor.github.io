import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faStrava,
} from "@fortawesome/free-brands-svg-icons";
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
        <a href={link} rel="noreferrer noopener" key={link}>
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
    </div>
  );
};

function App() {
  return (
    <div>
      <header>
        <p>Mátyás Fodor</p>
        <p>
          Fullstack engineer, AI graduate. Currently working as a software
          engineer and tech lead{" "}
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
        <p>I am fiddling with neural nets🕸 and Rust 🦀 in my freetime</p>
      </header>
      <footer>
        <SocialLinks />
      </footer>
    </div>
  );
}

export default App;
