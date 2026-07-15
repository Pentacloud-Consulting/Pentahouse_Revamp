import Navbar from "@/Components/Navbar";
import Hero from "@/PentaHouse/Home/Hero";
import Aboutinfo from "@/PentaHouse/Home/Aboutinfo";
import OurServices from "@/PentaHouse/Home/OurServices";
import HorizontalTransition from "@/Components/HorizontalTransition";
import FeaturedProjects from "@/PentaHouse/Home/Featured Projects";
import WhyChoosePentahouse from "@/PentaHouse/Home/Why Choose Pentahouse";
import Trust from "@/PentaHouse/Home/Trust";
import Testimonials from "@/PentaHouse/Home/Testimonials";
import CTA from "@/PentaHouse/Home/CTA";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <Hero />
      <HorizontalTransition>
        <Aboutinfo />
        <OurServices />
      </HorizontalTransition>
      <FeaturedProjects />
      <WhyChoosePentahouse />
      <Trust />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
