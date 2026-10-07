import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/format";
import { waLink } from "@/lib/siteConfig";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, hasPriced, count } = useCart();

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-coffee/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b hairline border-ochre/15">
          <h2 className="font-heading text-xl text-coffee">Your Cart {count > 0 && `(${count})`}</h2>
          <button onClick={closeCart} aria-label="Close cart" className="w-10 h-10 flex items-center justify-center text-coffee">
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="w-10 h-10 text-ochre/40 mb-4" strokeWidth={1.5} />
            <p className="text-coffee font-heading text-xl">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">Let's find something for your skin.</p>
            <button
              onClick={closeCart}
              className="mt-6 inline-flex items-center bg-coffee text-cream h-11 px-6 text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors"
            >
              Shop Skincare
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <Link to={`/product/${i.slug}`} onClick={closeCart} className="shrink-0">
                    <PlaceholderImage src={i.image} label="" aspect="aspect-square w-20" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${i.slug}`} onClick={closeCart} className="font-heading text-base text-coffee leading-tight hover:text-ochre">
                      {i.name}
                    </Link>
                    {i.price != null && !Number.isNaN(Number(i.price)) ? (
                      <p className="text-sm text-muted-foreground mt-0.5">{formatNaira(i.price)}</p>
                    ) : (
                      <p className="text-xs text-ochre mt-0.5 tracking-wide uppercase">Price on enquiry</p>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center border hairline border-ochre/30">
                        <button onClick={() => updateQty(i.id, i.qty - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center text-coffee hover:bg-sandstone">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm text-coffee">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, i.qty + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center text-coffee hover:bg-sandstone">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(i.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t hairline border-ochre/15 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-2xl text-coffee">
                  {hasPriced ? formatNaira(total) : "On enquiry"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {hasPriced ? "Delivery calculated at checkout." : "Final pricing confirmed with our team before payment."}
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full h-12 inline-flex items-center justify-center bg-coffee text-cream text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors"
              >
                Checkout
              </Link>
              <a
                href={waLink(`Hi G_Glams Naturals, I'd like to order: ${items.map((i) => `${i.qty}x ${i.name}`).join(", ")}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[12px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}