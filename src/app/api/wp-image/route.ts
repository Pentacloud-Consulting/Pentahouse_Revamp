import { NextRequest, NextResponse } from "next/server";

/**
 * /api/wp-image?url=/wp-content/uploads/2026/10/Home-Construction-Cost-in-Thanisandra.png
 *
 * Proxies WordPress media directly from Hostinger WP backend
 * so all images appear cleanly under https://pentahouse.in without exposing external domains.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("url") || searchParams.get("path");

  if (!rawPath) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let imagePath = rawPath;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    try {
      imagePath = new URL(imagePath).pathname;
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
  }

  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath;
  }

  // Target Hostinger WordPress backend
  const targetUrl = `https://cyan-shrew-737321.hostingersite.com${imagePath}`;

  try {
    const res = await fetch(targetUrl, { next: { revalidate: 86400 } });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream returned ${res.status}` }, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(new Uint8Array(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Proxy-Source": "pentahouse-wp-proxy",
      },
    });
  } catch (err: any) {
    console.error("[WP-Image-Proxy] Fetch error:", err?.message || err);
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 502 });
  }
}
