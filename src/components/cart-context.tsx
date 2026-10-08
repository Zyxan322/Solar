import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/site";

const STORAGE_KEY = "reinvent-energies-cart";

type StoredCartItem = { productName: string; quantity: number };
export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number | null;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productName: string, quantity: number) => void;
  removeItem: (productName: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): StoredCartItem[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new Error("Cart storage must contain a list.");
    }
    return parsed.filter(
      (item): item is StoredCartItem =>
        typeof item === "object" &&
        item !== null &&
        "productName" in item &&
        typeof item.productName === "string" &&
        "quantity" in item &&
        typeof item.quantity === "number" &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        products.some((product) => product.name === item.productName),
    );
  } catch (error) {
    console.error("Unable to restore the saved cart.", error);
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStoredItems(readCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
    }
  }, [ready, storedItems]);

  useEffect(() => {
    const syncCart = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setStoredItems(event.newValue ? readCart() : []);
      }
    };
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setStoredItems((current) => {
      const existing = current.find((item) => item.productName === product.name);
      if (existing) {
        return current.map((item) =>
          item.productName === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productName: product.name, quantity }];
    });
  }, []);

  const setQuantity = useCallback((productName: string, quantity: number) => {
    setStoredItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.productName !== productName)
        : current.map((item) => (item.productName === productName ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback(
    (productName: string) => setQuantity(productName, 0),
    [setQuantity],
  );
  const clearCart = useCallback(() => setStoredItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = storedItems.flatMap((item) => {
      const product = products.find(({ name }) => name === item.productName);
      return product ? [{ product, quantity: item.quantity }] : [];
    });
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total =
      items.length > 0 && items.every((item) => item.product.price !== undefined)
        ? items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0)
        : null;
    return { items, count, total, addItem, setQuantity, removeItem, clearCart };
  }, [storedItems, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}
