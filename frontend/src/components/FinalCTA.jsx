import { ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { waLink } from "@/lib/siteConfig";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 bg-coffee text-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #FDFBF7 1px, transparent 0)", backgroundSize: "18px 18px" }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Reveal>
          <p className="text-[11px] tracking-luxe uppercase text-ochre mb-4">Your Routine Awaits</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-balance">
            Your skin deserves a routine made for it.
          </h2>
          <p className="mt-5 text-cream/75 text-lg leading-relaxed max-w-xl mx-auto">
            Explore G_Glams Naturals and find products that fit your skin goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 bg-cream text-coffee h-13 px-8 py-3.5 text-[12px] tracking-[0.14em] uppercase hover:bg-ochre hover:text-cream transition-colors"
            >
              Shop G_Glams Naturals <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border hairline border-cream/30 text-cream h-13 px-8 py-3.5 text-[12px] tracking-[0.14em] uppercase hover:bg-cream/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat With Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}