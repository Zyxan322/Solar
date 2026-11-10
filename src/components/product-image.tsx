import { useState } from "react";
import type { Product } from "@/data/site";

type Props = {
  product: Product;
  className?: string;
};

export function ProductImage({ product, className = "" }: Props) {
  const [failedImage, setFailedImage] = useState<string | null>(null);

  if (failedImage === product.image) {
    return (
      <div
        role="img"
        aria-label={`Image unavailable for ${product.name}`}
        className={`grid place-items-center bg-slate-50 text-center text-xs text-slate-500 ${className}`}
      >
        <span>Product image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.alt}
      width={1008}
      height={756}
      loading="lazy"
      decoding="async"
      onError={() => setFailedImage(product.image)}
      className={`h-full w-full object-contain ${className}`}
    />
  );
}
