import type { Component as ReactComponent } from "react";
import { useGA } from "../hooks/useGA";
import "./index.scss";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: typeof ReactComponent;
  pageProps: any;
}) {
  useGA("UA-186090362-1");
  return <Component {...pageProps} />;
}
