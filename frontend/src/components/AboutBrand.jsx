import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";

export default function AboutBrand() {
  return (
    <section id="about" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <PlaceholderImage
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
              G_Glams Naturals is a Nigerian skincare brand built on a simple belief: healthy-looking, radiant skin should be
              within reach for real people, with real routines.
            </p>
            <p>
              We focus on quality, thoughtful formulations and genuine customer care — helping you understand what you're putting
              on your skin and why, so you can build a routine that lasts.
            </p>
            <p className="text-coffee/70 italic">
              
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-6">
            {[
              ["Nigerian-owned", "Proudly made for Nigerian skin"],
              ["Quality-first", "Thoughtful, considered formulations"],
              ["Customer care", "We help you build a routine that works"],
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