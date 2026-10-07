import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const FALLBACK_PRODUCTS = [
  {
    id: "gentle-gel-cleanser",
    slug: "gentle-gel-cleanser",
    name: "Gentle Gel Cleanser",
    benefit: "A daily cleanser that lifts impurities without leaving skin feeling tight.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["BESTSELLER"],
    skinConcerns: ["Acne & Breakouts", "Oily Skin"],
  },
  {
    id: "brightening-serum",
    slug: "brightening-serum",
    name: "Brightening Serum",
    benefit: "Targets the look of dark spots and uneven tone for a more radiant appearance.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["CUSTOMER FAVORITE"],
    skinConcerns: ["Dark Spots", "Hyperpigmentation", "Uneven Texture"],
  },
  {
    id: "hydrating-moisturizer",
    slug: "hydrating-moisturizer",
    name: "Hydrating Moisturizer",
    benefit: "Restores lasting moisture for soft, comfortable, healthy-looking skin.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["BESTSELLER"],
    skinConcerns: ["Dry Skin", "Uneven Texture"],
  },
  {
    id: "radiance-body-oil",
    slug: "radiance-body-oil",
    name: "Radiance Body Oil",
    benefit: "Nourishes body skin with a luminous, healthy-looking finish.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["NEW"],
    skinConcerns: ["Body Care", "Glow & Radiance"],
  },
  {
    id: "clarifying-clay-mask",
    slug: "clarifying-clay-mask",
    name: "Clarifying Clay Mask",
    benefit: "A weekly mask to help refine the look of pores and balance oily areas.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: [],
    skinConcerns: ["Acne & Breakouts", "Oily Skin"],
  },
  {
    id: "daily-sunscreen",
    slug: "daily-sunscreen",
    name: "Daily Sunscreen",
    benefit: "Everyday sun protection to help defend against visible signs of sun damage.",
    price: null,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["BESTSELLER"],
    skinConcerns: ["Dark Spots", "Hyperpigmentation", "Glow & Radiance"],
  },
];

export default function Bestsellers({ activeConcern }) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await base44.entities.Product.list("-created_date", 12);

        if (active && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch {
        if (active) setProducts(FALLBACK_PRODUCTS);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const filtered = activeConcern
    ? products.filter((p) => (p.skinConcerns || []).includes(activeConcern))
    : products;

  return (
    <section id="shop" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Most Loved"
          title="Shop Bestsellers"
          intro={
            activeConcern
              ? `Showing products for ${activeConcern}`
              : "A focused edit of skincare made for real routines."
          }
        />

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-sandstone/40 aspect-[4/5] animate-pulse"
              />
            ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-sm text-muted-foreground">
                Products are being prepared.{" "}
                <a
                  href="#concerns"
                  className="text-ochre underline underline-offset-4"
                >
                  Browse by skin concern
                </a>{" "}
                or contact us to choose the right product for you.
              </p>
            </div>
          )}

          {!loading &&
            filtered.map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} />
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
