import { getFeeds } from "../../../lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const { atom } = await getFeeds();
  return new Response(atom, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
