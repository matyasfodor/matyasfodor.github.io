import useDarkMode from "use-dark-mode";
import type React from "react";
import styles from "./Layout.module.scss";
import SocialLinks from "./SocialLinks";
import Toggle from "./Toggle";

const Layout: React.FC = ({ children }) => {
  const darkMode = useDarkMode();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div></div>
        <h1>Matyas Fodor</h1>
        <div>
          <Toggle value={darkMode.value} onChange={darkMode.toggle} />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <SocialLinks />
      </footer>
    </div>
  );
};

export default Layout;
