import heroVilla from "@/assets/hero-1.jpg";
import heroCommercial from "@/assets/hero-2.jpg";
import heroCity from "@/assets/hero-3.jpg";
import heroPanels from "@/assets/hero-4.jpg";
import heroIndustrial from "@/assets/hero-5.jpg";
import serviceInstall from "@/assets/service-install.jpg";
import serviceInverter from "@/assets/service-inverter.jpg";
import serviceConsult from "@/assets/service-consult.jpg";
import productPanel from "@/assets/product-panel.jpg";
import productInverter from "@/assets/product-inverter.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productMounting from "@/assets/product-mounting.jpg";
import dcBreaker20 from "@/assets/products/WhatsApp Image 2026-10-20 at 3.12.02 PM (1).jpeg";
import dcBreaker25 from "@/assets/products/WhatsApp Image 2026-10-20 at 3.12.03 PM.jpeg";
import dcBreaker32 from "@/assets/products/WhatsApp Image 2026-10-20 at 3.12.03 PM (1).jpeg";
import acBreaker63SinglePole from "@/assets/products/WhatsApp Image 2026-10-20 at 3.12.08 PM.jpeg";
import acBreaker63FourPole from "@/assets/products/WhatsApp Image 2026-10-20 at 3.12.09 PM.jpeg";
import chintNxb63TwoPole from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.21 AM.jpeg";
import chintNxb63TwoPoleAlt from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.22 AM.jpeg";
import chintNxb63TwoPoleDetail from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.26 AM.jpeg";
import moraAesC63Breakers from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.33 AM.jpeg";
import moraAesC63BreakersAlt from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.42 AM.jpeg";
import moraSurgeProtection from "@/assets/products/WhatsApp Image 2026-11-04 at 9.26.32 AM.jpeg";
import aboutImage from "@/assets/about.jpg";

export const company = {
  name: "REINVENT ENERGIES",
  tagline: "Empowering Your Energy Choices",
  phone: "+92-55-3419847",
  phoneHref: "tel:+92553419847",
  additionalPhone: "+92 322 5478991",
  additionalPhoneHref: "tel:+923225478991",
  whatsappNumber: "+923225478991",
  email: "info@reinventenergies.com",
  headOfficeAddress: "Plaza #30, Rachna Villas Block, Commercial Zone 1, DHA Gujranwala, Pakistan",
  address: "8 Sutlej Commercial, DC Colony, Gujranwala, Pakistan",
  city: "Gujranwala",
  country: "Pakistan",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  {
    image: heroVilla,
    alt: "Luxury modern villa with a rooftop solar panel array at golden hour",
  },
  {
    image: heroCommercial,
    alt: "Large commercial rooftop solar installation seen from the air",
  },
  {
    image: heroCity,
    alt: "Rooftop solar panels overlooking a modern city skyline at sunset",
  },
  {
    image: heroPanels,
    alt: "Close-up of photovoltaic solar panel cells reflecting sunlight",
  },
  {
    image: heroIndustrial,
    alt: "Industrial renewable energy installation with engineers inspecting solar arrays",
  },
];

export const advantages = [
  {
    title: "Expert Installation",
    body: "Our team of certified professionals ensures precise solar panel installation. With years of experience, we guarantee effective performance and longevity for your energy solutions.",
    icon: "wrench",
  },
  {
    title: "High-Quality Products",
    body: "We offer premium solar products, including advanced solar panels and efficient inverters, to meet the highest standards of quality and reliability.",
    icon: "shield",
  },
  {
    title: "Environmental Impact",
    body: "By choosing our solar solutions, you actively contribute to reducing your carbon footprint while improving energy efficiency.",
    icon: "leaf",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Solar Panel Installation",
    body: "Professional solar panel installation services designed for optimal performance, reliability, and long-term energy savings.",
    image: serviceInstall,
    alt: "Technicians installing solar panels on a residential rooftop",
    icon: "sun",
  },
  {
    number: "02",
    title: "Inverter Solutions",
    body: "High-quality inverter systems designed to maximize energy efficiency and reliably convert solar energy for immediate use or storage.",
    image: serviceInverter,
    alt: "Modern hybrid solar inverter mounted on a utility wall",
    icon: "zap",
  },
  {
    number: "03",
    title: "Energy Consultation",
    body: "Expert energy consultations to identify the best solar solution for your specific requirements, maximizing savings and sustainability.",
    image: serviceConsult,
    alt: "Energy consultant reviewing solar production data on a rooftop",
    icon: "chart",
  },
];

