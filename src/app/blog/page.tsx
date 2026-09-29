import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import BlogView from "@/PentaHouse/Blog/Blog View";
import CTA from "@/PentaHouse/Home/CTA";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-clip selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <div className="pt-28 sm:pt-32 pb-12">
        <BlogView />
        <div className="mt-16 sm:mt-24">
          <CTA />
        </div>
      </div>
      <Footer />
    </div>
  );
}

