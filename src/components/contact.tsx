import { useState } from "react";
import { company, serviceOptions } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { MagneticButton } from "./ui/magnetic-button";

const fieldClass =
  "peer w-full rounded-xl border border-border bg-surface/50 px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-all duration-300 [transition-timing-function:var(--ease-cinema)] focus:border-primary/60 focus:bg-surface-2/60 focus:shadow-[var(--shadow-glow)]";
const labelClass =
  "pointer-events-none absolute top-2 left-4 text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase transition-colors peer-focus:text-primary";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Request a Solar Consultation"
        subtitle="Tell us about your property and energy use — our engineers will get back to you with a tailored recommendation."
      />

      <div className="mx-auto mt-16 grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal>
          <div className="glass glow-border card-3d h-full rounded-3xl p-8">
            <h3 className="font-display text-xl font-semibold">Reinvent Energies</h3>
            <p className="mt-2 text-sm text-muted-foreground">{company.tagline}</p>

            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="text-[0.68rem] tracking-[0.2em] text-primary uppercase">
                  Head Office
                </dt>
                <dd className="mt-1.5 text-muted-foreground">{company.headOfficeAddress}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.2em] text-primary uppercase">
                  Sub Office
                </dt>
                <dd className="mt-1.5 text-muted-foreground">{company.address}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.2em] text-primary uppercase">Phone</dt>
                <dd className="mt-1.5">
                  <a href={company.phoneHref} className="nav-link text-foreground">
                    {company.phone}
                  </a>
                  <br />
                  <a href={company.additionalPhoneHref} className="nav-link text-foreground">
                    {company.additionalPhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.2em] text-primary uppercase">Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${company.email}`}
                    className="nav-link break-all text-foreground"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href="https://www.google.com/maps/search/?api=1&query=DC+Colony+Gujranwala+Pakistan"
              target="_blank"
              rel="noreferrer"
              className="group relative mt-8 block overflow-hidden rounded-2xl border border-border"
              aria-label="Open the Gujranwala location in Google Maps"
            >
              <div className="grid-lines relative h-44 bg-surface-2/60">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="relative grid h-12 w-12 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/25" />
                    <span className="relative h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_color-mix(in_oklab,var(--color-primary)_80%,transparent)]" />
                  </span>
                </div>
                <span className="absolute bottom-3 left-4 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  DC Colony, Gujranwala — open in Maps →
                </span>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            className="glass glow-border rounded-3xl p-8 transition-shadow duration-250 hover:shadow-[var(--shadow-elegant)]"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required placeholder=" " className={fieldClass} />
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  className={fieldClass}
                />
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
              </div>
              <div className="relative">
                <input id="phone" name="phone" type="tel" placeholder=" " className={fieldClass} />
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
              </div>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  defaultValue={serviceOptions[0]}
                  className={`${fieldClass} appearance-none`}
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-surface">
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="service" className={labelClass}>
                  Service Required
                </label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder=" "
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticButton type="submit">Request a Consultation</MagneticButton>
              {sent ? (
                <p className="text-sm text-primary" role="status">
                  Thank you — we&apos;ll be in touch shortly. You can also call {company.phone} or{" "}
                  {company.additionalPhone}.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
