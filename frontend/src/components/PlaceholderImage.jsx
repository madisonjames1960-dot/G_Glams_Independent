import { Image } from "@/components/ui/image";
import { API_URL } from "@/api/api";

export default function PlaceholderImage({
  src,
  label = "[UPLOAD REAL IMAGE]",
  aspect = "aspect-[4/5]",
  className = "",
  fittingType = "fill",
}) {
  const imageSrc = src
    ? src.startsWith("http")
      ? src
      : `${API_URL}${src}`
    : null;

  if (imageSrc) {
    return (
      <div className={`relative w-full overflow-hidden ${aspect} ${className}`}>
        <Image
          src={imageSrc}
          alt={label}
          className="w-full h-full object-cover"
          fittingType={fittingType}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-sandstone flex items-center justify-center ${aspect} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #8C6239 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />
      <span className="relative text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ochre/80 text-center px-5 font-medium leading-relaxed">
        {label}
      </span>
    </div>
  );
}
