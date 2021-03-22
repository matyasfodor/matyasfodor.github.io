import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactGA from "react-ga";

export function useGA(GAId: string) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.set({ page: url });
      ReactGA.pageview(url);
    };
    ReactGA.initialize(GAId, { debug: false });
    ReactGA.set({ page: router.pathname });
    ReactGA.pageview(router.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
}
