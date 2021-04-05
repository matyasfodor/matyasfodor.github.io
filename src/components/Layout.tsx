import useDarkMode from "use-dark-mode";
import type React from "react";
import styles from "./Layout.module.scss";
import SocialLinks from "./SocialLinks";
import Toggle from "./Toggle";
import ProjectsBox from "./ProjectsBox";
import type { PostProps } from "../commonTypes";

const Layout: React.FC<PostProps> = ({ posts, children }) => {
  const darkMode = useDarkMode();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div></div>
        <div className={styles.title}>
          <a href="/" className="no-link">
            <h1>Matyas Fodor</h1>
          </a>
        </div>
        <div>
          <Toggle value={darkMode.value} onChange={darkMode.toggle} />
        </div>
      </header>
      <div className={styles.middleSection}>
        <aside className={styles.leftAside}>
          <ProjectsBox posts={posts} />
        </aside>
        <main className={styles.main}>{children}</main>
        <aside className={styles.rightAside}></aside>
      </div>
      <footer className={styles.footer}>
        <SocialLinks />
      </footer>
    </div>
  );
};

export default Layout;
