const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";

export async function GET(): Promise<Response> {
  if (!INDEXNOW_KEY) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
