import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, intro, align = "center", light = false }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignment} ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && (
        <p className={`text-[11px] tracking-luxe uppercase mb-3 ${light ? "text-cream/70" : "text-ochre"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-balance ${light ? "text-cream" : "text-coffee"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? "text-cream/75" : "text-muted-foreground"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
