"use client";

import { useEffect, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import CookieConsent from "react-cookie-consent";
import ReactGA from "react-ga4";

const GA_ID = "G-N07115D5HQ";

export default function ClientProviders({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.initialize(GA_ID, { testMode: false });
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return (
    <>
      {children}
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}
