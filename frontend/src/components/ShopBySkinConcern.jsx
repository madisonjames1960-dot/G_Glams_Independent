import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const CONCERNS = [
  { name: "Acne & Breakouts", desc: "Calm, clear and balance blemish-prone skin." },
  { name: "Dark Spots", desc: "Target the look of post-blemish marks." },
  { name: "Hyperpigmentation", desc: "Even the appearance of uneven tone." },
  { name: "Dry Skin", desc: "Restore comfort and lasting moisture." },
  { name: "Oily Skin", desc: "Balance and refine without stripping." },
  { name: "Uneven Texture", desc: "Smooth and soften skin's surface." },
  { name: "Glow & Radiance", desc: "Boost a healthy-looking luminosity." },
  { name: "Body Care", desc: "Nourish skin from neck to toe." },
];

export default function ShopBySkinConcern({ onSelect }) {
  return (
    <section id="concerns" className="py-16 sm:py-24 bg-sandstone/30 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Find Your Match"
          title="Shop by Skin Concern"
          intro="Tell us what your skin needs and we'll point you to the right products."
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CONCERNS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.04}>
              <button
                onClick={() => onSelect(c.name)}
                className="group w-full text-left bg-cream border hairline border-ochre/15 hover:border-ochre/50 p-5 sm:p-6 h-full transition-colors"
              >
                <h3 className="font-heading text-lg sm:text-xl text-coffee leading-tight">{c.name}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase text-ochre">
                  Shop <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
