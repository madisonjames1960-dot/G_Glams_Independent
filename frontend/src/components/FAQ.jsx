import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "How do I know which product is right for my skin?",
    a: "Try our 'Build Your Skincare Routine' tool, browse products by skin concern, or send us a message on WhatsApp. We'll be happy to help you choose based on your skin type and needs.",
  },
  {
    q: "How long before I see results?",
    a: "This depends on your skin and the product you're using. Follow the directions and give your routine time. Visible changes don't happen overnight, and results can vary from person to person.",
  },
  {
    q: "Do you deliver across Nigeria?",
    a: "Yes, we deliver across Nigeria. Delivery times and fees depend on your location. We'll confirm them with you before dispatch.",
  },
  {
    q: "What payment methods do you accept?",
    a: "You can select Card or Bank Transfer at checkout. Online card processing will be available once the payment service is activated. For bank transfer, we'll share the account details with you on WhatsApp. All payments are made in Nigerian Naira.",
  },
  {
    q: "Can I return a product?",
    a: "If something is wrong with your product or order, please contact us on WhatsApp as soon as possible so we can help.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "If your skin is sensitive or you have a particular skin concern, please speak with us on WhatsApp before ordering. We can help you check whether a product may be suitable for you.",
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
          intro="A few things you may want to know before ordering."
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
