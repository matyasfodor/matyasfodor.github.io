import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "../pages/index.scss";
import ClientProviders from "../components/ClientProviders";
import Layout from "../components/Layout";
import { getAllContent } from "../lib/content";

const title = "Matyas Fodor Software Engineer";
const description =
  "Personal website of Matyas Fodor, a fullstack software engineer proficient in Python, TypeScript and JavaScript.";

export const metadata: Metadata = {
  metadataBase: new URL("https://matyasfodor.com"),
  title,
  description,
  keywords: [
    "software engineer",
    "software developer",
    "algorithms",
    "python",
    "typescript",
    "javascript",
    "react",
    "rust",
    "AWS",
    "Budapest",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨🏼‍💻</text></svg>",
  },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    images: ["/preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/preview.png"],
  },
};

const themeScript = `
(() => {
  const storageKey = "darkMode";
  let stored = null;
  try { stored = localStorage.getItem(storageKey); } catch {}
  const isDark = stored === "true" ||
    (stored !== "false" && matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.classList.add(isDark ? "dark-mode" : "light-mode");
  root.style.colorScheme = isDark ? "dark" : "light";
})();
`;

export default async function RootLayout({ children }: PropsWithChildren) {
  const [posts, blogPosts] = await Promise.all([
    getAllContent("projects", { includeHidden: false }),
    getAllContent("blog", { includeHidden: false }),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ClientProviders>
          <Layout posts={posts} blogPosts={blogPosts}>
            {children}
          </Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
