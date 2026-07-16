import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import PrivacyPolicy from "@/PentaHouse/Privacy-Terms/Privacy Policy";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
