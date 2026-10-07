import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, MessageCircle, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/format";
import { waLink } from "@/lib/siteConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import PlaceholderImage from "@/components/PlaceholderImage";

const PAYMENTS = [
  { id: "card", label: "Card (Paystack / Flutterwave)", note: "Pay securely online — integration ready to activate." },
  { id: "transfer", label: "Bank Transfer", note: "We'll send account details on WhatsApp." },
  { id: "cod", label: "Cash on Delivery", note: "Pay when your order arrives (select areas)." },
];

export default function Checkout() {
  const { items, total, hasPriced, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", payment: "card" });
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    const orderPayload = {
      items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total: hasPriced ? total : null,
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      address: `${form.address}, ${form.city}`.trim(),
      paymentMethod: PAYMENTS.find((p) => p.id === form.payment)?.label || form.payment,
      status: "pending",
    };
    try {
      await base44.entities.Order.create(orderPayload);
    } catch {
      // proceed to confirmation even if record save fails — WhatsApp still works
    }
    const summary = items.map((i) => `- ${i.qty}x ${i.name}${i.price != null ? ` — ${formatNaira(i.price)}` : ""}`).join("\n");
    const waMsg = `Hi G_Glams Naturals, I'd like to place an order:\n\n${summary}\n\nTotal: ${hasPriced ? formatNaira(total) : "to be confirmed"}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${orderPayload.address}\nPayment: ${orderPayload.paymentMethod}`;
    window.open(waLink(waMsg), "_blank", "noopener,noreferrer");
    setDone(true);
    clear();
    setPlacing(false);
  };

  if (done) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 className="w-14 h-14 text-botanical mb-4" strokeWidth={1.5} />
        <h1 className="font-heading text-4xl text-coffee">Order received</h1>
        <p className="mt-3 text-muted-foreground max-w-md">
          Thank you, {form.name || "there"}. We've opened WhatsApp with your order details — just hit send and our team will confirm your order, total and delivery.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link to="/" className="h-12 inline-flex items-center justify-center bg-coffee text-cream px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors">
            Continue Shopping
          </Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="h-12 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee px-7 text-[12px] tracking-[0.14em] uppercase">
            <MessageCircle className="w-4 h-4" /> Open WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl text-coffee">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a product before checking out.</p>
        <Link to="/#shop" className="mt-6 h-12 inline-flex items-center bg-coffee text-cream px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors">
          Shop Skincare
        </Link>
      </div>
    );
  }

  const inputCls = "w-full h-12 px-4 bg-cream border hairline border-ochre/25 focus:border-ochre outline-none text-coffee placeholder:text-muted-foreground/60";

  return (
    <div className="bg-cream min-h-screen">
      <Navbar hideMobileBar />
      <CartDrawer />

      <div className="pt-20 sm:pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link to="/#shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ochre mb-6">
            <ArrowLeft className="w-4 h-4" /> Continue shopping
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl text-coffee mb-8">Checkout</h1>

          <form onSubmit={placeOrder} className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="font-heading text-2xl text-coffee mb-4">Delivery details</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required placeholder="Full name" value={form.name} onChange={set("name")} className={inputCls} />
                  <input required placeholder="Phone number" value={form.phone} onChange={set("phone")} className={inputCls} />
                </div>
                <input type="email" placeholder="Email (optional)" value={form.email} onChange={set("email")} className={`${inputCls} mt-3`} />
                <textarea required placeholder="Delivery address" value={form.address} onChange={set("address")} rows={3} className={`${inputCls} mt-3 h-auto py-3 resize-none`} />
                <input required placeholder="City / State" value={form.city} onChange={set("city")} className={`${inputCls} mt-3`} />
              </div>

              <div>
                <h2 className="font-heading text-2xl text-coffee mb-4">Payment method</h2>
                <div className="space-y-2.5">
                  {PAYMENTS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-start gap-3 p-4 border hairline cursor-pointer transition-colors ${
                        form.payment === p.id ? "border-ochre bg-sandstone/50" : "border-ochre/20 hover:border-ochre/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={form.payment === p.id}
                        onChange={() => setForm((f) => ({ ...f, payment: p.id }))}
                        className="mt-1 accent-ochre"
                      />
                      <span>
                        <span className="block font-medium text-coffee text-sm">{p.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{p.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-botanical" /> Your details are only used to process this order.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="bg-sandstone/40 border hairline border-ochre/15 p-5 lg:sticky lg:top-24">
                <h2 className="font-heading text-2xl text-coffee mb-4">Your order</h2>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {items.map((i) => (
                    <div key={i.id} className="flex gap-3">
                      <PlaceholderImage src={i.image} label="" aspect="aspect-square w-14" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-coffee leading-tight truncate">{i.name}</p>
                        <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                      </div>
                      <p className="text-sm text-coffee whitespace-nowrap">
                        {i.price != null && !Number.isNaN(Number(i.price)) ? formatNaira(Number(i.price) * i.qty) : "—"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t hairline border-ochre/20 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-heading text-2xl text-coffee">{hasPriced ? formatNaira(total) : "On enquiry"}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Delivery fee confirmed with your order.</p>
                <button
                  type="submit"
                  disabled={placing}
                  className="mt-5 w-full h-12 bg-coffee text-cream text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors disabled:opacity-50"
                >
                  {placing ? "Placing order…" : "Place Order"}
                </button>
                <p className="mt-3 text-xs text-center text-muted-foreground">
                  Your order will be sent to us on WhatsApp for quick confirmation.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}