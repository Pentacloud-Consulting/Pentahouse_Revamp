import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Projectsample from "@/PentaHouse/Projects/Projectsample";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <Projectsample />
      <Footer />
    </div>
  );
}
