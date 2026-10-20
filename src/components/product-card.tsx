import { formatPrice } from "./cart-context";
import type { Product } from "@/data/site";

type Props = {
  product: Product;
  onView: () => void;
  onAdd: () => void;
};

export function ProductCard({ product, onView, onAdd }: Props) {
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60 bg-card/50 p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.alt}
          width={1008}
          height={756}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full border border-border/70 bg-background/90 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase backdrop-blur sm:text-[10px]">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="line-clamp-3 min-h-[3.75rem] font-display text-base leading-snug font-semibold sm:text-[17px]">
          {product.name}
        </h3>
        {product.price !== undefined ? (
          <p className="mt-2 text-sm font-semibold text-primary">
            {formatPrice(product.price)}
            {product.priceUnit ? ` / ${product.priceUnit}` : ""}
          </p>
        ) : null}
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {product.summary}
        </p>
        <ul className="mt-3 grid gap-1.5 text-xs leading-relaxed text-muted-foreground">
          {product.specs.slice(0, 2).map((spec) => (
            <li key={spec} className="flex min-h-8 gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-2">{spec}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={onView}
            className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-border px-1 text-[9px] font-semibold whitespace-nowrap transition-colors hover:border-primary/50 hover:text-primary min-[420px]:text-[11px] sm:px-3 sm:text-xs"
          >
            View Item
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold whitespace-nowrap text-primary-foreground transition-colors hover:bg-primary/90 min-[420px]:text-[11px] sm:px-3 sm:text-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
