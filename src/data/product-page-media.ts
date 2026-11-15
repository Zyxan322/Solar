import { getChintCircuitImage } from "./product-assets";

const productPageImageOverrides: Record<string, string> = {
  "chint-nb1-63dc-c20a": getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.23 AM (1).jpeg"),
  "chint-nxb-63-c63-single-pole": getChintCircuitImage(
    "WhatsApp Image 2026-11-04 at 9.26.22 AM (1).jpeg",
  ),
  "chint-nxb-63-c63-four-pole": getChintCircuitImage(
    "WhatsApp Image 2026-11-04 at 9.26.25 AM.jpeg",
  ),
};

export function getProductPageImage(productId: string, fallback: string) {
  return productPageImageOverrides[productId] ?? fallback;
}
