declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXContent: ComponentType;
  export default MDXContent;
}
