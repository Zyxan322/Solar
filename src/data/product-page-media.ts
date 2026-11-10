import chintSinglePoleBreaker from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.22 AM (1).jpeg";
import chintFourPoleBreaker from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.25 AM.jpeg";
import chintDcBreaker20a from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.23 AM (1).jpeg";

const productPageImageOverrides: Record<string, string> = {
  "chint-nb1-63dc-c20a": chintDcBreaker20a,
  "chint-nxb-63-c63-single-pole": chintSinglePoleBreaker,
  "chint-nxb-63-c63-four-pole": chintFourPoleBreaker,
};

export function getProductPageImage(productId: string, fallback: string) {
  return productPageImageOverrides[productId] ?? fallback;
}
