import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import StackedTransition from "@/PentaHouse/About/StackedTransition";
import CTA from "@/PentaHouse/Home/CTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <StackedTransition />
      <CTA />
      <Footer />
    </div>
  );
}
