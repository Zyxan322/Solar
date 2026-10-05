import { statistics } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { CountUp } from "./ui/count-up";
import { Tilt3D } from "./ui/tilt-3d";

function Stat({
  value,
  suffix,
  label,
  visible,
}: {
  value: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  return (
    <Tilt3D intensity={14} lift={18} className="h-full">
      <div className="glass glow-border card-3d h-full overflow-hidden rounded-2xl px-6 py-9 text-center">
        <p
          className="font-display text-4xl font-bold sm:text-5xl"
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="text-gradient">
            {visible ? (
              <CountUp value={value} suffix={suffix} onView={false} group />
            ) : (
              <span className="tabular-nums">0{suffix}</span>
            )}
          </span>
        </p>
        <p
          className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase"
          style={{ transform: "translateZ(22px)" }}
        >
          {label}
        </p>
      </div>
    </Tilt3D>
  );
}


export function Statistics() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);

  return (
    <section className="section-dark aurora-green relative overflow-hidden py-24 lg:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
      >
        {statistics.map((s) => (
          <Stat key={s.label} {...s} visible={visible} />
        ))}
      </div>
    </section>
  );
}
