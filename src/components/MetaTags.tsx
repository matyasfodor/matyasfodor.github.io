import Head from "next/head";

const MyMetaTags = () => (
  <Head>
    <title>Matyas Fodor Software Engineer</title>
    <meta name="title" content="Matyas Fodor Software Engineer" />
    <meta
      name="description"
      content="Personal website of Matyas Fodor, a fullstack software engineer proficient in Python, TypeScript and JavaScript."
    />

    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨🏼‍💻</text></svg>"
    ></link>

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://matyasfodor.com/" />
    <meta property="og:title" content="Matyas Fodor Software Engineer" />
    <meta
      property="og:description"
      content="Personal website of Matyas Fodor, a fullstack software engineer proficient in Python, TypeScript and JavaScript."
    />
    <meta property="og:image" content="/preview.png"></meta>

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://matyasfodor.com/" />
    <meta property="twitter:title" content="Matyas Fodor Software Engineer" />
    <meta
      property="twitter:description"
      content="Personal website of Matyas Fodor, a fullstack software engineer proficient in Python, TypeScript and JavaScript."
    />
    <meta property="twitter:image" content="/preview.png" />
    <meta name="robots" content="index, follow" />
    <meta
      name="keywords"
      content="software engineer,software developer,algorithms,python,typescript,javascript,react,vue,docker,rust,nextjs,prisma,graphql,Google Cloud Platform,GCP,AWS,UK,United Kingdom,Europe,Hungary,Budapest,software company"
    />

  </Head>
);

export default MyMetaTags;
