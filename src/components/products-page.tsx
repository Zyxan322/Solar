import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpDown, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { brands, getProductCategoryLabel, products, type Product } from "@/data/site";
import {
  getShoppingCategoryProducts,
  shoppingCategories,
  type ShoppingCategoryId,
} from "@/data/shopping-categories";
import { getProductPageImage } from "@/data/product-page-media";
import { ProductImage } from "@/components/product-image";
import { useCart, formatPrice } from "@/components/cart-context";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PRICE_MIN = 1_000;
const PRICE_MAX = 300_000;

type SortOption = "featured" | "latest" | "price-asc" | "price-desc";
type ListingCategoryId = ShoppingCategoryId | "all";

function getBrandName(brandId?: string) {
  return brands.find((brand) => brand.id === brandId)?.name ?? brandId;
}

function ProductTile({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const brand = getBrandName(product.brandId);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-elegant)]">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        aria-label={`View details for ${product.name}`}
        className="relative block aspect-[4/3] overflow-hidden border-b border-border/60 bg-slate-50 p-4 sm:p-5"
      >
        <ProductImage
          product={{ ...product, image: getProductPageImage(product.id, product.image) }}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm">
          {getProductCategoryLabel(product.categoryId)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="min-h-4 text-[11px] font-semibold tracking-wide text-emerald-800">
          {brand ?? "Company not specified"}
        </p>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="mt-1 line-clamp-2 min-h-12 font-display text-sm leading-snug font-semibold text-slate-900 hover:text-emerald-800 sm:text-base"
        >
          {product.name}
        </Link>
        {product.model ? (
          <p className="mt-1 truncate text-xs text-slate-500">Model: {product.model}</p>
        ) : (
          <span className="mt-1 block h-4" aria-hidden="true" />
        )}
        <p className="mt-3 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
          {product.price === undefined ? "Price on request" : formatPrice(product.price)}
          {product.price !== undefined && product.priceUnit ? (
            <span className="ml-1 text-xs font-medium text-slate-500">/ {product.priceUnit}</span>
          ) : null}
        </p>
        <p className="mt-1 text-xs text-slate-500">Check availability with our team</p>
        <div className="mt-auto grid grid-cols-1 gap-2 pt-4 min-[430px]:grid-cols-2">
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-300 px-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-700 hover:text-emerald-800"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-emerald-800 px-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterPanel({
  availableBrands,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  onClear,
  hasActiveFilters,
}: {
  availableBrands: { id: string; name: string; count: number }[];
  selectedBrands: string[];
  onBrandChange: (brandId: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}) {
  const updateMinimum = (value: string) => {
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      onPriceChange([Math.min(PRICE_MAX, Math.max(PRICE_MIN, parsed)), priceRange[1]]);
    }
  };

  const updateMaximum = (value: string) => {
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      onPriceChange([priceRange[0], Math.max(priceRange[0], Math.min(PRICE_MAX, parsed))]);
    }
  };

  return (
    <div className="space-y-7">
      <section aria-labelledby="company-filter-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="company-filter-heading" className="font-display text-sm font-semibold">
            Company
          </h2>
          {selectedBrands.length > 0 ? (
            <span className="text-xs text-muted-foreground">{selectedBrands.length} selected</span>
          ) : null}
        </div>
        {availableBrands.length ? (
          <ul className="space-y-3">
            {availableBrands.map((brand) => (
              <li key={brand.id}>
                <label className="flex min-h-6 cursor-pointer items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => onBrandChange(brand.id)}
                      className="h-4 w-4 rounded border-input accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                    <span>{brand.name}</span>
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">{brand.count}</span>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Company information is not listed for these products yet.
          </p>
        )}
      </section>

      <section className="border-t border-border pt-6" aria-labelledby="price-filter-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="price-filter-heading" className="font-display text-sm font-semibold">
            Price range
          </h2>
          <button
            type="button"
            onClick={() => onPriceChange([PRICE_MIN, PRICE_MAX])}
            className="text-xs font-medium text-primary hover:underline"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center justify-between text-xs font-medium tabular-nums text-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
        <Slider
          aria-label="Price range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1_000}
          value={priceRange}
          onValueChange={(value) => {
            const min = value[0] ?? PRICE_MIN;
            const max = value[1] ?? PRICE_MAX;
            onPriceChange([Math.min(min, max), Math.max(min, max)]);
          }}
          className="mt-5 py-2"
        />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="space-y-1.5 text-[11px] font-medium text-muted-foreground">
            Minimum
            <input
              type="number"
              min={PRICE_MIN}
              max={priceRange[1]}
              step={1_000}
              value={priceRange[0]}
              onChange={(event) => updateMinimum(event.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <label className="space-y-1.5 text-[11px] font-medium text-muted-foreground">
            Maximum
            <input
              type="number"
              min={priceRange[0]}
              max={PRICE_MAX}
              step={1_000}
              value={priceRange[1]}
              onChange={(event) => updateMaximum(event.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </div>
      </section>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
        >
          <X aria-hidden="true" className="h-4 w-4" />
          Clear filters
        </button>
      ) : null}
    </div>
  );
}

export function ProductsPageContent({ categoryId = "all" }: { categoryId?: ListingCategoryId }) {
  const { addItem } = useCart();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const category = shoppingCategories.find((entry) => entry.id === categoryId);
  const categoryProducts = useMemo(
    () => (category ? getShoppingCategoryProducts(category.id, products) : products),
    [category],
  );
  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of categoryProducts) {
      if (product.brandId) counts.set(product.brandId, (counts.get(product.brandId) ?? 0) + 1);
    }
    return [...counts].map(([id, count]) => ({
      id,
      name: getBrandName(id) ?? id,
      count,
    }));
  }, [categoryProducts]);
  const hasPriceFilter = priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX;
  const hasActiveFilters = selectedBrands.length > 0 || hasPriceFilter;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = categoryProducts.filter((product) => {
      const brandName = getBrandName(product.brandId) ?? "";
      const searchText =
        `${product.name} ${product.model ?? ""} ${brandName} ${product.summary} ${getProductCategoryLabel(product.categoryId)}`.toLowerCase();
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brandId ?? "");
      const matchesPrice =
        !hasPriceFilter ||
        (product.price !== undefined &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]);
      return matchesBrand && matchesPrice && (!query || searchText.includes(query));
    });

    if (sort === "latest") {
      filtered.sort(
        (a, b) =>
          products.findIndex((product) => product.id === b.id) -
          products.findIndex((product) => product.id === a.id),
      );
    } else if (sort === "price-asc") {
      filtered.sort(
        (a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY),
      );
    } else if (sort === "price-desc") {
      filtered.sort(
        (a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY),
      );
    }
    return filtered;
  }, [categoryProducts, hasPriceFilter, priceRange, search, selectedBrands, sort]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((current) =>
      current.includes(brandId)
        ? current.filter((value) => value !== brandId)
        : [...current, brandId],
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const sidebar = (
    <FilterPanel
      availableBrands={availableBrands}
      selectedBrands={selectedBrands}
      onBrandChange={toggleBrand}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
    />
  );

  const title = category?.label ?? "Solar equipment, thoughtfully selected.";
  const description =
    category?.description ??
    "Explore dependable solar essentials for homes and businesses. Prices are indicative; confirm current availability with our team.";

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-28 text-slate-900 sm:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header className="pb-7">
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-800 uppercase">
            Reinvent Energies · {category?.label ?? "Product catalogue"}
          </p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {description}
              </p>
            </div>
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search products</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products, models, brands..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-11 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              />
              {search ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                  className="absolute top-1/2 right-3 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              ) : null}
            </label>
          </div>
        </header>

        <div className="flex items-center justify-between gap-3 border-y border-slate-200 py-3.5">
          <p className="text-sm font-semibold text-slate-800">
            {filteredProducts.length}{" "}
            <span className="font-normal text-slate-500">
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
            <span className="hidden text-slate-400 sm:inline">
              {" "}
              · {categoryProducts.length} available
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold lg:hidden"
                >
                  <Filter aria-hidden="true" className="h-4 w-4" />
                  Filters
                  {hasActiveFilters ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-emerald-800 px-1 text-[10px] text-white">
                      {selectedBrands.length + Number(hasPriceFilter)}
                    </span>
                  ) : null}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(88vw,360px)] overflow-y-auto bg-white">
                <SheetHeader className="mb-7 pr-8 text-left">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine products by company and price.</SheetDescription>
                </SheetHeader>
                {sidebar}
              </SheetContent>
            </Sheet>
            <label className="relative flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white pl-3 pr-2">
              <ArrowUpDown aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500" />
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="max-w-[155px] appearance-none bg-transparent pr-5 text-xs font-medium text-slate-700 outline-none sm:max-w-none sm:text-sm"
              >
                <option value="featured">Featured</option>
                <option value="latest">Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-500"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-6 pt-6 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28 lg:block">
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-display text-base font-semibold">Filters</h2>
              {hasActiveFilters ? (
                <span className="text-xs text-muted-foreground">
                  {selectedBrands.length + Number(hasPriceFilter)} active
                </span>
              ) : null}
            </div>
            {sidebar}
          </aside>

          <section aria-label="Product results" className="min-w-0">
            {hasActiveFilters ? (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {selectedBrands.map((brandId) => (
                  <button
                    key={brandId}
                    type="button"
                    onClick={() => toggleBrand(brandId)}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    {getBrandName(brandId)}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ))}
                {hasPriceFilter ? (
                  <button
                    type="button"
                    onClick={() => setPriceRange([PRICE_MIN, PRICE_MAX])}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs font-semibold text-slate-600 underline-offset-4 hover:text-emerald-800 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : null}

            {filteredProducts.length ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    onAdd={() => {
                      addItem(product);
                      toast.success("Added to cart");
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-800">
                  <SlidersHorizontal aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold">
                  No products match those filters
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                  Try adjusting your search or price range, or clear filters to browse the full
                  catalogue.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    setSearch("");
                  }}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-800 px-5 text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