import {
  brands,
  getProductCategoryLabel,
  productCategories,
  productRecords,
  type ProductRecord,
} from "./catalog";

export { brands, getProductCategoryLabel, productCategories, productRecords };

export type Product = ProductRecord & { image: string; alt: string; gallery?: string[] };

const productImages: Record<string, { image: string; alt: string; gallery?: string[] }> = {
  "solar-panels": {
    image: productPanel,
    alt: "Premium monocrystalline solar panel studio product photograph",
  },
  "hybrid-inverter": {
    image: productInverter,
    alt: "Modern hybrid solar inverter studio product photograph",
  },
  "battery-storage": {
    image: productBattery,
    alt: "Wall-mounted lithium home battery storage unit",
  },
  "mounting-structures": {
    image: productMounting,
    alt: "Aluminium solar panel mounting rails, clamps and brackets",
  },
  "chint-nb1-63dc-c20a": {
    image: dcBreaker20,
    alt: "CHINT NB1-63DC C20A two-pole solar DC circuit breaker",
  },
  "chint-nb1-63dc-c25a": {
    image: dcBreaker25,
    alt: "CHINT NB1-63DC C25A two-pole solar DC circuit breaker",
  },
  "chint-nb1-63dc-c32a": {
    image: dcBreaker32,
    alt: "CHINT NB1-63DC C32A two-pole solar DC circuit breaker",
  },
  "chint-nxb-63-c63-single-pole": {
    image: acBreaker63SinglePole,
    alt: "CHINT NXB-63 C63 single-pole AC circuit breaker",
  },
  "chint-nxb-63-c63-four-pole": {
    image: acBreaker63FourPole,
    alt: "CHINT NXB-63 C63 four-pole AC circuit breaker",
  },
  "chint-nxb-63-c63-two-pole": {
    image: chintNxb63TwoPole,
    alt: "CHINT NXB-63 C63 two-pole AC circuit breaker",
    gallery: [chintNxb63TwoPoleAlt, chintNxb63TwoPoleDetail],
  },
  "mora-aes-c63-breakers": {
    image: moraAesC63Breakers,
    alt: "MORA AES C63 circuit breakers",
    gallery: [moraAesC63BreakersAlt],
  },
  "mora-aes-20dcpv-1000v": {
    image: moraSurgeProtection,
    alt: "MORA AES-20DCPV/1000V photovoltaic DC surge protection device",
  },
};

export const products: Product[] = productRecords.map((product) => {
  const media = productImages[product.id];
  if (!media) {
    throw new Error(`Missing image mapping for catalog product "${product.id}".`);
  }
  return { ...product, ...media };
});

export function getProductQuoteUrl(product: Product) {
  const brand = brands.find((entry) => entry.id === product.brandId)?.name;
  const details = [
    `Hello, I would like a quote for ${product.name}.`,
    brand ? `Brand: ${brand}` : null,
    product.model ? `Model: ${product.model}` : null,
    `Product ID: ${product.id}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${company.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(details)}`;
}

/** Edit these figures in one place — keep them accurate to the business. */
export const statistics = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Solar Installations" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 24, suffix: "/7", label: "Energy Support" },
];

