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
  // Extract featured image URL
  const image =
    wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  // Extract category name
  const terms = wpPost._embedded?.["wp:term"]?.[0] || [];
  const categoryName = terms.length > 0 ? terms[0].name : "Architecture";

  // Clean HTML tags from excerpt
  const rawExcerpt = wpPost.excerpt.rendered.replace(/<[^>]+>/g, "").trim();

  // Format date cleanly
  const postDate = new Date(wpPost.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

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
    category: (categoryName as any) || "Architecture",
    author: {
      name: "PentaHouse",
      role: "Official Journal",
      avatar: "/Logo/PentaHouse_Favicon.png"
    },
    date: postDate,
    readTime: "5 min read",
    image: image,
    bentoSpan: "col-span-1",
    tags: [categoryName || "Architecture"],
    views: 120,
    likes: 0
  };
}

export async function fetchWordPressPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=50`, {
      next: { revalidate: 60 } // Revalidate cache every 60 seconds
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const wpPosts: WPPost[] = await res.json();
    return wpPosts.map(transformWPPostToBlogPost);
  } catch (error) {
    console.warn("Could not fetch WordPress posts, using default fallback blogs:", error);
    return MOCK_BLOGS;
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
