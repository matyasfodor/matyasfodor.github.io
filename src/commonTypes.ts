export type SidebarContentListItem = { slug: string; title: string };

export type ContentBoxProps = {
  title: string;
  urlPath: string;
  posts: SidebarContentListItem[];
};
