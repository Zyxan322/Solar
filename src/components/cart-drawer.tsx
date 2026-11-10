import { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { company } from "@/data/site";
import { useCart, formatPrice } from "./cart-context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { toast } from "sonner";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, count, total, setQuantity, removeItem, clearCart } = useCart();
  const orderMessage = [
    "Hello, I would like to order the following products:",
    "",
    ...items.map(
      ({ product, quantity }, index) =>
        `${index + 1}. ${product.name} — Qty: ${quantity}${
          product.price === undefined ? "" : ` — ${formatPrice(product.price)} each`
        }`,
    ),
    "",
    `Total: ${total === null ? "Please confirm pricing" : formatPrice(total)}`,
    "",
    "Please confirm availability and order details.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/${company.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open shopping cart, ${count} items`}
          className="glass relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ShoppingCart className="h-[18px] w-[18px]" aria-hidden="true" />
          {count > 0 ? (
            <span className="absolute -top-1 -right-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {count > 99 ? "99+" : count}
            </span>
          ) : null}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="z-[70] flex h-full w-full max-w-md flex-col gap-0 border-l border-border bg-background p-0 text-foreground sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5 pr-14 text-left">
          <SheetTitle className="font-display text-lg tracking-[0.12em]">
            Cart <span className="text-muted-foreground">({count})</span>
          </SheetTitle>
          <SheetDescription>Review your selected solar products.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingCart className="h-9 w-9 text-muted-foreground" />
            <p className="mt-4 font-medium">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add products to prepare a WhatsApp order.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map(({ product, quantity }) => (
                <li key={product.name} className="flex gap-4 border-b border-border/70 pb-4">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {product.price === undefined
                        ? "Price on request"
                        : formatPrice(product.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.name, quantity - 1)}
                        aria-label={`Decrease ${product.name} quantity`}
                        className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-primary/50"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span
                        className="min-w-6 text-center text-sm tabular-nums"
                        aria-label={`Quantity ${quantity}`}
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.name, quantity + 1)}
                        aria-label={`Increase ${product.name} quantity`}
                        className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-primary/50"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(product.name);
                          toast.success("Item removed from cart");
                        }}
                        aria-label={`Remove ${product.name}`}
                        className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{total === null ? "Pricing on request" : formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{total === null ? "Confirm on WhatsApp" : formatPrice(total)}</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
