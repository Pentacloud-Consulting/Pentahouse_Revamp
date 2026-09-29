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
  
  // Fetch post details from WordPress or mock data
  const post = (await fetchWordPressPostBySlug(slug)) || getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Pentahouse Journal | Architectural Perspectives",
      description: "Thought leadership, spatial innovations, and luxury interior dynamics curated by Pentahouse master architects."
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pentahouse.in";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const metaDescription = post.subtitle || post.excerpt;

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
          url: post.image,
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
      images: [post.image],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPreview slug={slug} />;
}
