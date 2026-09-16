import { BrandShareImage, shareImageAlt, shareImageContentType, shareImageSize } from "@/lib/brandShareImage";

export const alt = shareImageAlt;
export const size = shareImageSize;
export const contentType = shareImageContentType;

export default function Image() {
  return BrandShareImage();
}
