import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import OurServices from "@/PentaHouse/Services/Our Services";
import WhyClientsTrustUs from "@/PentaHouse/Services/Why Clients Trust Us";
import WhoWeAre from "@/PentaHouse/Services/Who We Are";
import WhatWeOffer from "@/PentaHouse/Services/What We Offer";
import WhoWeDo from "@/PentaHouse/Services/Who We Do";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 pb-20 font-sans overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
          <OurServices />
          <WhyClientsTrustUs />
          <WhoWeAre />
          <WhatWeOffer />
          <WhoWeDo />
        </div>
      </div>

      <Footer />
    </div>
  );
}
