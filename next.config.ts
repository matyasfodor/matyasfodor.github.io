import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { qrRedirectDestinations } from "./src/lib/qrRedirectsConfig";

// Importing and evaluating this at startup makes invalid redirect configuration
// fail `next dev` and `next build`, before the application begins serving traffic.
void qrRedirectDestinations;

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "feat", value: "websummit" }],
        destination: "/websummit",
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    // Plugin names must be serializable for the default Turbopack build.
    rehypePlugins: ["rehype-highlight"],
  },
});

export default withMDX(nextConfig);
