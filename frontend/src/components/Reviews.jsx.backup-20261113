import { useEffect, useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { waLink } from "@/lib/siteConfig";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await base44.entities.Review.list("-created_date", 8);
        if (active) setReviews(data);
      } catch {
        /* empty state */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section id="reviews" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Social Proof"
          title="Real People. Real Routines."
          intro="Honest words from people who use G_Glams Naturals in their everyday skincare."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-sandstone/40 h-64 animate-pulse" />
            ))}

          {!loading && reviews.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <Reveal key={i}>
                <div className="bg-cream border hairline border-ochre/15 p-6 h-full flex flex-col">
                  <PlaceholderImage label="[UPLOAD REAL CUSTOMER PHOTO]" aspect="aspect-[4/3]" />
                  <div className="mt-4 flex-1 flex flex-col items-center justify-center text-center py-6">
                    <p className="text-sm text-muted-foreground italic">[REAL CUSTOMER REVIEW WILL APPEAR HERE]</p>
                  </div>
                </div>
              </Reveal>
            ))}

          {!loading &&
            reviews.map((r) => (
              <Reveal key={r.id}>
                <figure className="bg-cream border hairline border-ochre/15 p-6 h-full flex flex-col">
                  {r.photo ? (
                    <PlaceholderImage src={r.photo} label={r.name} aspect="aspect-[4/3]" />
                  ) : (
                    <PlaceholderImage label="[UPLOAD REAL CUSTOMER PHOTO]" aspect="aspect-[4/3]" />
                  )}
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (r.rating || 5) ? "fill-ochre text-ochre" : "text-ochre/30"}`} />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm text-coffee/85 leading-relaxed flex-1">"{r.review}"</blockquote>
                  <figcaption className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-coffee">{r.name}</span>
                    {r.productName && <> · {r.productName}</>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">Used our products? We'd love to hear about your routine.</p>
          <a
            href={waLink("Hi G_Glams Naturals, I'd like to share my experience with your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border hairline border-ochre/40 text-coffee h-12 px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
}