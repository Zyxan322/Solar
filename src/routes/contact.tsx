import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Scroll3D } from "@/components/ui/scroll-3d";
import heroImage from "@/assets/page-contact.jpg";
import { Contact } from "@/components/contact";

const title = "Contact Reinvent Energies | Solar Consultation in Gujranwala";
const description =
  "Request a solar consultation. Call +92-55-3419847 or visit 8 Sutlej Commercial, DC Colony, Gujranwala, Pakistan.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Request a Consultation"
        description="Tell us about your property and energy needs — our team will design the right solar system for you."
        image={heroImage}
        imageAlt="Modern solar-powered office building at dusk"
        highlights={["Free Consultation", "Fast Response", "Local Team"]}
      />
      <Scroll3D shift={50} rotate={5}>
        <Contact />
      </Scroll3D>
    </>
  );
}
