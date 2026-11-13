import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import TikTokIcon from "@/components/TikTokIcon";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/siteConfig";
import { API_URL } from "@/api/api";

function getInstagramEmbed(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/^\/(p|reel|tv)\/([^/]+)/);

    if (!match || !["instagram.com", "www.instagram.com", "m.instagram.com"].includes(parsed.hostname)) {
      return null;
    }

    return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
  } catch {
    return null;
  }
}

function getTikTokEmbed(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/video\/(\d+)/);

    if (!match || !["tiktok.com", "www.tiktok.com", "m.tiktok.com"].includes(parsed.hostname)) {
      return null;
    }

    return `https://www.tiktok.com/player/v1/${match[1]}`;
  } catch {
    return null;
  }
}

export default function SocialGallery() {
  const [socialLinks, setSocialLinks] = useState({
    instagram_url: "",
    tiktok_url: "",
  });

  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/site-content/social-feed`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load social links.");
        return response.json();
      })
      .then((data) => {
        if (active) setSocialLinks(data);
      })
      .catch(() => {
        if (active) setSocialLinks({ instagram_url: "", tiktok_url: "" });
      });

    return () => {
      active = false;
    };
  }, []);

  const instagramEmbed = getInstagramEmbed(socialLinks.instagram_url);
  const tiktokEmbed = getTikTokEmbed(socialLinks.tiktok_url);

  return (
    <section className="py-16 sm:py-24 bg-sandstone/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="From The Feed"
          title="See G_Glams Naturals on Social"
          intro="Follow us for skincare tips, everyday routines and a look at what we're up to."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 items-start">
          <Reveal>
            <div className="bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-coffee">
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-medium">Instagram</span>
              </div>

              {instagramEmbed ? (
                <iframe
                  title="G_Glams Naturals Instagram post"
                  src={instagramEmbed}
                  className="w-full border-0"
                  height="560"
                  loading="lazy"
                  allow="encrypted-media"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-sandstone/40 p-6 text-center text-sm text-muted-foreground">
                  Add an Instagram post link in Admin to display it here.
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-coffee">
                <TikTokIcon className="w-5 h-5" />
                <span className="text-sm font-medium">TikTok</span>
              </div>

              {tiktokEmbed ? (
                <iframe
                  title="G_Glams Naturals TikTok video"
                  src={tiktokEmbed}
                  className="mx-auto w-full max-w-[340px] border-0"
                  height="620"
                  loading="lazy"
                  allow="fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-sandstone/40 p-6 text-center text-sm text-muted-foreground">
                  Add a TikTok video link in Admin to display it here.
                </div>
              )}
            </div>
          </Reveal>
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
