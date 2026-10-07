import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/format";
import { waLink } from "@/lib/siteConfig";

const TAG_STYLES = {
  BESTSELLER: "bg-coffee text-cream",
  NEW: "bg-botanical text-cream",
  "CUSTOMER FAVORITE": "bg-ochre text-cream",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const price = formatNaira(product.price);
  const tags = (product.tags || []).slice(0, 1);

  const buyNow = (e) => {
    e.preventDefault();
    addItem(product, 1);
    navigate("/checkout");
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col bg-cream border hairline border-ochre/15 hover:border-ochre/40 transition-colors"
    >
      <div className="relative">
        <PlaceholderImage
          src={product.image}
          label="[UPLOAD REAL PRODUCT IMAGE]"
          aspect="aspect-[4/5]"
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {tags.length > 0 && (
          <span className={`absolute top-3 left-3 text-[9px] tracking-[0.16em] uppercase px-2.5 py-1 ${TAG_STYLES[tags[0]] || "bg-coffee text-cream"}`}>
            {tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-col p-4 sm:p-5 flex-1">
        <h3 className="font-heading text-xl sm:text-2xl text-coffee leading-tight">{product.name}</h3>
        {product.benefit && (
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.benefit}</p>
        )}

        <div className="mt-2 flex items-center gap-2">
          {product.rating != null && (
            <span className="inline-flex items-center gap-1 text-xs text-coffee/70">
              <Star className="w-3.5 h-3.5 fill-ochre text-ochre" />
              {product.rating}
              {product.reviewCount ? ` (${product.reviewCount})` : ""}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          {price ? (
            <span className="font-heading text-2xl text-coffee">{price}</span>
          ) : (
            <span className="text-sm tracking-[0.1em] uppercase text-ochre">Price on enquiry</span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={addToCart}
            className="w-full h-11 inline-flex items-center justify-center gap-2 bg-coffee text-cream text-[11px] tracking-[0.14em] uppercase hover:bg-ochre transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={buyNow}
              className="h-10 border hairline border-ochre/40 text-coffee text-[11px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
            >
              Buy Now
            </button>
            <a
              href={waLink(`Hi G_Glams Naturals, I'm interested in ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="h-10 inline-flex items-center justify-center border hairline border-ochre/40 text-coffee text-[11px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
            >
              Ask
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
