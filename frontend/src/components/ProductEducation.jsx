import { Leaf, Droplets, HandHeart, Users, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const PILLARS = [
  { icon: Leaf, title: "Ingredients with purpose", desc: "We choose our ingredients carefully and list them clearly, so you know what you're putting on your skin." },
  { icon: Droplets, title: "What each product does", desc: "Every product has a clear purpose, making it easier to choose what belongs in your routine." },
  { icon: HandHeart, title: "How to use it", desc: "We provide clear directions for using each product in your morning or evening routine." },
  { icon: Users, title: "Who it's for", desc: "We explain who each product is intended for and when you may need to ask us for advice first." },
  { icon: Clock, title: "Realistic expectations", desc: "Good skincare takes time. We'll always be honest about what to expect." },
];

export default function ProductEducation() {
  return (
    <section className="py-16 sm:py-24 bg-coffee text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Why Trust Us"
          title="Skincare you can understand"
          intro="We believe you should know what you're using, how to use it and what to expect."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="bg-coffee p-7 sm:p-8 h-full">
                <p.icon className="w-7 h-7 text-ochre mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl text-cream mb-2">{p.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <div className="bg-ochre p-7 sm:p-8 h-full flex flex-col justify-center">
              <p className="font-heading text-2xl text-cream leading-snug">
                We don't promise miracles. We make skincare with care.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
