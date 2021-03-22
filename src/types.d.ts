declare module "react-meta-tags" {
  export default class Meta extends React.Component {}
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
