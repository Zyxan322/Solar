import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const faqs = [
  {
    q: "How long does a solar installation take?",
    a: "Most residential systems are installed in 2–4 days after the site assessment. Commercial rooftops usually take one to three weeks depending on array size and structural work.",
  },
  {
    q: "Will solar keep my home running during load shedding?",
    a: "Only with storage. A hybrid inverter paired with a lithium battery keeps your essential loads — lights, fans, refrigeration, internet — running through outages automatically.",
  },
  {
    q: "Do you handle net metering approvals?",
    a: "Yes. We prepare the single-line diagrams and documentation, submit the application on your behalf and follow it through to bidirectional meter installation.",
  },
  {
    q: "What warranty do the products carry?",
    a: "Tier-1 modules typically carry a 25-year performance warranty, inverters 5–10 years, and batteries 5–10 years depending on chemistry. Our workmanship is covered separately.",
  },
  {
    q: "How much maintenance does a system need?",
    a: "Very little — periodic panel cleaning and an annual electrical inspection. We offer scheduled maintenance plans and 24/7 support for systems we install.",
  },
  {
    q: "Do you work outside Gujranwala?",
    a: "Yes. We serve Gujranwala and the surrounding Punjab region, including Lahore, Sialkot, Gujrat and Wazirabad for residential and commercial projects.",
  },
];

export function Faq() {
  return (
    <section className="relative py-24 lg:py-32">
      <SectionHeading
        eyebrow="Questions, answered"
        title="Everything you want to know before going solar"
        subtitle="Still unsure about something? Our engineers are happy to talk it through — no obligation."
      />

      <div className="mx-auto mt-14 max-w-3xl px-5 lg:px-8">
        <Accordion type="single" collapsible className="grid gap-4">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <AccordionItem
                value={item.q}
                className="glass hover-lift rounded-2xl border border-border px-6 transition-colors duration-500 hover:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
