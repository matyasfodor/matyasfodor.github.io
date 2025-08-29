import useDarkMode from "use-dark-mode";
import type React from "react";
import styles from "./Layout.module.scss";
import SocialLinks from "./SocialLinks";
import Toggle from "./Toggle";
import ContentBox from "./ContentBox";
import type { SidebarContentListItem } from "../commonTypes";
import { PropsWithChildren } from "react";

export type LayoutProps = {
  posts: SidebarContentListItem[];
  blogPosts: SidebarContentListItem[];
};

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  posts,
  blogPosts,
  children,
}) => {
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
          <ContentBox urlPath="projects" title="Projects" posts={posts} />
          <ContentBox urlPath="blog" title="Blog" posts={blogPosts} />
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
