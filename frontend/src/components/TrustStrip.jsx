import { Check } from "lucide-react";

const ITEMS = [
  "Made for real skincare routines",
  "Quality-focused formulations",
  "Nigerian skincare brand",
  "Nationwide delivery",
];

export default function TrustStrip() {
  return (
    <section className="border-y hairline border-ochre/15 bg-sandstone/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 justify-center md:justify-start">
              <Check className="w-4 h-4 text-botanical shrink-0" />
              <span className="text-[11px] sm:text-xs tracking-[0.08em] uppercase text-coffee/80 text-center md:text-left">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
