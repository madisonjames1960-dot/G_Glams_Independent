import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingBag,
  MessageCircle,
  Star,
  ChevronRight,
  Leaf,
  HandHeart,
  Users,
  Clock,
  ChevronDown,
  Truck,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/format";
import { waLink } from "@/lib/siteConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import PlaceholderImage from "@/components/PlaceholderImage";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

const PRODUCT_FAQS = [
  { q: "How do I use this in my routine?", a: "[INSERT BRAND-VERIFIED USAGE GUIDANCE]" },
  { q: "Can I use this with my other products?", a: "[INSERT ROUTINE COMPATIBILITY GUIDANCE]" },
  { q: "When will I see results?", a: "[INSERT REALISTIC, VERIFIED TIMELINE]" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const list = await base44.entities.Product.filter({ slug }, "-created_date", 1);
        const p = list && list[0];
        if (!active) return;
        setProduct(p || null);
        if (p && (p.skinConcerns || []).length) {
          const all = await base44.entities.Product.list("-created_date", 20);
          if (!active) return;
          setRelated(
            all.filter((x) => x.id !== p.id && (x.skinConcerns || []).some((c) => p.skinConcerns.includes(c))).slice(0, 4)
          );
        }
      } catch {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ochre/30 border-t-ochre rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-heading text-3xl text-coffee">Product not found</p>
        <Link to="/" className="mt-4 text-ochre underline underline-offset-4">Back to shop</Link>
      </div>
    );
  }

  const price = formatNaira(product.price);
  const inStock = product.stock == null || product.stock > 0;

  const addToCart = () => {
    addItem(product, 1);
  };
  const buyNow = () => {
    addItem(product, 1);
    window.location.href = "/checkout";
  };

  const Info = ({ icon: Icon, title, body }) => (
    <div className="border-t hairline border-ochre/15 py-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-ochre" strokeWidth={1.5} />
        <h3 className="text-[11px] tracking-luxe uppercase text-coffee">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen">
      <Navbar hideMobileBar />
      <CartDrawer />

      <div className="pt-20 sm:pt-24 pb-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-ochre">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/#shop" className="hover:text-ochre">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-coffee truncate">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-14">
            <Reveal>
              <PlaceholderImage
                src={product.image}
                label="[UPLOAD REAL PRODUCT IMAGE]"
                aspect="aspect-[4/5]"
                className="shadow-xl shadow-coffee/5"
              />
              <div className="mt-3 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <PlaceholderImage key={i} label="[TEXTURE]" aspect="aspect-square" />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-3">
                {(product.tags || []).map((t) => (
                  <span key={t} className="text-[9px] tracking-[0.16em] uppercase px-2.5 py-1 bg-coffee text-cream">{t}</span>
                ))}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl text-coffee leading-[1.05]">{product.name}</h1>
              {product.benefit && <p className="mt-2 text-lg text-muted-foreground">{product.benefit}</p>}

              <div className="mt-3 flex items-center gap-3">
                {product.rating != null && (
                  <span className="inline-flex items-center gap-1 text-sm text-coffee/70">
                    <Star className="w-4 h-4 fill-ochre text-ochre" />
                    {product.rating}
                    {product.reviewCount ? ` (${product.reviewCount} reviews)` : ""}
                  </span>
                )}
                <span className={`text-xs tracking-wide uppercase ${inStock ? "text-botanical" : "text-destructive"}`}>
                  {inStock ? "● In stock" : "● Out of stock"}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                {price ? (
                  <span className="font-heading text-4xl text-coffee">{price}</span>
                ) : (
                  <span className="text-sm tracking-[0.1em] uppercase text-ochre">Price on enquiry</span>
                )}
              </div>

              {product.description && (
                <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={buyNow}
                  disabled={!inStock}
                  className="w-full h-12 bg-coffee text-cream text-[12px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors disabled:opacity-40"
                >
                  Buy Now
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={addToCart}
                    disabled={!inStock}
                    className="h-11 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[11px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors disabled:opacity-40"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <a
                    href={waLink(`Hi G_Glams Naturals, I'd like to know more about ${product.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[11px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Ask
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-ochre" />
                Nationwide delivery • Pay in ₦
              </div>

              <div className="mt-8">
                <Info icon={Leaf} title="Ingredients" body={product.ingredients || "[INSERT FULL INGREDIENT LIST]"} />
                <Info icon={HandHeart} title="How to use" body={product.howToUse || "[INSERT HOW-TO-USE GUIDANCE]"} />
                <Info icon={Users} title="Who it's for" body={product.whoFor || "[INSERT WHO THIS PRODUCT IS FOR]"} />
                <Info icon={Clock} title="Realistic timeline" body={product.timeline || "[INSERT VERIFIED, REALISTIC RESULTS TIMELINE]"} />
                {product.routine && <Info icon={ShoppingBag} title="Routine compatibility" body={product.routine} />}
              </div>

              <div className="mt-8 border-t hairline border-ochre/15 pt-6">
                <h3 className="font-heading text-2xl text-coffee mb-4">Product FAQ</h3>
                <div className="divide-y hairline divide-ochre/15">
                  {PRODUCT_FAQS.map((f, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="font-medium text-coffee text-sm">{f.q}</span>
                        <ChevronDown className={`w-4 h-4 text-ochre shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-heading text-3xl text-coffee mb-6">You may also like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky add-to-cart bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t hairline border-ochre/15 px-3 py-2.5 flex items-center gap-3" style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}>
        <div className="min-w-0">
          <p className="text-[10px] tracking-wide uppercase text-muted-foreground truncate">{product.name}</p>
          <p className="font-heading text-xl text-coffee leading-none">{price || "On enquiry"}</p>
        </div>
        <button
          onClick={addToCart}
          disabled={!inStock}
          className="flex-1 h-11 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[11px] tracking-[0.14em] uppercase disabled:opacity-40"
        >
          <ShoppingBag className="w-4 h-4" /> Add
        </button>
        <button
          onClick={buyNow}
          disabled={!inStock}
          className="flex-[1.4] h-11 bg-coffee text-cream text-[11px] tracking-[0.14em] uppercase disabled:opacity-40"
        >
          Buy Now
        </button>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}