import { NextRequest, NextResponse } from "next/server";
import https from "https";

/**
 * /api/wp-image?url=https://pentahouse.in/wp-content/uploads/...
 *
 * Proxies WordPress media from Hostinger shared hosting (82.180.142.220)
 * via HTTPS+SNI (Host: pentahouse.in), since the main domain now points
 * to the VPS (Next.js) and /wp-content/ no longer exists there.
 */

const HOSTINGER_WP_IP = "82.180.142.220";
const HOSTINGER_WP_HOST = "pentahouse.in";

function fetchImageFromHostinger(path: string): Promise<{ body: Buffer; contentType: string; status: number }> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: HOSTINGER_WP_IP,
        servername: HOSTINGER_WP_HOST,
        port: 443,
        method: "GET",
        path: path,
        headers: {
          Host: HOSTINGER_WP_HOST,
          "User-Agent": "PentahouseApp/1.0",
        },
        rejectUnauthorized: false,
        timeout: 15000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            body: Buffer.concat(chunks),
            contentType: res.headers["content-type"] || "image/jpeg",
            status: res.statusCode || 200,
          });
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Image proxy timeout")); });
    req.end();
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow proxying WordPress content paths from pentahouse.in
  let path: string;
  try {
    const parsed = new URL(imageUrl);
    // Security: only allow /wp-content/ paths from pentahouse.in
    if (!parsed.pathname.startsWith("/wp-content/")) {
      return NextResponse.json({ error: "Forbidden path" }, { status: 403 });
    }
    path = parsed.pathname + (parsed.search || "");
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  try {
    const { body, contentType, status } = await fetchImageFromHostinger(path);

    if (status < 200 || status >= 400) {
      return NextResponse.json({ error: `Upstream returned ${status}` }, { status });
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Proxy-Source": "hostinger-wp",
      },
    });
  } catch (err: any) {
    console.error("[WP-Image-Proxy] Error:", err?.message || err);
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 502 });
  }
}
