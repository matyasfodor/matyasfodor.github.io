import Link from "next/link";
import style from "./ContentBox.module.scss";

import type { ContentBoxProps } from "../commonTypes";

const ContentBox = ({ posts, title, urlPath }: ContentBoxProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={style.container}>
      <h3>{title}</h3>
      <hr />
      <ul className="no-list">
        {posts.map(({ slug, title }) => (
          <li key={slug} className={style.listItem}>
            <Link href={`/${urlPath}/${slug}`}>
              <a className={`no-link text ${style.link}`}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ContentBox;
