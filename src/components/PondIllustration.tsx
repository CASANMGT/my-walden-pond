type Variant = "circle" | "banner" | "mini";

type Props = {
  variant?: Variant;
  className?: string;
};

export function PondIllustration({ variant = "banner", className = "" }: Props) {
  const isCircle = variant === "circle";
  const isMini = variant === "mini";

  const height = isCircle ? "h-52 w-52" : isMini ? "h-20 w-full" : "h-40 w-full";
  const rounded = isCircle ? "rounded-full" : "rounded-2xl";

  return (
    <div
      className={`watercolor-hero relative overflow-hidden ${rounded} ${height} ${className}`}
      aria-hidden
    >
      {/* Mist layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#c5d5cc]/30" />

      {/* Sun */}
      <div
        className={`absolute rounded-full bg-gradient-to-br from-sunlight to-[#e8c078] ${
          isCircle ? "right-8 top-6 h-10 w-10" : isMini ? "right-4 top-2 h-5 w-5" : "right-10 top-5 h-9 w-9"
        }`}
        style={{ boxShadow: "0 0 24px rgba(214,162,74,0.4)" }}
      />

      {/* Distant hills */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        style={{ height: isMini ? "60%" : "55%" }}
      >
        <path
          d="M0,120 L0,80 Q50,60 100,75 T200,65 T300,78 T400,70 L400,120 Z"
          fill="rgba(85,117,100,0.15)"
        />
        <path
          d="M0,120 L0,95 Q80,75 160,88 T320,82 T400,90 L400,120 Z"
          fill="rgba(31,61,52,0.12)"
        />
      </svg>

      {/* Pond reflection */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#a8c4b8]/50 to-[#8aab9a]/30 ${
          isCircle ? "bottom-6 h-16 w-36" : isMini ? "bottom-1 h-6 w-20" : "bottom-4 h-12 w-48"
        }`}
        style={{ filter: "blur(1px)" }}
      />

      {/* Pine trees */}
      <div
        className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end justify-center gap-1 ${
          isMini ? "scale-75" : ""
        }`}
      >
        {[28, 40, 52, 36, 44].map((h, i) => (
          <svg
            key={i}
            width={isCircle ? 20 : 16}
            height={h * (isCircle ? 0.9 : 0.7)}
            viewBox="0 0 20 60"
            className="text-pond-900/25"
          >
            <path
              d="M10 2 L18 22 L14 22 L16 38 L12 38 L14 54 L6 54 L8 38 L4 38 L6 22 L2 22 Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      {/* Ripple accent */}
      {!isMini && (
        <svg
          className="absolute bottom-3 right-4 h-6 w-6 text-moss/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="12" r="6" opacity="0.6" />
          <circle cx="12" cy="12" r="10" opacity="0.3" />
        </svg>
      )}
    </div>
  );
}
