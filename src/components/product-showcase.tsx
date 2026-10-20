import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { products, type Product } from "@/data/site";
import { useCart, formatPrice } from "./cart-context";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { MagneticButton } from "./ui/magnetic-button";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { ProductCard } from "./product-card";

export function ProductShowcase({ layout = "grid" }: { layout?: "carousel" | "grid" }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const { addItem } = useCart();
  const isGrid = layout === "grid";

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({
      left: dir * (trackRef.current.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="products"
      className="section-dark relative overflow-hidden !bg-white py-24 text-slate-900 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            align="left"
            className="[&_h2]:text-slate-900 [&_p]:text-slate-600 [&_span.inline-flex]:border-slate-200 [&_span.inline-flex]:bg-slate-50 [&_span.inline-flex]:text-emerald-700"
            eyebrow="Solar Product Showcase"
            title="Engineered for Better Energy"
            subtitle="Every component we supply is selected for output, durability and serviceability in Pakistani conditions. Displayed PKR prices are indicative and may vary with specifications and availability."
          />
          {!isGrid ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous products"
                className="glass flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next products"
                className="glass flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={trackRef}
        className={
          isGrid
            ? "mx-auto mt-12 grid max-w-7xl auto-rows-fr grid-cols-1 gap-4 px-5 pb-6 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 lg:px-8 xl:grid-cols-5"
            : "mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
        }
      >
        {products.map((product, i) => (
          <Reveal
            key={product.name}
            delay={isGrid ? (i % 5) * 45 : i * 90}
            className={isGrid ? "h-full" : "w-[82vw] shrink-0 snap-start sm:w-[420px]"}
          >
            <ProductCard
              product={product}
              onView={() => {
                setSelectedProduct(product);
                setDetailQuantity(1);
              }}
              onAdd={() => {
                addItem(product);
                toast.success("Added to cart");
              }}
            />
          </Reveal>
        ))}
      </div>
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        {selectedProduct ? (
          <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border border-border bg-background p-0 text-foreground sm:w-[calc(100%-3rem)]">
            <div className="grid sm:grid-cols-2">
              <div className="aspect-square overflow-hidden sm:aspect-auto sm:min-h-[28rem]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <DialogHeader className="pr-8 text-left">
                  <DialogTitle className="font-display text-2xl">
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed">
                    {selectedProduct.summary}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-5 font-semibold text-primary">
                  {selectedProduct.price === undefined
                    ? "Price on request"
                    : `${formatPrice(selectedProduct.price)}${selectedProduct.priceUnit ? ` / ${selectedProduct.priceUnit}` : ""}`}
                </p>
                <h3 className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  Product details
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {selectedProduct.specs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <button
                    type="button"
                    onClick={() => setDetailQuantity((quantity) => Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-primary/50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-5 text-center text-sm tabular-nums">{detailQuantity}</span>
                  <button
                    type="button"
                    onClick={() => setDetailQuantity((quantity) => quantity + 1)}
                    aria-label="Increase quantity"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-primary/50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <MagneticButton
                  type="button"
                  className="mt-7 w-full"
                  onClick={() => {
                    addItem(selectedProduct, detailQuantity);
                    toast.success("Added to cart");
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </MagneticButton>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
