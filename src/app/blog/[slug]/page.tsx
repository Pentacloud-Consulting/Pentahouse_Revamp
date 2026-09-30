import type { Metadata } from "next";
import BlogPreview from "@/PentaHouse/Blog/Blog Preview";
import { getBlogBySlug } from "@/PentaHouse/Blog/types";
import { fetchWordPressPostBySlug } from "@/PentaHouse/Blog/wordpress";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch post details from WordPress (server-side SNI fetch)
  const post = (await fetchWordPressPostBySlug(slug)) || getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Pentahouse Journal | Architectural Perspectives",
      description: "Thought leadership, spatial innovations, and luxury interior dynamics curated by Pentahouse master architects."
    };
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://pentahouse.in").replace(/\/+$/, "");
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const metaDescription = post.subtitle || post.excerpt;

  // For OG/Twitter image: prefer the raw WordPress URL (Hostinger direct) so social
  // crawlers (Facebook, WhatsApp, Twitter bots) can fetch it without needing our proxy.
  // Fall back to the absolute proxied URL if rawImage is not available.
  const ogImageUrl = post.imageRaw
    ? post.imageRaw  // original https://pentahouse.in/wp-content/uploads/... on Hostinger
    : post.image
      ? (post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`)
      : `${siteUrl}/Logo/PentaHouse_OG.png`;

  return {
    title: `${post.title} | Pentahouse Journal`,
    description: metaDescription,
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: postUrl,
      siteName: "Pentahouse Construction",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };
}

// Server Component: fetches the WP post via Node.js HTTPS SNI (82.180.142.220).
// Passes it as initialPost to the client component so it renders immediately.
export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const initialPost = (await fetchWordPressPostBySlug(slug)) || getBlogBySlug(slug) || null;
  return <BlogPreview slug={slug} initialPost={initialPost} />;
}

