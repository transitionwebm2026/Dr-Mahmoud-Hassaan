import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DOCTOR } from "@/lib/constants";

export const shareImageSize = { width: 1200, height: 630 };
export const shareImageContentType = "image/png";
export const shareImageAlt = `${DOCTOR.name.en} — ${DOCTOR.shortTitle.en}`;

/**
 * Shared renderer for the site-wide `opengraph-image` and `twitter-image`
 * route conventions (identical dimensions for both, so one image serves
 * both social previews). The logo is read once at module scope since it's a
 * predictable, unchanging local asset — see Next.js's guidance on reading
 * local files for `ImageResponse`.
 */
const logoData = await readFile(join(process.cwd(), "public/images/logo-icon.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export function BrandShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #005182 0%, #168e9f 55%, #1c9ea6 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 40,
            padding: 80,
            boxShadow: "0 40px 100px rgba(2, 20, 30, 0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={420} height={420} alt="" />
        </div>
      </div>
    ),
    shareImageSize
  );
}
