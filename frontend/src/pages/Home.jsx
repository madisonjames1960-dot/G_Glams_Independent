import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Bestsellers from "@/components/Bestsellers";
import ShopBySkinConcern from "@/components/ShopBySkinConcern";
import RoutineBuilder from "@/components/RoutineBuilder";
import ProductEducation from "@/components/ProductEducation";
import Reviews from "@/components/Reviews";
import SocialGallery from "@/components/SocialGallery";
import AboutBrand from "@/components/AboutBrand";
import DeliveryPayment from "@/components/DeliveryPayment";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  const [activeConcern, setActiveConcern] = useState(null);

  const handleSelect = (c) => {
    setActiveConcern(c);
    requestAnimationFrame(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Bestsellers activeConcern={activeConcern} />
        <ShopBySkinConcern onSelect={handleSelect} />
        <RoutineBuilder />
        <ProductEducation />
        <Reviews />
        <SocialGallery />
        <AboutBrand />
        <div id="delivery" className="scroll-mt-24">
          <DeliveryPayment />
        </div>
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  );
}