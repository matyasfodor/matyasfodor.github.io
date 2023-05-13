import { Component as ReactComponent } from "react";
import { useGA } from "../hooks/useGA";
import { useIsMounted } from "../hooks/useIsMounted";
import CookieConsent from "react-cookie-consent";
import "./index.scss";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: typeof ReactComponent;
  pageProps: any;
}) {
  useGA("G-N07115D5HQ");

  const { isMounted } = useIsMounted();

  const body = (
    <>
      <Component {...pageProps} />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
}
