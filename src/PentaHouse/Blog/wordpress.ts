import { BlogPost } from "./types";
import https from "https";

// Hostinger Shared Web Hosting IP for Pentahouse WordPress backend
// CORRECT IP verified 2026-09-30: https://82.180.142.220 with Host:pentahouse.in → 200 OK
// wp.pentahouse.in (DNS A) → 82.180.142.220 (Hostinger shared hosting / WordPress)
// pentahouse.in   (DNS A) → 31.97.207.239  (VPS / Next.js)
const HOSTINGER_WP_IP = "82.180.142.220";
const HOSTINGER_WP_HOST = "pentahouse.in";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ name: string; taxonomy: string }>>;
    author?: Array<{ name: string }>;
  };
}

export function transformWPPostToBlogPost(wpPost: WPPost): BlogPost {
  // Extract first <img> src from content HTML if featuredmedia is missing
  const contentImgMatch = wpPost.content?.rendered?.match(/<img[^>]+src=["']([^"']+)["']/i);
  const firstContentImg = contentImgMatch ? contentImgMatch[1] : "";

  // Extract featured image URL or first content image, then rewrite to proxy
  const rawImage =
    wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    firstContentImg ||
    "";
  const image = rewriteWPImageUrl(rawImage);

  // Extract category name
  const terms = wpPost._embedded?.["wp:term"]?.[0] || [];
  const rawCategory = terms.length > 0 ? terms[0].name : "Blog";
  const categoryName = rawCategory
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'");

  // Clean HTML tags from excerpt
  const rawExcerpt = wpPost.excerpt?.rendered ? wpPost.excerpt.rendered.replace(/<[^>]+>/g, "").trim() : "";

  // Format date cleanly
  const postDate = new Date(wpPost.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  // Calculate real reading time based on word count
  const plainText = wpPost.content?.rendered?.replace(/<[^>]+>/g, " ").trim() || "";
  const wordCount = plainText ? plainText.split(/\s+/).length : 250;
  const readTimeNum = Math.max(2, Math.ceil(wordCount / 200));
  const readTimeStr = `${readTimeNum} min read`;

  // Dynamic realistic view count based on ID for Popular sorting
  const views = ((wpPost.id * 47) % 2500) + 400;

  return {
    id: `wp-${wpPost.id}`,
    slug: wpPost.slug,
    title: (wpPost.title?.rendered || "Untitled Post")
      .replace(/&#8211;/g, "–")
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&"),
    subtitle: rawExcerpt.slice(0, 120) + (rawExcerpt.length > 120 ? "..." : ""),
    excerpt: rawExcerpt,
    content: [],
    htmlContent: rewriteWPContentImages(wpPost.content?.rendered || ""),
    highlights: [],
    category: categoryName,
    author: {
      name: "PentaHouse",
      role: "Official Journal",
      avatar: "/Logo/PentaHouse_Favicon.png"
    },
    date: postDate,
    readTime: readTimeStr,
    readTimeNum: readTimeNum,
    image: image,
    bentoSpan: "col-span-1",
    tags: [categoryName],
    views: views,
    likes: Math.floor(views * 0.15)
  };
}

/**
 * Rewrites a WordPress image URL to go through the local /api/wp-image proxy.
 *
 * Why: WordPress media URLs are https://pentahouse.in/wp-content/uploads/...
 * but pentahouse.in now points to the VPS (Next.js), not WordPress.
 * The proxy fetches the image from Hostinger shared hosting via SNI.
 */
function rewriteWPImageUrl(url: string): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    // Only proxy /wp-content/ paths — leave external CDN images alone
    if (parsed.pathname.startsWith("/wp-content/")) {
      return `/api/wp-image?url=${encodeURIComponent(url)}`;
    }
  } catch {
    // Not a valid URL — return as-is
  }
  return url;
}

/**
 * Rewrites all <img src="..."> inside a WordPress HTML content string
 * so inline images also go through the proxy.
 */
function rewriteWPContentImages(html: string): string {
  if (!html) return html;
  return html.replace(
    /(<img[^>]+src=["'])([^"']+)(["'])/gi,
    (_, pre, src, post) => `${pre}${rewriteWPImageUrl(src)}${post}`
  );
}


