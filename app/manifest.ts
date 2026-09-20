import type { MetadataRoute } from "next";
import { DOCTOR } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DOCTOR.name.en} — ${DOCTOR.shortTitle.en}`,
    short_name: DOCTOR.name.en,
    description: DOCTOR.title.en,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#005182",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
