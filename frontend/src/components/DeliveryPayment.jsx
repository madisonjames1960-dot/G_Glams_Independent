import { Truck, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const BLOCKS = [
  {
    icon: Truck,
    title: "Delivery across Nigeria",
    body: "We deliver across Nigeria. Delivery timelines and fees vary by location and will be confirmed before your order is dispatched.",
    meta: "",
  },
  {
    icon: CreditCard,
    title: "Secure payment",
    body: "Pay securely in Nigerian Naira. Available payment options will be confirmed when you place your order.",
    meta: "",
  },
  {
    icon: ShieldCheck,
    title: "Order confirmation",
    body: "You'll receive a confirmation by WhatsApp or email once your order is placed and again when it's dispatched.",
    meta: "Need help with an order? Message us on WhatsApp.",
  },
  {
    icon: RefreshCw,
    title: "Returns & refunds",
    body: "If there is an issue with your product or order, please contact us as soon as possible through WhatsApp so we can assist you.",
    meta: "",
  },
];

export default function DeliveryPayment() {
  return (
    <section className="py-16 sm:py-24 bg-sandstone/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Before You Order"
          title="Delivery & Payment"
          intro="Everything you need to order with confidence — in Naira."
        />
        <div className="mt-10 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="bg-cream border hairline border-ochre/15 p-6 sm:p-8 h-full">
                <b.icon className="w-7 h-7 text-ochre mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl text-coffee mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                {b.meta && (
                  <p className="mt-3 text-xs text-coffee/70 border-t hairline border-ochre/15 pt-3">
                    {b.meta}
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