export const processSteps = [
  {
    number: "01",
    title: "Energy Consultation",
    body: "We review your consumption, tariffs and goals to size the right system.",
    image: serviceConsult,
    alt: "Consultant discussing a solar energy plan",
  },
  {
    number: "02",
    title: "Site Assessment",
    body: "Roof structure, shading and orientation are surveyed on-site.",
    image: aboutImage,
    alt: "Engineer assessing a rooftop for solar installation",
  },
  {
    number: "03",
    title: "System Design",
    body: "Panel layout, inverter and storage are engineered around your load profile.",
    image: heroPanels,
    alt: "Detailed view of photovoltaic panel surface",
  },
  {
    number: "04",
    title: "Professional Installation",
    body: "Certified crews install mounting, modules and electrical work to standard.",
    image: serviceInstall,
    alt: "Certified installers mounting solar panels",
  },
  {
    number: "05",
    title: "System Activation",
    body: "Commissioning, net-metering support and handover with monitoring set up.",
    image: serviceInverter,
    alt: "Commissioned hybrid inverter running a solar system",
  },
];

export const testimonials = [
  {
    quote:
      "Reinvent Energies transformed my home with their expert installation. I've seen a significant reduction in my energy bills and a noticeable difference in my carbon footprint.",
    name: "Michael Johnson",
    role: "Residential Client",
  },
  {
    quote:
      "The team at Reinvent Energies was knowledgeable and professional. They guided us through every step, making the transition to solar a breeze for our business.",
    name: "Sarah Davis",
    role: "Commercial Client",
  },
  {
    quote:
      "We couldn't be happier with the solar system installed by Reinvent Energies. Their commitment to quality and customer satisfaction is truly commendable.",
    name: "David Smith",
    role: "Residential Client",
  },
];

export const serviceOptions = [
  "Solar Panel Installation",
  "Inverter Solutions",
  "Battery Storage",
  "Energy Consultation",
  "Maintenance & Support",
];

export { aboutImage };

/** Sourced from the official REINVENT ENERGIES company profile. */
export const vision =
  "To be a premier renewable energy provider in Pakistan, empowering communities with innovative and sustainable power solutions.";

export const mission =
  "To design and implement high-performance energy systems that offer long-term value, efficiency, and operational reliability.";

export const values = [
  {
    title: "Sustainability",
    body: "Committed to promoting clean energy and reducing environmental impact.",
  },
  {
    title: "Quality Assurance",
    body: "High standards in design, equipment selection, and execution.",
  },
  {
    title: "Integrity & Transparency",
    body: "Professional conduct, clear communication, and trust with clients and partners.",
  },
];

export const capabilities = [
  {
    group: "Solar Plants & Solutions",
    items: [
      "Residential Solar Solutions",
      "Commercial Solar Systems",
      "Industrial Solar Power Projects",
      "Agricultural Solar Projects",
    ],
  },
  {
    group: "Electrical Panels & Control Systems",
    items: [
      "Main & Distribution Panels (440/220V)",
      "Motor Control Panels (MCCs)",
      "Power Factor Improvement Panels",
      "ATS Control Panels",
    ],
  },
  {
    group: "Security & Support Systems",
    items: ["CCTV & Surveillance", "Fire Alarms", "Electrical Fencing"],
  },
];

export const projectHighlights = [
  { kw: 400, type: "On-Grid Industrial Solar Project" },
  { kw: 200, type: "On-Grid Solar Installation" },
  { kw: 50, type: "On-Grid Solar Systems" },
  { kw: 20, type: "On-Grid Solar Setup" },
  { kw: 18, type: "Hybrid Solar — Engineering 30 Core, Gujranwala Cantt" },
  { kw: 15, type: "On-Grid Solar Project" },
  { kw: 8, type: "Hybrid Solar Installations (multiple sites)" },
];

export const systemTypes = [
  {
    title: "On-Grid Solar System",
    body: "Connected to the utility grid. Reduces electricity bills and supports net metering.",
  },
  {
    title: "Hybrid Solar System",
    body: "Integrated with batteries and the grid for backup and maximum power security.",
  },
];
