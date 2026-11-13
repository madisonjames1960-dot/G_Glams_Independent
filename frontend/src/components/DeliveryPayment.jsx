import { Truck, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const BLOCKS = [
  {
    icon: Truck,
    title: "Delivery across Nigeria",
    body: "We deliver across Nigeria. Delivery times and fees depend on your location. We'll confirm them with you before dispatch.",
    meta: "",
  },
  {
    icon: CreditCard,
    title: "Secure payment",
    body: "Pay in Nigerian Naira using the available payment options. We'll confirm the details when you place your order.",
    meta: "",
  },
  {
    icon: ShieldCheck,
    title: "Order confirmation",
    body: "We'll confirm your order by WhatsApp or email. We'll also let you know when it has been dispatched.",
    meta: "Need help with an order? Send us a message on WhatsApp.",
  },
  {
    icon: RefreshCw,
    title: "Returns & refunds",
    body: "Having a problem with your product or order? Please contact us on WhatsApp as soon as possible so we can help.",
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
          intro="Here's what to know about delivery and payment before you shop."
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
