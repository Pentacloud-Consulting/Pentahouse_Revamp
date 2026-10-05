import { BlogPost } from "./types";

export const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cyan-shrew-737321.hostingersite.com";

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

  // Extract raw image URL
  let rawImage =
    wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    firstContentImg ||
    "";

  // Clean raw image path
  if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
    try {
      rawImage = new URL(rawImage).pathname;
    } catch {}
  }

  // Format image URL as clean pentahouse.in proxy URL (/api/wp-image)
  const image = rawImage
    ? `/api/wp-image?url=${encodeURIComponent(rawImage)}`
    : "";

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

  // Transform embedded HTML body images to use clean /api/wp-image proxy
  let htmlContent = wpPost.content?.rendered || "";
  if (htmlContent) {
    // 1. Replace absolute hostinger URLs in img src with clean /api/wp-image proxy
    htmlContent = htmlContent.replace(
      /src=["']https?:\/\/[^\/]+\/(wp-content\/[^"']+)["']/gi,
      (_match, path) => `src="/api/wp-image?url=${encodeURIComponent("/" + path)}"`
    );
    // 2. Replace relative /wp-content/ URLs in img src with clean /api/wp-image proxy
    htmlContent = htmlContent.replace(
      /src=["']\/(wp-content\/[^"']+)["']/gi,
      (_match, path) => `src="/api/wp-image?url=${encodeURIComponent("/" + path)}"`
    );
  }

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
    htmlContent: htmlContent,
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

let inMemoryPostsCache: BlogPost[] | null = null;

export function getCachedWordPressPosts(): BlogPost[] | null {
  return inMemoryPostsCache;
}

export async function fetchWordPressPosts(): Promise<BlogPost[]> {
  const candidateUrls = [
    process.env.NEXT_PUBLIC_WORDPRESS_URL,
    "https://cyan-shrew-737321.hostingersite.com",
    "https://pentahouse.in"
  ].filter(Boolean) as string[];

  for (const baseUrl of candidateUrls) {
    try {
      const cleanUrl = baseUrl.replace(/\/+$/, "");
      const firstRes = await fetch(`${cleanUrl}/wp-json/wp/v2/posts?_embed&per_page=30`, {
        cache: "no-store"
      });

      if (!firstRes.ok) continue;

      let allWpPosts: WPPost[] = await firstRes.json();
      if (!Array.isArray(allWpPosts) || allWpPosts.length === 0) continue;

      const totalPagesHeader = firstRes.headers.get("X-WP-TotalPages");
      const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;

      if (totalPages > 1) {
        const pageRequests = [];
        for (let p = 2; p <= Math.min(totalPages, 5); p++) {
          pageRequests.push(
            fetch(`${cleanUrl}/wp-json/wp/v2/posts?_embed&per_page=30&page=${p}`, {
              cache: "no-store"
            }).then(r => (r.ok ? r.json() : []))
          );
        }
        const additionalPages = await Promise.all(pageRequests);
        additionalPages.forEach(posts => {
          if (Array.isArray(posts)) {
            allWpPosts = allWpPosts.concat(posts);
          }
        });
      }

      // Sort posts by date descending so the newest published post always appears first
      allWpPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const transformed = allWpPosts.map(transformWPPostToBlogPost);
      if (transformed.length > 0) {
        inMemoryPostsCache = transformed;
      }
      return transformed;
    } catch (error) {
      // Try next candidate URL
    }
  }

  return inMemoryPostsCache || [];
}

export async function fetchWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
  const candidateUrls = [
    process.env.NEXT_PUBLIC_WORDPRESS_URL,
    "https://cyan-shrew-737321.hostingersite.com",
    "https://pentahouse.in"
  ].filter(Boolean) as string[];

  for (const baseUrl of candidateUrls) {
    try {
      const cleanUrl = baseUrl.replace(/\/+$/, "");
      const res = await fetch(`${cleanUrl}/wp-json/wp/v2/posts?_embed&slug=${slug}`, {
        cache: "no-store"
      });

      if (!res.ok) continue;

      const wpPosts: WPPost[] = await res.json();
      if (Array.isArray(wpPosts) && wpPosts.length > 0) {
        return transformWPPostToBlogPost(wpPosts[0]);
      }
    } catch (error) {
      // Try next candidate URL
    }
  }

  return null;
}
