import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import OurProjects from "@/PentaHouse/Projects/Our Projects";
import ProjectsTransition from "@/Animations/ProjectsTransition";
import Trust2 from "@/PentaHouse/Projects/Trust - 2";
import CTA from "@/PentaHouse/Home/CTA";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <div className="pt-32 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <OurProjects />
        </div>

        {/* The cinematic GSAP transition wrapping the two main panels */}
        <ProjectsTransition />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10 mb-12">
          <Trust2 />
        </div>
        
        <CTA />
      </div>
      <Footer />
    </div>
  );
}
