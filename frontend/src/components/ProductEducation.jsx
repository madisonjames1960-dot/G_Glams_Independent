import { Leaf, Droplets, HandHeart, Users, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const PILLARS = [
  { icon: Leaf, title: "Ingredients with purpose", desc: "We choose ingredients for a reason — and list them clearly so you always know what's on your skin." },
  { icon: Droplets, title: "What each product does", desc: "Every product has a clear purpose, so you can build a routine that actually fits your skin." },
  { icon: HandHeart, title: "How to use it", desc: "Simple, realistic directions — morning and night — that fit into a busy Nigerian lifestyle." },
  { icon: Users, title: "Who it's for", desc: "We tell you who each product suits, and who should check with us first before buying." },
  { icon: Clock, title: "Realistic expectations", desc: "Skincare takes time. We share honest timelines — not overnight promises." },
];

export default function ProductEducation() {
  return (
    <section className="py-16 sm:py-24 bg-coffee text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Why Trust Us"
          title="Skincare you can understand"
          intro="We believe in responsible skincare — clear ingredients, honest directions, and realistic expectations."
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
                We don't promise miracles. We promise skincare made with care.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
