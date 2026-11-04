import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Filter,
  Package,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { brands, products, type Product } from "@/data/site";
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

const categories = [
  { id: "inverters", label: "Inverters", icon: Zap },
  { id: "solar-panels", label: "Solar Panels", icon: Sun },
  { id: "breakers", label: "Breakers", icon: ShieldCheck },
  { id: "accessories", label: "Other Accessories", icon: Package },
] as const;

const categoryProductIds: Record<string, string[]> = {
  inverters: ["hybrid-inverters"],
  "solar-panels": ["solar-panels"],
  breakers: ["ac-protection", "dc-protection"],
  accessories: ["energy-storage", "mounting-structures"],
};

const categoryBrandChoices: Record<string, string[]> = {
  breakers: ["CHINT", "MORA"],
  "solar-panels": ["JinkoSolar", "LONGi Solar", "Trina Solar", "JA Solar", "Canadian Solar"],
  inverters: [
    "Huawei",
    "Sungrow",
    "Growatt",
    "SMA Solar Technology",
    "GoodWe",
    "Fronius",
    "SolarEdge",
    "Inverex",
    "Enphase Energy",
    "Victron Energy",
  ],
};

type SortOption = "featured" | "latest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

function categoryForProduct(product: Product) {
  return categories.find((category) =>
    categoryProductIds[category.id]?.includes(product.categoryId),
  );
}

