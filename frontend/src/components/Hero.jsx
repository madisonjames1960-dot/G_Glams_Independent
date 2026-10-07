import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { waLink } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <p className="text-[11px] tracking-luxe uppercase text-ochre mb-4 animate-fade-up">
            Nigerian Skincare • Made for real routines
          </p>
          <h1 className="font-heading text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl text-coffee text-balance animate-fade-up">
            Skincare that helps your skin look and feel its best.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md animate-fade-up" style={{ animationDelay: "0.08s" }}>
            Thoughtfully made skincare for healthy-looking, radiant skin — created for real people and real routines.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.16s" }}>
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 bg-coffee text-cream h-12 px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors"
            >
              Shop Our Skincare <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#routine"
              className="inline-flex items-center justify-center border hairline border-ochre/40 text-coffee h-12 px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
            >
              Find Your Routine
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Questions before you order?{" "}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-ochre underline underline-offset-4">
              Chat with us on WhatsApp
            </a>
          </p>
        </div>

        <div className="order-1 md:order-2 animate-fade-up" style={{ animationDelay: "0.12s" }}>
          <PlaceholderImage
            label="[UPLOAD REAL HERO IMAGE — PRODUCT COMPOSITION OR LIFESTYLE PHOTO]"
            aspect="aspect-[4/5] sm:aspect-[3/4]"
            className="rounded-sm shadow-xl shadow-coffee/5"
          />
        </div>
      </div>
    </section>
  );
}
