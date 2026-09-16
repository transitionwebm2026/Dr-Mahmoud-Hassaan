"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

interface FallbackImageProps {
  /** Real photo path, e.g. "/images/about-doctor.jpg". */
  src: string;
  alt: string;
  className?: string;
  placeholderIcon: LucideIcon;
  placeholderVariant?: "brand" | "deep" | "light";
  placeholderSize?: "sm" | "lg";
  placeholderLabel?: string;
}

/**
 * Tries to load a real photo; falls back to the branded ImagePlaceholder if
 * the file doesn't exist (or fails to load) — no code changes needed once
 * the real file is dropped in at `src`. Fills its parent (use on a
 * `relative` container), object-cover.
 *
 * Includes a `ref` + mount-time check alongside `onError`: the <img> is
 * server-rendered, so on a fast local 404 the browser can finish failing
 * the request before React attaches the onError listener (a known
 * React/Next.js hydration race — error events don't bubble, so a failure
 * in that window is otherwise missed entirely).
 */
export default function FallbackImage({
  src,
  alt,
  className = "",
  placeholderIcon,
  placeholderVariant = "deep",
  placeholderSize = "sm",
  placeholderLabel,
}: FallbackImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <ImagePlaceholder
        icon={placeholderIcon}
        variant={placeholderVariant}
        size={placeholderSize}
        label={placeholderLabel}
        className={className}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
