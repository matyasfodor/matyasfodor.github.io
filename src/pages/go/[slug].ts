import type { GetServerSideProps, NextPage } from "next";
import { qrRedirectDestinations } from "../../lib/qrRedirectsConfig";

const COUNTER_PREFIX = "qr:hits:";

function getDestination(slug: string): string | undefined {
  return qrRedirectDestinations?.[slug];
}

async function recordAnonymousHit(slug: string): Promise<void> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    throw new Error("Upstash Redis is not configured");
  }

  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["INCR", `${COUNTER_PREFIX}${slug}`]),
  });

  if (!response.ok) {
    throw new Error(`Upstash returned HTTP ${response.status}`);
  }
}

const RedirectPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.statusCode = 405;
    res.end();
    return { props: {} };
  }

  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  if (!slug) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }

  const destination = getDestination(slug);

  if (!destination) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }

  // HEAD requests are often automated checks or previews, not human scans.
  if (req.method === "GET") {
    try {
      await recordAnonymousHit(slug);
    } catch (error) {
      // A counter outage must never make an already-printed QR code stop working.
      console.error(`Could not increment QR counter for slug: ${slug}`, error);
    }
  }

  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Location", destination);
  res.statusCode = 302;
  res.end();
  return { props: {} };
};

export default RedirectPage;
