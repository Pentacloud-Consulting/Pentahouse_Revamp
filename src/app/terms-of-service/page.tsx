import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import TermsOfService from "@/PentaHouse/Privacy-Terms/Terms of Service";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <TermsOfService />
      <Footer />
    </div>
  );
}
