import Head from "next/head";

const darkmodeScript = `
(function() {
  // Change these if you use something different in your hook.
  var storageKey = 'darkMode';
  var classNameDark = 'dark-mode';
  var classNameLight = 'light-mode';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }
  
  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
`;

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

    <script dangerouslySetInnerHTML={{ __html: darkmodeScript }} />
  </Head>
);

export default MyMetaTags;
