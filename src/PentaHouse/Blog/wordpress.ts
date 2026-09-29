import { BlogPost, MOCK_BLOGS } from "./types";

export const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://pentahouse.in";

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

  // Extract featured image URL or first content image
  const image =
    wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    firstContentImg ||
    "";

  // Extract category name
  const terms = wpPost._embedded?.["wp:term"]?.[0] || [];
  const rawCategory = terms.length > 0 ? terms[0].name : "Blog";
  const categoryName = rawCategory
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'");

  // Clean HTML tags from excerpt
  const rawExcerpt = wpPost.excerpt.rendered.replace(/<[^>]+>/g, "").trim();

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
    title: wpPost.title.rendered
      .replace(/&#8211;/g, "–")
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&"),
    subtitle: rawExcerpt.slice(0, 120) + (rawExcerpt.length > 120 ? "..." : ""),
    excerpt: rawExcerpt,
    content: [],
    htmlContent: wpPost.content.rendered,
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
  try {
    const firstRes = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=100`, {
      next: { revalidate: 60 }
    });

    if (!firstRes.ok) throw new Error(`WordPress API returned status ${firstRes.status}`);

    const totalPagesHeader = firstRes.headers.get("X-WP-TotalPages");
    const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;

    let allWpPosts: WPPost[] = await firstRes.json();

    if (totalPages > 1) {
      const pageRequests = [];
      for (let p = 2; p <= Math.min(totalPages, 10); p++) {
        pageRequests.push(
          fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=${p}`, {
            next: { revalidate: 60 }
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

    const transformed = allWpPosts.map(transformWPPostToBlogPost);
    if (transformed.length > 0) {
      inMemoryPostsCache = transformed;
    }
    return transformed;
  } catch (error) {
    console.warn("Could not fetch WordPress posts:", error);
    return inMemoryPostsCache || [];
  }
}

export async function fetchWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&slug=${slug}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const wpPosts: WPPost[] = await res.json();
    if (wpPosts.length > 0) {
      return transformWPPostToBlogPost(wpPosts[0]);
    }
    return null;
  } catch (error) {
    console.warn(`Could not fetch WordPress post for slug '${slug}':`, error);
    return null;
  }
}
