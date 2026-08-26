import { getFeeds } from "../../../lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const { json } = await getFeeds();
  return new Response(json, {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
