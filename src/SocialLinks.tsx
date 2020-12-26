import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faStrava,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

import "./SocialLinks.scss";

const SocialLinks = () => {
  const links = [
    { link: "https://github.com/matyasfodor", icon: faGithub },
    { link: "https://twitter.com/MTY_FDR", icon: faTwitter },
    {
      link: "https://stackoverflow.com/users/2419215/fodma1",
      icon: faStackOverflow,
    },
    { link: "https://www.strava.com/athletes/4153821", icon: faStrava },
    { link: "https://www.linkedin.com/in/matyasfodor/", icon: faLinkedin },
  ];
  return (
    <div className="SocialLinks">
      {links.map(({ link, icon }) => (
        <div key={link}>
          <a href={link} rel="noreferrer noopener" target="_blank">
            <FontAwesomeIcon icon={icon} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
