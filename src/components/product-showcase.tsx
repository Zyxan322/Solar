import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { products, type Product } from "@/data/site";
import { useCart, formatPrice } from "./cart-context";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { MagneticButton } from "./ui/magnetic-button";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

export function ProductShowcase({ layout = "carousel" }: { layout?: "carousel" | "grid" }) {
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
      className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Solar Product Showcase"
            title="Engineered for Better Energy"
            subtitle="Every component we supply is selected for output, durability and serviceability in Pakistani conditions."
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
            ? "mx-auto mt-14 grid max-w-7xl gap-6 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
            : "mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
        }
      >
        {products.map((product, i) => (
          <Reveal
            key={product.name}
            delay={i * 90}
            className={isGrid ? "h-full" : "w-[82vw] shrink-0 snap-start sm:w-[420px]"}
          >
            <Tilt3D intensity={12} lift={30} className="h-full">
              <article className="glass glow-border card-3d group relative h-full overflow-hidden rounded-3xl">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={1008}
                    height={1008}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-250 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--color-background)_90%,transparent))]" />
                </div>
                <div className="relative -mt-16 p-7">
                  <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{product.summary}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-2 transition duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDetailQuantity(1);
                      }}
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-border px-3 text-xs font-semibold transition-colors hover:border-primary/50 hover:text-primary sm:text-sm"
                    >
                      View Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(product);
                        toast.success("Added to cart");
                      }}
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            </Tilt3D>
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
                    : formatPrice(selectedProduct.price)}
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
