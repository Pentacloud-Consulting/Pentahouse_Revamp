import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CinematicSequence from "@/PentaHouse/Services/CinematicSequence";
import WhoWeDo from "@/PentaHouse/Services/Who We Do";
import CTA from "@/PentaHouse/Home/CTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      
      <div className="font-sans overflow-hidden">
        <CinematicSequence />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-32 py-10 lg:py-32">
          <WhoWeDo />
        </div>
        
        <CTA />
      </div>

      <Footer />
    </div>
  );
}
