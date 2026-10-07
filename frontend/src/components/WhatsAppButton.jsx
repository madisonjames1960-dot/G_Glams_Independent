import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/siteConfig";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with G_Glams Naturals on WhatsApp"
      className="fixed right-4 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-botanical text-cream shadow-lg shadow-botanical/20 px-4 sm:px-5 h-12 sm:h-14 hover:scale-[1.03] active:scale-95 transition-transform"
      style={{ bottom: "calc(72px + env(safe-area-inset-bottom))" }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-medium tracking-wide">Chat with us</span>
    </a>
  );
}