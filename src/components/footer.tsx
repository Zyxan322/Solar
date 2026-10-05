import { Link } from "@tanstack/react-router";
import { company, navigation } from "@/data/site";
import logo from "@/assets/logo.png.asset.json";
import { Tilt3D } from "./ui/tilt-3d";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

const footerLinkClass = cn(
  "group relative inline-block text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground",
  "hover:translate-x-1 transition-transform duration-300",
);

export function Footer() {
  return (
    <footer className="section-dark aurora-green relative overflow-hidden border-t border-border">
      {/* subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-22">
        {/* brand column */}
        <Reveal delay={0}>
          <Tilt3D intensity={8} lift={18}>
            <div className="glass glow-border card-3d h-full rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <span className="relative grid h-13 w-13 place-items-center">
                  <span className="animate-halo-pulse absolute inset-0 rounded-full bg-primary/25 blur-lg" />
                  <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-primary/50" />
                  <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-primary/50 shadow-[0_6px_22px_-8px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
                    <img
                      src={logo.url}
                      alt=""
                      width={56}
                      height={56}
                      className="h-[116%] w-[116%] max-w-none object-contain"
                    />
                  </span>
                </span>
                <span className="font-display text-sm font-bold tracking-[0.18em]">
                  REINVENT <span className="text-primary">ENERGIES</span>
                </span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Expert solar solutions designed to reduce your carbon footprint
                and save on energy costs. Empowering your energy choices across
                Pakistan.
              </p>
              <div className="mt-6 flex gap-3">
                <SocialIcon label="Facebook" />
                <SocialIcon label="Instagram" />
                <SocialIcon label="LinkedIn" />
                <SocialIcon label="YouTube" />
              </div>
            </div>
          </Tilt3D>
        </Reveal>

        {/* navigation column */}
        <Reveal delay={120}>
          <Tilt3D intensity={8} lift={18}>
            <div className="glass glow-border card-3d h-full rounded-3xl p-8">
              <h2 className="text-[0.68rem] tracking-[0.22em] text-primary uppercase">
                Navigation
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      activeOptions={{ exact: item.href === "/" }}
                      activeProps={{ className: "text-foreground" }}
                      className={footerLinkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Tilt3D>
        </Reveal>

        {/* contact column */}
        <Reveal delay={240}>
          <Tilt3D intensity={8} lift={18}>
            <div className="glass glow-border card-3d h-full rounded-3xl p-8">
              <h2 className="text-[0.68rem] tracking-[0.22em] text-primary uppercase">
                Contact
              </h2>
              <address className="mt-5 space-y-4 text-sm not-italic">
                <div>
                  <span className="block text-[0.65rem] tracking-[0.18em] text-gold uppercase">
                    Address
                  </span>
                  <p className="mt-1 text-muted-foreground">
                    {company.address}
                  </p>
                </div>
                <div>
                  <span className="block text-[0.65rem] tracking-[0.18em] text-gold uppercase">
                    Phone
                  </span>
                  <a
                    href={company.phoneHref}
                    className="nav-link mt-1 inline-block text-foreground"
                  >
                    {company.phone}
                  </a>
                </div>
                <div>
                  <span className="block text-[0.65rem] tracking-[0.18em] text-gold uppercase">
                    Email
                  </span>
                  <a
                    href={`mailto:${company.email}`}
                    className="nav-link mt-1 inline-block break-all text-foreground"
                  >
                    {company.email}
                  </a>
                </div>
              </address>
            </div>
          </Tilt3D>
        </Reveal>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:flex-row lg:px-8">
          <p className="text-xs text-muted-foreground">
            © 2026 REINVENT ENERGIES. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for a sustainable Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="group grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2/60 text-muted-foreground transition-all duration-300 [transition-timing-function:var(--ease-cinema)] hover:scale-110 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
    >
      <span className="h-4 w-4 rounded-full bg-current opacity-80 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
