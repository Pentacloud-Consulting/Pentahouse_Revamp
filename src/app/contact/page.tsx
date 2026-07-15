import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ContactSample from "@/PentaHouse/Contact/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans overflow-x-hidden selection:bg-[#CBA052] selection:text-white">
      <Navbar />
      <ContactSample />
      <Footer />
    </div>
  );
}