function normalizeBrand(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getBrandName(brandId?: string) {
  return brands.find((brand) => brand.id === brandId)?.name;
}

function FilterPanel({
  categoryId,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  onClear,
  activeFilterCount,
}: {
  categoryId: string;
  selectedBrands: string[];
  onBrandChange: (brandId: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClear: () => void;
  activeFilterCount: number;
}) {
  const categoryProducts = useMemo(() => {
    const categoryIds = categoryProductIds[categoryId];
    return categoryIds
      ? products.filter((product) => categoryIds.includes(product.categoryId))
      : [];
  }, [categoryId]);

  const brandChoices = useMemo(() => {
    if (categoryId === "accessories") {
      const accessoryBrandIds = new Set(
        categoryProducts.flatMap((product) => (product.brandId ? [product.brandId] : [])),
      );
      return [...accessoryBrandIds].map((brandId) => {
        const brand = brands.find((entry) => entry.id === brandId);
        return { id: brandId, name: brand?.name ?? brandId };
      });
    }

    return (categoryBrandChoices[categoryId] ?? []).map((name) => {
      const normalizedName = normalizeBrand(name);
      const matchedBrand = brands.find(
        (brand) => brand.id === normalizedName || normalizeBrand(brand.name) === normalizedName,
      );
      return { id: matchedBrand?.id ?? normalizedName, name };
    });
  }, [categoryId, categoryProducts]);

  const countForBrand = (brandId: string, brandName: string) =>
    categoryProducts.filter((product) => {
      const productBrand = getBrandName(product.brandId);
      return (
        product.brandId === brandId ||
        (productBrand !== undefined && normalizeBrand(productBrand) === normalizeBrand(brandName))
      );
    }).length;

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
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">Filter by brand</h2>
          {selectedBrands.length > 0 ? (
            <span className="text-xs text-muted-foreground">{selectedBrands.length} selected</span>
          ) : null}
        </div>
        {categoryId === "all" ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Select a product category to see its available brand filters.
          </p>
        ) : brandChoices.length > 0 ? (
          <ul className="space-y-3">
            {brandChoices.map((brand) => {
              const count = countForBrand(brand.id, brand.name);
              const checked = selectedBrands.includes(brand.id);
              return (
                <li key={brand.id}>
                  <label
                    className={`flex min-h-6 items-center justify-between gap-3 text-sm ${
                      count === 0 ? "cursor-not-allowed text-muted-foreground/60" : "cursor-pointer"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={count === 0}
                        onChange={() => onBrandChange(brand.id)}
                        className="h-4 w-4 rounded border-input accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      />
                      <span>{brand.name}</span>
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            No brand information is currently listed for these accessories.
          </p>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">Price range</h2>
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
      </div>

      {activeFilterCount > 0 ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
        >
          <X aria-hidden="true" className="h-4 w-4" />
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}

function ProductTile({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const category = categoryForProduct(product);
  const brand = getBrandName(product.brandId) ?? product.brandId;

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
        {category ? (
          <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm">
            {category.label}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="min-h-4 text-[11px] font-semibold tracking-wide text-emerald-800">
          {brand ?? "Solar equipment"}
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

export function ProductsPageContent() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const activeCategoryProducts = useMemo(() => {
    const categoryIds = categoryProductIds[selectedCategory];
    return categoryIds
      ? products.filter((product) => categoryIds.includes(product.categoryId))
      : products;
  }, [selectedCategory]);

  const activeFilterCount =
    (selectedCategory === "all" ? 0 : 1) +
    selectedBrands.length +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = activeCategoryProducts.filter((product) => {
      const brandName = getBrandName(product.brandId) ?? "";
      const searchText =
        `${product.name} ${product.model ?? ""} ${brandName} ${product.summary} ${categoryForProduct(product)?.label ?? ""}`.toLowerCase();
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some(
          (brandId) =>
            product.brandId === brandId ||
            (brandName !== "" && normalizeBrand(brandName) === brandId),
        );
      const defaultPriceRange = priceRange[0] === PRICE_MIN && priceRange[1] === PRICE_MAX;
      const matchesPrice =
        defaultPriceRange ||
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
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  }, [activeCategoryProducts, priceRange, search, selectedBrands, sort]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSearch("");
  };

  const changeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedBrands([]);
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((current) =>
      current.includes(brandId)
        ? current.filter((value) => value !== brandId)
        : [...current, brandId],
    );
  };

  const sidebar = (
    <FilterPanel
      categoryId={selectedCategory}
      selectedBrands={selectedBrands}
      onBrandChange={toggleBrand}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      onClear={resetFilters}
      activeFilterCount={activeFilterCount}
    />
  );

  const brandFilterLabels = selectedBrands.map((brandId) => {
    const knownBrand = brands.find((brand) => brand.id === brandId);
    if (knownBrand) return knownBrand.name;
    return (
      Object.values(categoryBrandChoices)
        .flat()
        .find((name) => normalizeBrand(name) === brandId) ?? brandId
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-28 text-slate-900 sm:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header className="pb-7">
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-800 uppercase">
            Reinvent Energies · Product catalogue
          </p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Solar equipment, thoughtfully selected.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Explore dependable solar essentials for homes and businesses. Prices are indicative;
                confirm current availability with our team.
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

        <section aria-labelledby="product-categories-heading" className="pb-8">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 id="product-categories-heading" className="font-display text-lg font-semibold">
                Shop by category
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Choose a category to narrow the catalogue.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
            <button
              type="button"
              aria-pressed={selectedCategory === "all"}
              onClick={() => changeCategory("all")}
              className={`flex min-h-[76px] items-center gap-3 rounded-xl border px-3 text-left transition-all sm:px-4 ${
                selectedCategory === "all"
                  ? "border-emerald-800 bg-emerald-800 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-800 hover:border-emerald-700/50 hover:bg-emerald-50/50"
              }`}
            >
              <SlidersHorizontal aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold sm:text-sm">All Products</span>
                <span
                  className={`mt-1 block text-[11px] ${
                    selectedCategory === "all" ? "text-white/75" : "text-slate-500"
                  }`}
                >
                  {products.length} items
                </span>
              </span>
              {selectedCategory === "all" ? <Check aria-hidden="true" className="h-4 w-4" /> : null}
            </button>
            {categories.map((category) => {
              const Icon = category.icon;
              const selected = selectedCategory === category.id;
              const count = products.filter((product) =>
                categoryProductIds[category.id]?.includes(product.categoryId),
              ).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => changeCategory(category.id)}
                  className={`flex min-h-[76px] items-center gap-3 rounded-xl border px-3 text-left transition-all sm:px-4 ${
                    selected
                      ? "border-emerald-800 bg-emerald-800 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-800 hover:border-emerald-700/50 hover:bg-emerald-50/50"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold sm:text-sm">{category.label}</span>
                    <span
                      className={`mt-1 block text-[11px] ${
                        selected ? "text-white/75" : "text-slate-500"
                      }`}
                    >
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                  </span>
                  {selected ? <Check aria-hidden="true" className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 border-y border-slate-200 py-3.5">
          <p className="text-sm font-semibold text-slate-800">
            {filteredProducts.length}{" "}
            <span className="font-normal text-slate-500">
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
            <span className="hidden text-slate-400 sm:inline">
              {" "}
              · {activeCategoryProducts.length} in this category
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
                  {activeFilterCount > 0 ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-emerald-800 px-1 text-[10px] text-white">
                      {activeFilterCount}
                    </span>
                  ) : null}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(88vw,360px)] overflow-y-auto bg-white">
                <SheetHeader className="mb-7 pr-8 text-left">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine products by brand and price.</SheetDescription>
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
                <option value="latest">Latest Products</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
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
              {activeFilterCount > 0 ? (
                <span className="text-xs text-muted-foreground">{activeFilterCount} active</span>
              ) : null}
            </div>
            {sidebar}
          </aside>

          <section aria-label="Product results" className="min-w-0">
            {activeFilterCount > 0 ? (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {selectedCategory !== "all" ? (
                  <button
                    type="button"
                    onClick={() => changeCategory("all")}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    {categories.find((category) => category.id === selectedCategory)?.label}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                {brandFilterLabels.map((label, index) => (
                  <button
                    key={selectedBrands[index]}
                    type="button"
                    onClick={() => toggleBrand(selectedBrands[index] ?? "")}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    {label}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ))}
                {priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? (
                  <button
                    type="button"
                    onClick={() => setPriceRange([PRICE_MIN, PRICE_MAX])}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                {search.trim() ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 text-xs font-medium text-emerald-900"
                  >
                    Search: {search.trim()}
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-1 text-xs font-semibold text-slate-600 underline-offset-4 hover:text-emerald-800 hover:underline"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            {filteredProducts.length > 0 ? (
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
                  <Search aria-hidden="true" className="h-6 w-6" />
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
                  onClick={resetFilters}
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
