import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const FALLBACK_PRODUCTS = [
  {
    id: "gentle-gel-cleanser",
    slug: "gentle-gel-cleanser",
    name: "Hydrating Gentle Cleanser (100ml)",
    benefit: "A hydrating, non-stripping daily cleanser suitable for all skin types.",
    description: "Made with ceramides, sodium hyaluronate, aloe vera and green tea extract.",
    ingredients: "Ceramides, sodium hyaluronate, aloe vera and green tea extract.",
    whoFor: "Suitable for all skin types.",
    price: 6500,
    variants: [
      { id: "50ml", label: "50ml", price: 6500 },
      { id: "100ml", label: "100ml", price: 13200 },
    ],
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["FEATURED"],
    skinConcerns: ["Acne & Breakouts", "Oily Skin"],
  },
  {
    id: "brightening-serum",
    slug: "brightening-serum",
    name: "C-Bright Vitamin C Serum",
    benefit: "An antioxidant serum that helps improve the look of dullness and uneven skin tone.",
    description: "Formulated with 3-O-Ethyl Ascorbic Acid, Ferulic Acid and Sodium Hyaluronate.",
    ingredients: "3-O-Ethyl Ascorbic Acid, Ferulic Acid and Sodium Hyaluronate.",
    whoFor: "For anyone looking to care for dull-looking skin and uneven tone.",
    price: 6600,
    variants: [
      { id: "15ml", label: "15ml", price: 6600 },
      { id: "30ml", label: "30ml", price: 13200 },
    ],
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["CUSTOMER FAVORITE"],
    skinConcerns: ["Dark Spots", "Hyperpigmentation", "Uneven Texture", "Glow & Radiance"],
  },
  {
    id: "hydrating-moisturizer",
    slug: "hydrating-moisturizer",
    name: "Ceramide Barrier Repair Essence",
    benefit: "Helps support the skin's moisture barrier and maintain comfortable hydration.",
    description: "Made with ceramides, sodium hyaluronate and snail filtrate.",
    ingredients: "Ceramides, Sodium Hyaluronate and Snail Filtrate.",
    whoFor: "For those looking to support their skin's moisture barrier.",
    price: 14000,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["BESTSELLER"],
    skinConcerns: ["Dry Skin", "Uneven Texture"],
  },
  {
    id: "radiance-body-oil",
    slug: "radiance-body-oil",
    name: "Radiance Boost Body Oil",
    benefit: "Nourishes and moisturises the skin while enhancing its natural-looking radiance.",
    description: "A nourishing body oil formulated with olive squalene, lemon bioferment, rosehip oil, kojic acid, evening primrose oil, and vitamins E and D.",
    ingredients: "Olive Squalene, Lemon Bioferment, Rosehip Oil, Kojic Acid, Evening Primrose Oil, Vitamins E and D.",
    whoFor: "For body skin that needs nourishment and moisture.",
    price: 8000,
    variants: [
      { id: "50ml", label: "50ml", price: 8000 },
      { id: "100ml", label: "100ml", price: 16000 },
    ],
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["NEW"],
    skinConcerns: ["Body Care", "Glow & Radiance"],
  },
  {
    id: "clarifying-clay-mask",
    slug: "clarifying-clay-mask",
    name: "2% BHA Pore Clarifying Toner",
    benefit: "Helps address pore buildup and the appearance of uneven skin texture.",
    description: "Formulated with 2% Salicylic Acid, Witch Hazel and Willow Bark Extract.",
    ingredients: "2% Salicylic Acid, Witch Hazel and Willow Bark Extract.",
    whoFor: "Particularly suited to oily and blemish-prone skin.",
    price: 13500,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: [],
    skinConcerns: ["Acne & Breakouts", "Oily Skin", "Uneven Texture"],
  },
  {
    id: "daily-sunscreen",
    slug: "daily-sunscreen",
    name: "Radiance Nourishing Body Butter",
    benefit: "A rich moisturising body butter that helps soften dry skin and maintain lasting hydration.",
    description: "Made with beta glucan, vitamin E, almond butter and hyaluronic acid.",
    ingredients: "Beta Glucan, Vitamin E, Almond Butter and Hyaluronic Acid.",
    whoFor: "For skin that needs rich, lasting moisture.",
    price: 25000,
    image: null,
    rating: null,
    reviewCount: 0,
    tags: ["BESTSELLER"],
    skinConcerns: ["Dry Skin", "Body Care"],
  },
];

const CATALOGUE = {
  "brightening-serum": FALLBACK_PRODUCTS[1],
  "hydrating-moisturizer": FALLBACK_PRODUCTS[2],
  "radiance-body-oil": FALLBACK_PRODUCTS[3],
  "clarifying-clay-mask": FALLBACK_PRODUCTS[4],
  "daily-sunscreen": FALLBACK_PRODUCTS[5],
};

export function normalizeProduct(product) {
  if (!product) return product;

  // Keep the existing featured cleanser normalization unchanged.
  if (product.slug === "gentle-gel-cleanser") {
    return {
      ...product,
      name: "Hydrating Gentle Cleanser (100ml)",
      benefit: "A hydrating, non-stripping daily cleanser suitable for all skin types.",
      description: product.description || "Made with ceramides, sodium hyaluronate, aloe vera and green tea extract.",
      ingredients: product.ingredients || "Ceramides, sodium hyaluronate, aloe vera and green tea extract.",
      whoFor: product.whoFor || "Suitable for all skin types.",
      price: 6500,
      variants: [
        { id: "50ml", label: "50ml", price: 6500 },
        { id: "100ml", label: "100ml", price: 13200 },
      ],
      tags: ["FEATURED"],
    };
  }

  const catalogueProduct = CATALOGUE[product.slug];
  if (!catalogueProduct) return product;

  return {
    ...product,
    ...catalogueProduct,
    id: product.id ?? catalogueProduct.id,
    slug: product.slug,
    image: product.image || catalogueProduct.image,
    rating: product.rating ?? catalogueProduct.rating,
    reviewCount: product.reviewCount ?? catalogueProduct.reviewCount,
  };
}

export default function Bestsellers({ activeConcern }) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS.map(normalizeProduct));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await base44.entities.Product.list("-created_date", 12);

        if (active && Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeProduct);
          const foundSlugs = new Set(normalized.map((p) => p.slug));
          const missing = FALLBACK_PRODUCTS
            .filter((p) => !foundSlugs.has(p.slug))
            .map(normalizeProduct);

          setProducts(
            [...normalized, ...missing].sort((a, b) =>
              Number((b.tags || []).includes("FEATURED")) -
              Number((a.tags || []).includes("FEATURED"))
            )
          );
        }
      } catch {
        if (active) setProducts(FALLBACK_PRODUCTS.map(normalizeProduct));
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
              <div key={i} className="bg-sandstone/40 aspect-[4/5] animate-pulse" />
            ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-sm text-muted-foreground">
                Products are being prepared.{" "}
                <a href="#concerns" className="text-ochre underline underline-offset-4">
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