/**
 * Direct HTTPS SNI fetcher to Hostinger shared hosting (82.180.142.220).
 * Injects Host: pentahouse.in so WordPress serves the correct site.
 * rejectUnauthorized:false required — TLS cert is for the domain, not the bare IP.
 * Verified 2026-09-30: returns HTTP 200 with real WordPress JSON.
 */
function fetchFromHostingerWP(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: HOSTINGER_WP_IP,         // 82.180.142.220 — Hostinger shared hosting
        servername: HOSTINGER_WP_HOST, // SNI: send pentahouse.in TLS handshake
        port: 443,
        method: "GET",
        path: path,
        headers: {
          Host: HOSTINGER_WP_HOST,
          "User-Agent": "PentahouseApp/1.0",
          Accept: "application/json"
        },
        rejectUnauthorized: false,     // cert is for domain, not bare IP
        timeout: 15000
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(new Error(`[WP] Invalid JSON from Hostinger WP (status ${res.statusCode})`));
            }
          } else if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
            reject(new Error(`[WP] Redirect ${res.statusCode} — Location: ${res.headers.location}`));
          } else {
            reject(new Error(`[WP] Hostinger WP HTTP ${res.statusCode}`));
          }
        });
      }
    );

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("[WP] Hostinger WP request timed out"));
    });
    req.end();
  });
}

/**
 * Universal WordPress fetcher — works on localhost, VPS server-side, and client-side.
 *
 * Priority:
 *  1. Server-side direct HTTPS SNI to 82.180.142.220 (bypasses VPS, hits WP directly)
 *  2. fetch() to NEXT_PUBLIC_WORDPRESS_URL env var (custom override)
 *  3. fetch() to https://wp.pentahouse.in (DNS subdomain pointing to shared hosting)
 */
async function wpFetchJson(endpointPath: string): Promise<any> {
  // ── 1. Server-side: direct SNI to Hostinger shared hosting ───────────────
  if (typeof window === "undefined") {
    try {
      const data = await fetchFromHostingerWP(endpointPath);
      if (data && (!Array.isArray(data) || data.length > 0)) {
        console.log("[WP] ✅ Direct SNI fetch OK (82.180.142.220)");
        return data;
      }
    } catch (e: any) {
      console.warn("[WP] ⚠️  Direct SNI failed:", e?.message || e);
    }
  }

  // ── 2. Standard fetch fallbacks ──────────────────────────────────────────
  const fallbacks = [
    process.env.NEXT_PUBLIC_WORDPRESS_URL
    // Note: wp.pentahouse.in has no SSL cert yet — skip to avoid browser CORS/SSL errors.
    // The server-side SNI fetcher (82.180.142.220 direct) handles all server rendering.
  ].filter(Boolean) as string[];

  for (const base of fallbacks) {
    try {
      const url = `${base.replace(/\/+$/, "")}${endpointPath}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (data && (!Array.isArray(data) || data.length > 0)) {
          console.log(`[WP] ✅ fetch() fallback OK: ${base}`);
          return data;
        }
      }
    } catch (e: any) {
      console.warn(`[WP] ⚠️  fetch() failed for ${base}:`, e?.message || e);
    }
  }

  return null;
}

let inMemoryPostsCache: BlogPost[] | null = null;

export function getCachedWordPressPosts(): BlogPost[] | null {
  return inMemoryPostsCache;
}

export async function fetchWordPressPosts(): Promise<BlogPost[]> {
  try {
    const rawData = await wpFetchJson("/wp-json/wp/v2/posts?_embed&per_page=100");
    if (Array.isArray(rawData) && rawData.length > 0) {
      const transformed = rawData.map(transformWPPostToBlogPost);
      inMemoryPostsCache = transformed;
      return transformed;
    }
  } catch (error) {
    console.warn("Could not fetch WordPress posts:", error);
  }

  return inMemoryPostsCache || [];
}

export async function fetchWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const rawData = await wpFetchJson(`/wp-json/wp/v2/posts?_embed&slug=${slug}`);
    if (Array.isArray(rawData) && rawData.length > 0) {
      return transformWPPostToBlogPost(rawData[0]);
    }
  } catch (error) {
    console.warn(`Could not fetch WordPress post for slug '${slug}':`, error);
  }

  return null;
}
