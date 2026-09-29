export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  htmlContent?: string; // WordPress HTML content support
  highlights: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  readTimeNum?: number;
  image: string;
  featured?: boolean;
  bentoSpan?: "col-span-1" | "col-span-1 lg:col-span-2";
  tags: string[];
  views: number;
  likes: number;
}

export type LayoutMode = "grid" | "list";
export type SortOption = "newest" | "popular" | "readTime";

export const CATEGORIES = [
  "All",
  "Bangalore",
  "Thanisandra",
  "RT Nagar"
] as const;

export const MOCK_BLOGS: BlogPost[] = [];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return undefined;
}
