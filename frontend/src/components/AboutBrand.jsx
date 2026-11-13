import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { API_URL } from "@/api/api";

export default function AboutBrand() {
  const [aboutImage, setAboutImage] = useState("");

  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/site-content/about-image`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load brand image.");
        return response.json();
      })
      .then((data) => {
        if (active) setAboutImage(data.image_url || "");
      })
      .catch(() => {
        if (active) setAboutImage("");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <PlaceholderImage
            src={aboutImage}
            label="[UPLOAD REAL BRAND / FOUNDER IMAGE]"
            aspect="aspect-[4/5]"
            className="shadow-xl shadow-coffee/5"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[11px] tracking-luxe uppercase text-ochre mb-3">Our Story</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-coffee leading-[1.1] text-balance">
            Nigerian-owned skincare, made with care.
          </h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              G_Glams Naturals is a Nigerian skincare brand built on a simple belief: good skincare should fit into everyday life and be within reach.
            </p>
            <p>
              We care about the quality of our products and the people who use them. We want you to understand what goes on your skin and how to use each product as part of a routine that suits you.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-6">
            {[
              ["Nigerian-owned", "Proudly made for Nigerian skin"],
              ["Quality-first", "Thoughtful, considered formulations"],
              ["Customer care", "We're here to help with your routine"],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-ochre pl-3">
                <p className="font-heading text-lg text-coffee">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
