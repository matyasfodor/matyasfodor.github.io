import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactGA from 'react-ga4';

export function useGA(GAId: string) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.send({hitType: "pageview", page: url})
    };
    ReactGA.initialize(GAId, { testMode: false });
    ReactGA.send({hitType: "pageview", page: router.pathname})

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
}
