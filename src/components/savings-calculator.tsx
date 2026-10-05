import { useMemo, useState } from "react";

import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";
import { MagneticButton } from "./ui/magnetic-button";
import { CountUp } from "./ui/count-up";


/**
 * Indicative sizing model. Figures are estimates for guidance only —
 * a real quote comes from the on-site assessment.
 */
function estimate(monthlyBill: number, roofFactor: number) {
  const tariff = 55; // PKR per unit (indicative)
  const units = monthlyBill / tariff;
  const sunHours = 4.8 * roofFactor; // Gujranwala average, adjusted for roof quality
  const sizeKw = Math.max(1, Math.round((units / (sunHours * 30)) * 10) / 10);
  const monthlySavings = Math.round(monthlyBill * 0.82);
  const systemCost = Math.round(sizeKw * 165000);
  const paybackYears = Math.max(
    1,
    Math.round((systemCost / (monthlySavings * 12)) * 10) / 10,
  );
  const co2 = Math.round(sizeKw * 1.4); // tonnes CO2 avoided per year
  return { sizeKw, monthlySavings, systemCost, paybackYears, co2 };
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(45000);
  const [roof, setRoof] = useState(1);

  const r = useMemo(() => estimate(bill, roof), [bill, roof]);

  const results = [
    {
      label: "Recommended system",
      value: r.sizeKw,
      decimals: 1,
      prefix: "",
      suffix: " kW",
    },
    {
      label: "Monthly saving",
      value: r.monthlySavings,
      decimals: 0,
      prefix: "Rs ",
      suffix: "",
    },
    {
      label: "Indicative cost",
      value: r.systemCost,
      decimals: 0,
      prefix: "Rs ",
      suffix: "",
    },
    {
      label: "Payback",
      value: r.paybackYears,
      decimals: 1,
      prefix: "",
      suffix: " yrs",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <SectionHeading
        eyebrow="Solar Savings Estimator"
        title="See what solar could do for your bill"
        subtitle="Move the sliders to get an indicative system size and saving. We confirm the exact figures during your free energy consultation."
      />

      <div className="scene-3d mx-auto mt-16 grid max-w-6xl gap-6 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <Reveal>
          <div className="glass glow-border card-3d h-full rounded-3xl p-8">
            <label
              htmlFor="bill"
              className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase"
            >
              Average monthly electricity bill
            </label>
            <p className="mt-3 font-display text-4xl font-bold">
              <span className="text-gradient">
                <CountUp value={bill} prefix="Rs " group duration={700} />
              </span>
            </p>
            <input
              id="bill"
              type="range"
              min={10000}
              max={400000}
              step={5000}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
            />

            <p className="mt-10 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Roof sunlight quality
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Shaded", value: 0.8 },
                { label: "Average", value: 1 },
                { label: "Open roof", value: 1.15 },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setRoof(o.value)}
                  aria-pressed={roof === o.value}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-500 [transition-timing-function:var(--ease-cinema)] hover:-translate-y-1 ${
                    roof === o.value
                      ? "border-primary bg-primary/10 text-primary shadow-[var(--shadow-glow)]"
                      : "border-border bg-surface/50 text-muted-foreground"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div className="mt-10">
              <MagneticButton href="/contact">
                Get an exact quote
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <Tilt3D intensity={10} lift={18} className="h-full">
            <div className="section-dark aurora-green glow-border relative h-full overflow-hidden rounded-3xl p-8">
              <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                {results.map((item, i) => (
                  <div
                    key={item.label}
                    className="glass rounded-2xl px-5 py-6"
                    style={{ transform: `translateZ(${34 - i * 4}px)` }}
                  >
                    <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold text-gradient">
                      <CountUp
                        value={item.value}
                        decimals={item.decimals}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        group
                        duration={900}
                      />
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="relative mt-6 text-sm text-muted-foreground"
                style={{ transform: "translateZ(18px)" }}
              >
                Roughly{" "}
                <span className="font-semibold text-primary">
                  <CountUp value={r.co2} suffix=" tonnes" duration={900} />
                </span>{" "}
                of CO₂ avoided every year — the same as planting about{" "}
                <CountUp value={r.co2 * 45} group duration={900} /> trees.
              </p>
              <p className="relative mt-3 text-xs text-muted-foreground/80">
                Estimates only, based on average Gujranwala irradiance and
                indicative tariffs.
              </p>
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}
