import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { navigation, company, products } from "@/data/site";
import { getHeaderProductCategories } from "@/data/shopping-categories";
import { formatPrice } from "./cart-context";
import { ProductImage } from "./product-image";
import { MagneticButton } from "./ui/magnetic-button";
import { CartDrawer } from "./cart-drawer";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(() => new Set());
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(() => new Set());
  const closeTimer = useRef<number | null>(null);
  const headerCategories = useMemo(() => getHeaderProductCategories(products), []);
  const headerNavigation = navigation.filter((item) => item.label !== "Shop");

  const toggleExpanded = (
    setter: (update: (current: Set<string>) => Set<string>) => void,
    id: string,
  ) => {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openCategoryMenu = (categoryId: string) => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setActiveCategory(categoryId);
    const category = headerCategories.find((entry) => entry.id === categoryId);
    const firstCompany = category?.companies[0];
    setActiveCompany(firstCompany?.id ?? null);
    setActiveProduct(firstCompany?.products[0]?.id ?? null);
  };

  const scheduleMenuClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveCategory(null);
      setActiveCompany(null);
      setActiveProduct(null);
      closeTimer.current = null;
    }, 180);
  };

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
      ticking = true;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const selectedCategory = headerCategories.find((category) => category.id === activeCategory);
  const selectedCompany = selectedCategory?.companies.find(
    (companyEntry) => companyEntry.id === activeCompany,
  );
  const selectedProduct =
    selectedCompany?.products.find((product) => product.id === activeProduct) ??
    selectedCompany?.products[0];

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgb(0 0 0 / 88%)" : "rgb(0 0 0 / 68%)",
          backdropFilter: "blur(12px)",
        }}
        className={cn(
          "section-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-[background-color,padding] duration-250 ease-out",
          scrolled ? "py-2.5 shadow-sm" : "py-3",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            to="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5"
            aria-label={`${company.name} home`}
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/30 transition-colors duration-250 group-hover:ring-primary/60">
              <img
                src={logo}
                alt={`${company.name} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="truncate font-display text-xs font-bold tracking-[0.12em] transition-colors duration-250 sm:text-sm">
              REINVENT <span className="text-primary">ENERGIES</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:gap-6">
            <div
              className="relative hidden xl:block"
              onMouseEnter={() => {
                if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
                closeTimer.current = null;
              }}
              onMouseLeave={scheduleMenuClose}
              onKeyDown={(event) => {
                if (event.key === "Escape") scheduleMenuClose();
              }}
            >
              <ul className="flex items-center gap-5 text-[0.82rem] font-medium">
                {headerNavigation.map((item) => (
                  <Fragment key={item.label}>
                    <li>
                      <Link
                        to={item.href}
                        activeOptions={{ exact: item.href === "/" }}
                        activeProps={{ className: "text-foreground" }}
                        className="nav-link inline-block text-muted-foreground transition-colors duration-250 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                    {item.label === "Services"
                      ? headerCategories.map((category) => (
                          <li key={category.id} onMouseEnter={() => openCategoryMenu(category.id)}>
                            <Link
                              to={category.href}
                              aria-haspopup="true"
                              aria-expanded={activeCategory === category.id}
                              aria-controls="category-mega-menu"
                              onFocus={() => openCategoryMenu(category.id)}
                              className={cn(
                                "nav-link inline-flex items-center gap-1 text-muted-foreground transition-colors duration-250 hover:text-foreground",
                                activeCategory === category.id && "text-foreground",
                              )}
                            >
                              {category.label}
                              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
                            </Link>
                          </li>
                        ))
                      : null}
                  </Fragment>
                ))}
              </ul>
              <div
                id="category-mega-menu"
                aria-hidden={!selectedCategory}
                className={cn(
                  "absolute left-1/2 top-full z-50 w-[min(900px,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out",
                  selectedCategory
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0",
                )}
              >
                {selectedCategory ? (
                  <div className="grid max-h-[min(430px,calc(100vh-7rem))] grid-cols-[210px_300px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_24px_70px_-24px_rgb(0_0_0/0.35)]">
                    <div className="overflow-y-auto p-5">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-800 uppercase">
                        Companies
                      </p>
                      <ul className="mt-3 space-y-1">
                        {selectedCategory.companies.map((companyEntry) => (
                          <li key={companyEntry.id}>
                            <button
                              type="button"
                              onMouseEnter={() => {
                                setActiveCompany(companyEntry.id);
                                setActiveProduct(companyEntry.products[0]?.id ?? null);
                              }}
                              onFocus={() => {
                                setActiveCompany(companyEntry.id);
                                setActiveProduct(companyEntry.products[0]?.id ?? null);
                              }}
                              aria-current={
                                selectedCompany?.id === companyEntry.id ? "true" : undefined
                              }
                              className={cn(
                                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-900",
                                selectedCompany?.id === companyEntry.id &&
                                  "bg-emerald-50 text-emerald-900",
                              )}
                            >
                              <span className="truncate">{companyEntry.name}</span>
                              <span className="shrink-0 text-xs text-slate-400">
                                {companyEntry.products.length}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={selectedCategory.href}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
                      >
                        View all {selectedCategory.label.toLowerCase()}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="overflow-y-auto border-l border-slate-100 p-5">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-800 uppercase">
                        {selectedCompany?.name ?? "Products"}
                      </p>
                      {selectedCompany ? (
                        <ul className="mt-3 space-y-1">
                          {selectedCompany.products.map((product) => (
                            <li key={product.id}>
                              <Link
                                to="/products/$productId"
                                params={{ productId: product.id }}
                                onMouseEnter={() => setActiveProduct(product.id)}
                                onFocus={() => setActiveProduct(product.id)}
                                className={cn(
                                  "block rounded-lg px-3 py-2.5 text-sm leading-snug text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-900",
                                  activeProduct === product.id && "bg-emerald-50 text-emerald-900",
                                )}
                              >
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="border-l border-slate-100 bg-slate-50/80 p-5">
                      {selectedProduct ? (
                        <>
                          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                            Product preview
                          </p>
                          <div className="mt-3 grid h-28 place-items-center overflow-hidden rounded-xl border border-slate-100 bg-white p-3">
                            <ProductImage product={selectedProduct} />
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">
                            {selectedProduct.name}
                          </p>
                          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-slate-600">
                            {selectedProduct.summary}
                          </p>
                          <Link
                            to="/products/$productId"
                            params={{ productId: selectedProduct.id }}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
                          >
                            View product details
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </Link>
                        </>
                      ) : (
                        <p className="text-xs leading-relaxed text-slate-500">
                          Browse products in {selectedCategory.label}.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <MagneticButton href="/contact" className="hidden px-5 py-2.5 xl:inline-flex">
              Get Started
            </MagneticButton>
            <CartDrawer />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass btn-3d flex h-11 w-11 shrink-0 items-center justify-center rounded-full xl:hidden"
            >
              <span className="relative flex h-3 w-5 flex-col justify-between">
                <span className="h-[2px] w-full rounded bg-foreground transition-transform duration-300" />
                <span className="h-[2px] w-full rounded bg-foreground transition-transform duration-300" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "section-dark fixed inset-0 z-60 flex flex-col overflow-y-auto bg-background/95 backdrop-blur-lg transition-opacity duration-250 ease-out xl:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label={`${company.name} home`}
            className="inline-flex items-center gap-3"
          >
            <span className="grid h-13 w-13 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/30">
              <img
                src={logo}
                alt={`${company.name} logo`}
                width={52}
                height={52}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-xs font-bold tracking-[0.12em]">
              REINVENT <span className="text-primary">ENERGIES</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg"
          >
            ✕
          </button>
        </div>
        <ul className="flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-y-auto px-8">
          {headerNavigation.map((item) => (
            <Fragment key={item.label}>
              <li className="border-b border-border/60">
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: item.href === "/" }}
                  className="block py-4 font-display text-2xl font-semibold transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
              {item.label === "Services"
                ? headerCategories.map((category) => {
                    const categoryExpanded = expandedCategories.has(category.id);
                    return (
                      <li key={category.id} className="border-b border-border/60 py-2">
                        <div className="flex items-center gap-3">
                          <Link
                            to={category.href}
                            onClick={() => setOpen(false)}
                            className="flex-1 py-2 font-display text-2xl font-semibold transition-colors hover:text-primary"
                          >
                            {category.label}
                          </Link>
                          <button
                            type="button"
                            aria-label={`${categoryExpanded ? "Hide" : "Show"} ${category.label} companies`}
                            aria-expanded={categoryExpanded}
                            onClick={() => toggleExpanded(setExpandedCategories, category.id)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-border"
                          >
                            <ChevronDown
                              aria-hidden="true"
                              className={cn(
                                "h-4 w-4 transition-transform",
                                categoryExpanded && "rotate-180",
                              )}
                            />
                          </button>
                        </div>
                        {categoryExpanded ? (
                          <div className="max-h-[55vh] overflow-y-auto pb-3 pl-3">
                            <ul className="space-y-2">
                              {category.companies.map((companyEntry) => {
                                const companyKey = `${category.id}:${companyEntry.id}`;
                                const companyExpanded = expandedCompanies.has(companyKey);
                                return (
                                  <li key={companyKey}>
                                    <button
                                      type="button"
                                      aria-expanded={companyExpanded}
                                      onClick={() =>
                                        toggleExpanded(setExpandedCompanies, companyKey)
                                      }
                                      className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm font-semibold text-foreground hover:bg-white/10"
                                    >
                                      <span>{companyEntry.name}</span>
                                      <ChevronDown
                                        aria-hidden="true"
                                        className={cn(
                                          "h-4 w-4 shrink-0 transition-transform",
                                          companyExpanded && "rotate-180",
                                        )}
                                      />
                                    </button>
                                    {companyExpanded ? (
                                      <ul className="ml-3 border-l border-border/60 pl-3">
                                        {companyEntry.products.map((product) => {
                                          const productKey = `${companyKey}:${product.id}`;
                                          const productExpanded = expandedProducts.has(productKey);
                                          return (
                                            <li
                                              key={product.id}
                                              className="border-b border-border/40 py-2"
                                            >
                                              <div className="flex items-center gap-2">
                                                <Link
                                                  to="/products/$productId"
                                                  params={{ productId: product.id }}
                                                  onClick={() => setOpen(false)}
                                                  className="min-h-10 flex-1 py-2 text-sm text-muted-foreground hover:text-primary"
                                                >
                                                  {product.name}
                                                </Link>
                                                <button
                                                  type="button"
                                                  aria-label={`${productExpanded ? "Hide" : "Show"} preview for ${product.name}`}
                                                  aria-expanded={productExpanded}
                                                  onClick={() =>
                                                    toggleExpanded(setExpandedProducts, productKey)
                                                  }
                                                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
                                                >
                                                  <ChevronDown
                                                    aria-hidden="true"
                                                    className={cn(
                                                      "h-4 w-4 transition-transform",
                                                      productExpanded && "rotate-180",
                                                    )}
                                                  />
                                                </button>
                                              </div>
                                              {productExpanded ? (
                                                <div className="flex items-center gap-3 py-2 pr-2">
                                                  <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-1">
                                                    <ProductImage product={product} />
                                                  </span>
                                                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                                    {product.summary}
                                                  </p>
                                                </div>
                                              ) : null}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                            <Link
                              to={category.href}
                              onClick={() => setOpen(false)}
                              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                            >
                              View all {category.label}
                              <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                          </div>
                        ) : null}
                      </li>
                    );
                  })
                : null}
            </Fragment>
          ))}
        </ul>
        <div className="px-8 pb-12 pt-6">
          <MagneticButton href="/contact" className="w-full" onClick={() => setOpen(false)}>
            Get Started
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
