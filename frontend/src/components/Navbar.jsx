import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { waLink, SITE } from "@/lib/siteConfig";

const LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Skin Concerns", href: "#concerns" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ hideMobileBar = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goShop = () => {
    setOpen(false);
    navigate("/#shop");
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-cream/90 backdrop-blur-md border-b hairline border-ochre/15" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg sm:text-2xl tracking-wide text-coffee leading-none">
            G_GLAMS<span className="text-ochre"> NATURALS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] tracking-[0.14em] uppercase text-coffee/80 hover:text-ochre transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-coffee/70 hover:text-ochre transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative inline-flex items-center justify-center w-10 h-10 text-coffee hover:text-ochre transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-ochre text-cream text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={goShop}
              className="hidden sm:inline-flex items-center bg-coffee text-cream text-[12px] tracking-[0.14em] uppercase px-5 h-10 hover:bg-ochre transition-colors"
            >
              Shop Now
            </button>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-coffee"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-coffee/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-cream shadow-2xl flex flex-col animate-fade-up">
            <div className="flex items-center justify-between px-5 h-16 border-b hairline border-ochre/15">
              <span className="font-heading text-xl text-coffee">Menu</span>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center text-coffee"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col p-5 gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-sm tracking-[0.14em] uppercase text-coffee/85 border-b hairline border-ochre/10"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="mt-auto p-5 flex flex-col gap-3">
              <button
                onClick={goShop}
                className="w-full h-12 bg-coffee text-cream text-[12px] tracking-[0.14em] uppercase"
              >
                Shop Now
              </button>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[12px] tracking-[0.14em] uppercase"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {!hideMobileBar && (
        <div
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t hairline border-ochre/15 px-3 flex items-center gap-2 h-[60px]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 inline-flex items-center justify-center gap-2 border hairline border-ochre/40 text-coffee text-[12px] tracking-[0.12em] uppercase"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>

          <button
            onClick={goShop}
            className="flex-[1.4] h-11 bg-coffee text-cream text-[12px] tracking-[0.12em] uppercase"
          >
            Shop Now
          </button>
        </div>
      )}
    </>
  );
}
