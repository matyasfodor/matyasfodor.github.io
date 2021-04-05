import Link from "next/link";
import style from "./ProjectsBox.module.scss";

import type { PostProps } from "../commonTypes";

const ProjectsBox = ({ posts }: PostProps) => {
  return (
    <div className={style.container}>
      <h3>Projects</h3>
      <hr />
      <ul className="no-list">
        {posts.map(({ slug, title }) => (
          <li key={slug} className={style.listItem}>
            <Link href={`/projects/${slug}`}>
              <a className={`no-link text ${style.link}`}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ProjectsBox;
