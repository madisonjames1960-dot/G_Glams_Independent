import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "How do I know which product is right for my skin?",
    a: "Use our 'Build Your Skincare Routine' tool, browse by skin concern, or message us on WhatsApp — we'll help you choose based on your skin type and goals.",
  },
  {
    q: "How long before I see results?",
    a: "Results vary depending on your skin and the product you use. Consistent use as directed is important, and visible improvements may take time.",
  },
  {
    q: "Do you deliver across Nigeria?",
    a: "Yes. We deliver across Nigeria. Delivery timelines and fees vary by location and will be confirmed before your order is dispatched.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Available payment options will be confirmed when you place your order. All payments are made securely in Nigerian Naira.",
  },
  {
    q: "Can I return a product?",
    a: "If there is an issue with your product or order, please contact us as soon as possible through WhatsApp so we can assist you.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Our products are made for real skincare routines. If you have sensitive skin or a specific concern, please message us on WhatsApp before purchasing.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Good To Know"
          title="Frequently Asked Questions"
          intro="Quick answers before you order."
        />

        <div className="mt-10 divide-y hairline divide-ochre/15 border-y hairline border-ochre/15">
          {FAQS.map((f, i) => (
            <Reveal key={f.q}>
              <div>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-heading text-lg sm:text-xl text-coffee">
                    {f.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-ochre shrink-0 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open === i && (
                  <p className="pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-up">
                    {f.a}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
