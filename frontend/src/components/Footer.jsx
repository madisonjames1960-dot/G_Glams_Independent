import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import TikTokIcon from "@/components/TikTokIcon";
import { SITE, waLink } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-coffee text-cream/80 pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-heading text-2xl text-cream">G_GLAMS<span className="text-ochre"> NATURALS</span></p>
          <p className="mt-3 text-sm text-cream/60 leading-relaxed max-w-xs">
            Thoughtfully made Nigerian skincare for healthy-looking, radiant skin.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/70 hover:text-ochre transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-cream/70 hover:text-ochre transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-cream/70 hover:text-ochre transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-luxe uppercase text-cream/50 mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#shop" className="hover:text-ochre transition-colors">Bestsellers</a></li>
            <li><a href="#concerns" className="hover:text-ochre transition-colors">Skin Concerns</a></li>
            <li><a href="#routine" className="hover:text-ochre transition-colors">Build a Routine</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-luxe uppercase text-cream/50 mb-4">Help</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#faq" className="hover:text-ochre transition-colors">FAQ</a></li>
            <li><a href="#about" className="hover:text-ochre transition-colors">About</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ochre transition-colors">Contact</a></li>
            <li><a href="#delivery" className="hover:text-ochre transition-colors">Delivery Information</a></li>
            <li><a href="#faq" className="hover:text-ochre transition-colors">Returns & Refunds</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-luxe uppercase text-cream/50 mb-4">Legal</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-ochre transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-ochre transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} G_Glams Naturals. All rights reserved.</p>
          <p className="text-xs text-cream/40">Made in Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}