import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import BlogView from "@/PentaHouse/Blog/Blog View";
import CTA from "@/PentaHouse/Home/CTA";
import { fetchWordPressPosts } from "@/PentaHouse/Blog/wordpress";

// Server Component: fetches WordPress posts on the server using Node.js HTTPS SNI.
// This bypasses browser CORS/SSL limits and hits Hostinger shared hosting directly.
export default async function BlogPage() {
  const initialPosts = await fetchWordPressPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-clip selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <div className="pt-28 sm:pt-32 pb-12">
        <BlogView initialPosts={initialPosts} />
        <div className="mt-16 sm:mt-24">
          <CTA />
        </div>
      </div>
      <Footer />
    </div>
  );
}


