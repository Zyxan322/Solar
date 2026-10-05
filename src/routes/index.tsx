import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { PartnersMarquee } from "@/components/partners-marquee";
import { IntroSection } from "@/components/intro-section";
import { Services } from "@/components/services";
import { ParallaxEnergy } from "@/components/parallax-energy";
import { ProductShowcase } from "@/components/product-showcase";
import { Statistics } from "@/components/statistics";
import { WhyChoose } from "@/components/why-choose";
import { Process } from "@/components/process";
import { SavingsCalculator } from "@/components/savings-calculator";
import { BeforeAfter } from "@/components/before-after";
import { Testimonials } from "@/components/testimonials";
import { Faq, faqs } from "@/components/faq";
import { Capabilities } from "@/components/capabilities";
import { ProjectHighlights } from "@/components/project-highlights";
import { CallToAction } from "@/components/call-to-action";
import { Scroll3D } from "@/components/ui/scroll-3d";
import { company } from "@/data/site";

const title =
  "Reinvent Energies | Premium Solar Solutions & Installation in Pakistan";
const description =
  "Reinvent Energies provides professional solar panel installation, inverter solutions, energy consultation, and renewable energy systems for residential and commercial clients in Pakistan.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "geo.region", content: "PK-PB" },
      { name: "geo.placename", content: "Gujranwala, Pakistan" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Reinvent Energies",
          description,
          telephone: company.phone,
          email: company.email,
          slogan: company.tagline,
          areaServed: "Pakistan",
          address: {
            "@type": "PostalAddress",
            streetAddress: "8 Sutlej Commercial, DC Colony",
            addressLocality: "Gujranwala",
            addressCountry: "PK",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <div className="[perspective:1600px]">
        <PartnersMarquee />
        <Scroll3D shift={70}>
          <IntroSection />
        </Scroll3D>
        <Scroll3D shift={80}>
          <Services />
        </Scroll3D>
        <Scroll3D shift={80} rotate={6}>
          <Capabilities />
        </Scroll3D>
        <Scroll3D shift={70} rotate={5}>
          <ProjectHighlights />
        </Scroll3D>
        <ParallaxEnergy />
        <Scroll3D shift={90} rotate={7}>
          <ProductShowcase />
        </Scroll3D>
        <Scroll3D shift={60}>
          <Statistics />
        </Scroll3D>
        <Scroll3D shift={80} rotate={7}>
          <WhyChoose />
        </Scroll3D>
        <Scroll3D shift={70}>
          <Process />
        </Scroll3D>
        <Scroll3D shift={70}>
          <SavingsCalculator />
        </Scroll3D>
        <Scroll3D shift={80}>
          <BeforeAfter />
        </Scroll3D>
        <Scroll3D shift={70}>
          <Testimonials />
        </Scroll3D>
        <Scroll3D shift={60}>
          <Faq />
        </Scroll3D>
        <Scroll3D shift={70} rotate={7}>
          <CallToAction />
        </Scroll3D>
      </div>
    </>
  );
}

