import { Instagram } from "lucide-react";
import TikTokIcon from "@/components/TikTokIcon";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/siteConfig";

export default function SocialGallery() {
  return (
    <section className="py-16 sm:py-24 bg-sandstone/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="From The Feed"
          title="See G_Glams Naturals on Social"
          intro="Skincare tips, routines and real moments — straight from Instagram and TikTok."
        />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <a
                href={i % 2 === 0 ? SITE.instagram : SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <PlaceholderImage
                  label={i % 2 === 0 ? "[INSTAGRAM POST]" : "[TIKTOK VIDEO]"}
                  aspect="aspect-[4/5]"
                  className="group-hover:opacity-90 transition-opacity"
                />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coffee hover:text-ochre transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm tracking-wide">{SITE.instagramHandle}</span>
          </a>
          <span className="hidden sm:block w-px h-4 bg-ochre/30" />
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coffee hover:text-ochre transition-colors"
          >
            <TikTokIcon className="w-5 h-5" />
            <span className="text-sm tracking-wide">{SITE.tiktokHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}