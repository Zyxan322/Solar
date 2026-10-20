import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { navigation, company } from "@/data/site";
import { MagneticButton } from "./ui/magnetic-button";
import { CartDrawer } from "./cart-drawer";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgb(0 0 0 / 88%)" : "rgb(0 0 0 / 68%)",
          backdropFilter: "blur(12px)",
        }}
        className={cn(
          "section-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-[background-color,padding] duration-250 ease-out",
          scrolled ? "py-3 shadow-sm" : "py-3.5",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2.5"
            aria-label={`${company.name} home`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/30 transition-colors duration-250 group-hover:ring-primary/60">
              <img
                src={logo}
                alt={`${company.name} logo`}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="truncate font-display text-xs font-bold tracking-[0.12em] transition-colors duration-250 sm:text-sm">
              REINVENT <span className="text-primary">ENERGIES</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:gap-6">
            <ul className="hidden items-center gap-5 text-[0.82rem] font-medium lg:flex xl:gap-6">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    activeOptions={{ exact: item.href === "/" }}
                    activeProps={{ className: "text-foreground" }}
                    className="nav-link inline-block text-muted-foreground transition-colors duration-250 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MagneticButton href="/contact" className="hidden px-5 py-2.5 lg:inline-flex">
              Get Started
            </MagneticButton>
            <CartDrawer />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass btn-3d flex h-11 w-11 shrink-0 items-center justify-center rounded-full lg:hidden"
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
          "section-dark fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-lg transition-opacity duration-250 ease-out lg:hidden",
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
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/30">
              <img
                src={logo}
                alt={`${company.name} logo`}
                width={44}
                height={44}
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
        <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
          {navigation.map((item) => (
            <li key={item.label} className="border-b border-border/60">
              <Link
                to={item.href}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.href === "/" }}
                className="block py-5 font-display text-2xl font-semibold transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-8 pb-12">
          <MagneticButton href="/contact" className="w-full" onClick={() => setOpen(false)}>
            Get Started
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
