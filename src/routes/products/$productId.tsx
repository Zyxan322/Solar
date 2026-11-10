import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { brands, getProductCategoryLabel, getProductQuoteUrl, products } from "@/data/site";
import { getProductPageImage } from "@/data/product-page-media";
import { ProductImage } from "@/components/product-image";
import { useCart, formatPrice } from "@/components/cart-context";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage,
  head: ({ params }) => {
    const product = products.find((entry) => entry.id === params.productId);
    const title = product ? `${product.name} | Reinvent Energies` : "Product not found";
    const description = product
      ? `${product.summary} View product specifications and request a quote from Reinvent Energies.`
      : "This product could not be found.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
    };
  },
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const product = products.find((entry) => entry.id === productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [productId]);

  if (!product) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-5 pt-28 text-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-emerald-800">Product catalog</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900">
            Product not found
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            This listing may have been removed or the address may be incorrect.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const brand = brands.find((entry) => entry.id === product.brandId);
  const primaryImage = getProductPageImage(product.id, product.image);
  const gallery = [primaryImage, ...(product.gallery ?? [])];
  const activeImage = gallery[selectedImage] ?? primaryImage;

  return (
    <div className="min-h-[65vh] bg-white px-5 pb-20 pt-28 text-slate-900 sm:pt-32 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/products"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-700"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
              <ProductImage product={{ ...product, image: activeImage }} />
            </div>
            {gallery.length > 1 ? (
              <div aria-label="Product images" className="mt-3 flex gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border bg-slate-50 p-1 transition-colors ${
                      selectedImage === index
                        ? "border-emerald-700 ring-2 ring-emerald-700/15"
                        : "border-slate-200 hover:border-emerald-700/50"
                    }`}
                  >
                    <ProductImage
                      product={{ ...product, image }}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-emerald-800">
              {brand ? <span>{brand.name}</span> : null}
              {brand ? (
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
              ) : null}
              <span>{getProductCategoryLabel(product.categoryId)}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            {product.model || product.sku ? (
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {product.model ? (
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-slate-800">Model</dt>
                    <dd>{product.model}</dd>
                  </div>
                ) : null}
                {product.sku ? (
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-slate-800">SKU</dt>
                    <dd>{product.sku}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            <p className="mt-5 max-w-xl leading-relaxed text-slate-600">{product.summary}</p>

            <p className="mt-6 text-xl font-semibold text-slate-900">
              {product.price === undefined
                ? "Price on request"
                : `${formatPrice(product.price)}${product.priceUnit ? ` / ${product.priceUnit}` : ""}`}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Indicative pricing. Contact us to confirm current availability and final pricing.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Quantity</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Decrease quantity"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 transition-colors hover:border-emerald-700 hover:text-emerald-800"
              >
                <Minus aria-hidden="true" className="h-4 w-4" />
              </button>
              <span aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 transition-colors hover:border-emerald-700 hover:text-emerald-800"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={getProductQuoteUrl(product)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                WhatsApp Inquiry
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  toast.success("Added to cart");
                }}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-7">
              <h2 className="font-display text-lg font-semibold">Specifications</h2>
              <ul className="mt-4 space-y-3">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700"
                    />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
