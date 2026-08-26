import type { GetServerSideProps, NextPage } from "next";
import { createClient } from "redis";
import { qrRedirectDestinations } from "../../lib/qrRedirectsConfig";

const COUNTER_PREFIX = "qr:hits:";
function connectRedis() {
  const url = process.env.UPSTASH_REDIS_REST_REDIS_URL;
  if (!url) throw new Error("UPSTASH_REDIS_REST_REDIS_URL is not configured");

  const client = createClient({ url });
  client.on("error", (error) => console.error("Redis client error", error));
  return client.connect();
}

let redisConnection: ReturnType<typeof connectRedis> | undefined;

function getRedis() {
  if (redisConnection) return redisConnection;

  redisConnection = connectRedis().catch((error) => {
    redisConnection = undefined;
    throw error;
  });

  return redisConnection;
}

function getDestination(slug: string): string | undefined {
  return qrRedirectDestinations?.[slug];
}

async function recordAnonymousHit(slug: string): Promise<void> {
  const redis = await getRedis();
  await redis.incr(`${COUNTER_PREFIX}${slug}`);
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
