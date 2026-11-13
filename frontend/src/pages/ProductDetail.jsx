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
import { FALLBACK_PRODUCTS, normalizeProduct } from "@/components/Bestsellers";
import Reveal from "@/components/Reveal";


function getProductFaqs(product) {
  const faqs = {
    "gentle-gel-cleanser": [
      {
        q: "What makes the Hydrating Gentle Cleanser special?",
        a: "It contains ceramides, sodium hyaluronate, aloe vera and green tea extract. It is designed to cleanse without leaving the skin feeling tight.",
      },
      {
        q: "Is it suitable for all skin types?",
        a: "Yes. The Hydrating Gentle Cleanser is suitable for all skin types.",
      },
      {
        q: "What sizes are available?",
        a: "The cleanser is available in 100ml and 50ml sizes. The 100ml size is our featured option.",
      },
      {
        q: "How should I use the cleanser?",
        a: "Follow the usage directions on the product packaging. If you need help fitting it into your skincare routine, contact us on WhatsApp.",
      },
    ],
    "brightening-serum": [
      {
        q: "What are the key ingredients?",
        a: "C-Bright Vitamin C Serum contains 3-O-Ethyl Ascorbic Acid, Ferulic Acid and Sodium Hyaluronate.",
      },
      {
        q: "What does this serum help with?",
        a: "It is an antioxidant serum designed to help improve the appearance of dullness and uneven skin tone.",
      },
      {
        q: "What sizes are available?",
        a: "It is available in 15ml for ?6,600 and 30ml for ?13,200. Select your preferred size before adding it to your cart.",
      },
      {
        q: "How should I use it?",
        a: "Follow the directions on the product packaging. Contact us on WhatsApp if you would like help fitting it into your routine.",
      },
    ],
    "hydrating-moisturizer": [
      {
        q: "What are the key ingredients?",
        a: "The Ceramide Barrier Repair Essence contains ceramides, sodium hyaluronate and snail filtrate.",
      },
      {
        q: "What does this essence do?",
        a: "It helps support the skin's moisture barrier and maintain comfortable hydration.",
      },
      {
        q: "Who may find it useful?",
        a: "It is intended for people looking to support their skin's moisture barrier. Contact us if you need help choosing products for your skin.",
      },
      {
        q: "How should I use it in my routine?",
        a: "Follow the directions on the product packaging. You can contact us on WhatsApp for routine guidance.",
      },
    ],
    "clarifying-clay-mask": [
      {
        q: "What are the key ingredients?",
        a: "The 2% BHA Pore Clarifying Toner contains 2% Salicylic Acid, Witch Hazel and Willow Bark Extract.",
      },
      {
        q: "What does 2% BHA help with?",
        a: "Salicylic Acid is a beta hydroxy acid that helps address pore buildup and the appearance of uneven skin texture.",
      },
      {
        q: "Who is this toner intended for?",
        a: "It is particularly suited to oily and blemish-prone skin. If you are unsure whether it suits your skin, contact us before ordering.",
      },
      {
        q: "How often should I use it?",
        a: "Follow the usage directions on the product packaging. Avoid using it more often than directed, and contact us if you need routine guidance.",
      },
    ],
    "daily-sunscreen": [
      {
        q: "What are the key ingredients?",
        a: "Radiance Nourishing Body Butter contains beta glucan, vitamin E, almond butter and hyaluronic acid.",
      },
      {
        q: "What does this body butter do?",
        a: "It is a rich moisturiser that helps soften dry skin and maintain lasting hydration.",
      },
      {
        q: "How should I use it?",
        a: "Apply according to the directions on the product packaging. Contact us on WhatsApp if you need help.",
      },
      {
        q: "Is it suitable for my skin?",
        a: "It is designed to moisturise and soften dry skin. If you have a particular skin concern, contact us before ordering.",
      },
    ],
    "radiance-body-oil": [
      {
        q: "What are the key ingredients?",
        a: "It contains olive squalene, lemon bioferment, rosehip oil, kojic acid, evening primrose oil, and vitamins E and D.",
      },
      {
        q: "What does this body oil do?",
        a: "It nourishes and moisturises the skin while enhancing its natural-looking radiance.",
      },
      {
        q: "What sizes are available?",
        a: "It is available in 50ml for ?8,000 and 100ml for ?16,000. Select your preferred size before adding it to your cart.",
      },
      {
        q: "How should I use it?",
        a: "Follow the directions on the product packaging. Contact us on WhatsApp if you would like help with your body-care routine.",
      },
    ],
  };

  return faqs[product?.slug] || [
    {
      q: "How should I use this product?",
      a: "Follow the directions provided on the product packaging. Contact us on WhatsApp if you need help with your routine.",
    },
    {
      q: "Is this product suitable for my skin?",
      a: "Check the product information on this page. If you have sensitive skin or a particular skin concern, contact us before ordering.",
    },
  ];
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(-1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const list = await base44.entities.Product.filter({ slug }, "-created_date", 1);
        const p = (Array.isArray(list) && list[0]) || FALLBACK_PRODUCTS.find((item) => item.slug === slug);
        if (!active) return;
        const normalized = normalizeProduct(p) || null;
        setProduct(normalized);
        setSelectedVariant(normalized?.variants?.[0] || null);
        if (p && (p.skinConcerns || []).length) {
          const all = await base44.entities.Product.list("-created_date", 20);
          if (!active) return;
          setRelated(
            all.filter((x) => x.id !== p.id && (x.skinConcerns || []).some((c) => p.skinConcerns.includes(c))).slice(0, 4)
          );
        }
      } catch {
        if (active) {
          const fallback = normalizeProduct(FALLBACK_PRODUCTS.find((item) => item.slug === slug)) || null;
          setProduct(fallback);
          setSelectedVariant(fallback?.variants?.[0] || null);
        }
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

  const currentPrice = selectedVariant?.price ?? product.price;
  const price = formatNaira(currentPrice);
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const inStock = product.stock == null || product.stock > 0;

  const addToCart = () => {
    addItem(product, 1, selectedVariant);
  };
  const buyNow = () => {
    addItem(product, 1, selectedVariant);
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
              {hasVariants && (
                <div className="mt-5">
                  <label htmlFor="product-size" className="block text-xs tracking-[0.12em] uppercase text-coffee mb-2">
                    Choose size
                  </label>
                  <select
                    id="product-size"
                    value={selectedVariant?.id || ""}
                    onChange={(e) => setSelectedVariant(product.variants.find((v) => v.id === e.target.value) || null)}
                    className="w-full h-12 px-4 bg-cream border hairline border-ochre/30 text-coffee outline-none focus:border-ochre"
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.label} ? {formatNaira(variant.price)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
                {product.ingredients && <Info icon={Leaf} title="Ingredients" body={product.ingredients} />}
                {product.howToUse && <Info icon={HandHeart} title="How to use" body={product.howToUse} />}
                {product.whoFor && <Info icon={Users} title="Who it's for" body={product.whoFor} />}
                {product.timeline && <Info icon={Clock} title="Realistic timeline" body={product.timeline} />}
                {product.routine && <Info icon={ShoppingBag} title="Routine compatibility" body={product.routine} />}
              </div>

              <div className="mt-8 border-t hairline border-ochre/15 pt-6">
                <h3 className="font-heading text-2xl text-coffee mb-4">Product FAQ</h3>
                <div className="divide-y hairline divide-ochre/15">
                  {getProductFaqs(product).map((f, i) => (
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
          {selectedVariant?.label && <p className="text-[10px] text-muted-foreground">{selectedVariant.label}</p>}
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