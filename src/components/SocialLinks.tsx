import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faStrava,
  faStackOverflow,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";

import { faRss } from "@fortawesome/free-solid-svg-icons";

import styles from "./SocialLinks.module.scss";

const SocialLinks = () => {
  const links: { link: string; icon: IconDefinition }[] = [
    { link: "https://matyasfodor.com/blog/rss.xml", icon: faRss },
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
    <div className={styles.SocialLinks}>
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
