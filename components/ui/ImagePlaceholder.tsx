import type { LucideIcon } from "lucide-react";

interface ImagePlaceholderProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
  variant?: "brand" | "deep" | "light";
  size?: "sm" | "lg";
}

/**
 * Stand-in for a real photo/asset. Swap any usage of this component for a
 * Next.js <Image /> once the real medical photography is supplied — the
 * gradient + icon treatment keeps every card on-brand in the meantime.
 */
export default function ImagePlaceholder({
  icon: Icon,
  label,
  className = "",
  variant = "brand",
  size = "sm",
}: ImagePlaceholderProps) {
  const variants: Record<string, string> = {
    brand: "from-brand-600 via-brand-500 to-deep-800",
    deep: "from-deep-800 via-brand-700 to-deep-900",
    light: "from-brand-50 via-white to-brand-100",
  };
  const isLight = variant === "light";
  const iconSize = size === "lg" ? "h-28 w-28 sm:h-40 sm:w-40" : "h-10 w-10 sm:h-12 sm:w-12";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-mesh-medical opacity-60" />
      <Icon
        className={`relative ${iconSize} ${isLight ? "text-brand-500" : "text-white/90"}`}
        strokeWidth={1.2}
      />
      {label && (
        <span
          className={`absolute inset-x-3 bottom-3 truncate text-center text-[11px] font-semibold ${
            isLight ? "text-brand-700" : "text-white/85"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
