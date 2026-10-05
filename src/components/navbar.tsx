import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { navigation, company } from "@/data/site";
import { MagneticButton } from "./ui/magnetic-button";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setVisible(y < 80 || y <= lastY);
        lastY = y;
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (y / max) * 100 : 0);
        ticking = false;
      });
      ticking = true;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
        className={cn(
          "section-dark fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-cinema)]",
          scrolled
            ? "border-b border-border bg-background/70 py-3 shadow-[var(--shadow-elegant)] backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent py-6 backdrop-blur-0",
          !visible && !open && "-translate-y-full",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 transition-opacity duration-700",
            scrolled ? "opacity-0" : "opacity-100",
          )}
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 72%, transparent) 0%, color-mix(in oklab, var(--background) 25%, transparent) 55%, transparent 100%)",
          }}
        />
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label={`${company.name} home`}
          >
            <span className="relative grid h-14 w-14 shrink-0 place-items-center">
              <span className="animate-halo-pulse absolute -inset-1 rounded-full bg-primary/25 blur-xl" />
              <span className="animate-spin-slow absolute inset-[-6%] rounded-full border border-dashed border-primary/60" />
              <span className="animate-spin-rev absolute inset-[4%] rounded-full border border-primary/35" />
              <span className="brand-ring absolute inset-[-10%] opacity-60" />
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-[2.5px] ring-primary/60 shadow-[0_8px_28px_-8px_color-mix(in_oklab,var(--color-primary)_75%,transparent)] transition-all duration-500 [transition-timing-function:var(--ease-cinema)] group-hover:scale-110 group-hover:rotate-3 group-hover:ring-primary/90">
                <img
                  src={logo}
                  alt={`${company.name} logo`}
                  width={56}
                  height={56}
                  className="h-[118%] w-[118%] max-w-none object-contain"
                />
              </span>
            </span>
            <span className={cn("truncate font-display text-sm font-bold tracking-[0.18em] transition-all duration-500 sm:text-base", !scrolled && "drop-shadow-[0_2px_12px_color-mix(in_oklab,var(--background)_60%,transparent)]")}>
              REINVENT <span className="text-primary">ENERGIES</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            <ul className={cn("flex items-center gap-8 text-sm", !scrolled && "drop-shadow-[0_2px_10px_color-mix(in_oklab,var(--background)_55%,transparent)]")}>
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    activeOptions={{ exact: item.href === "/" }}
                    activeProps={{ className: "text-foreground" }}
                    className="nav-link inline-block text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MagneticButton href="/contact" className="px-6 py-2.5">
              Get Started
            </MagneticButton>
          </div>

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
        </nav>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--gradient-primary)] shadow-[0_0_14px_color-mix(in_oklab,var(--color-primary)_70%,transparent)]"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </header>

      <div
        className={cn(
          "section-dark fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-2xl transition-all duration-500 [transition-timing-function:var(--ease-cinema)] lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="font-display text-sm font-bold tracking-[0.18em]">
            REINVENT <span className="text-primary">ENERGIES</span>
          </span>
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
          {navigation.map((item, i) => (
            <li
              key={item.label}
              style={{ transitionDelay: `${open ? 80 + i * 60 : 0}ms` }}
              className={cn(
                "border-b border-border/60 transition-all duration-500 [transition-timing-function:var(--ease-cinema)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <Link
                to={item.href}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.href === "/" }}
                className="block py-5 font-display text-3xl font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-8 pb-12">
          <MagneticButton
            href="/contact"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Get Started
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
