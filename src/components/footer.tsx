import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { company, navigation, products } from "@/data/site";

const footerLinkClass =
  "inline-flex w-fit text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground";

export function Footer() {
  const footerNavigation = navigation.filter((item) => item.label !== "Shop");

  return (
    <footer className="section-dark relative border-t border-border/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.3fr] lg:gap-12 lg:px-8 lg:py-16">
        <div>
          <Link
            to="/"
            aria-label={`${company.name} home`}
            className="group inline-flex items-center gap-3"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/30">
              <img
                src={logo}
                alt={`${company.name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-xs font-bold tracking-[0.12em]">
              REINVENT <span className="text-primary">ENERGIES</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Expert solar solutions designed to reduce your carbon footprint and save on energy
            costs. Empowering your energy choices across Pakistan.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-foreground"
          >
            Talk to our team <span aria-hidden="true">→</span>
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61571068754603"
              target="_blank"
              rel="noreferrer"
              aria-label="Reinvent Energies on Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Facebook className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/reinventenergies1?stkn=bHljMGN0ZjA3OHY2"
              target="_blank"
              rel="noreferrer"
              aria-label="Reinvent Energies on Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {footerNavigation.map((item) => (
              <li key={item.label}>
                <Link to={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Solar products">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
            Products
          </h2>
          <ul className="mt-5 space-y-3">
            {products.map((product) => (
              <li key={product.name}>
                <Link to="/shop" className={footerLinkClass}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-4 text-sm not-italic">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
            Contact
          </h2>
          <div>
            <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-gold uppercase">
              Head Office
            </span>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              {company.headOfficeAddress}
            </p>
          </div>
          <div>
            <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-gold uppercase">
              Sub Office
            </span>
            <p className="mt-1 leading-relaxed text-muted-foreground">{company.address}</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <a href={company.phoneHref} className={footerLinkClass}>
              {company.phone}
            </a>
            <a href={company.additionalPhoneHref} className={footerLinkClass}>
              {company.additionalPhone}
            </a>
            <a href={`mailto:${company.email}`} className={footerLinkClass}>
              {company.email}
            </a>
          </div>
        </address>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-xs text-muted-foreground">
            © 2026 REINVENT ENERGIES. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">Designed for a sustainable Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
