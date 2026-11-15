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
import productAccessories from "@/assets/product-accessories.svg";
import productVfd from "@/assets/product-vfd.svg";
import {
  getChintCircuitImage,
  getMoraCircuitImage,
} from "./product-assets";
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

const normalizeProductText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[_/\\]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractPowerTerms = (value: string) =>
  [...new Set((value.match(/\d+(?:[.,]\d+)?\s*(?:kw|w)/gi) ?? []).map((term) => term.replace(/\s+/g, "").toLowerCase()))];

const solarAssetModules = import.meta.glob("/src/assets/Solar/**/*.{webp,jpg,jpeg,jfif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const inverterAssetModules = import.meta.glob("/src/assets/inverter/**/*.{webp,jpg,jpeg,jfif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const solarAssetEntries = Object.entries(solarAssetModules).map(([path, src]) => {
  const fileName = path.split("/").pop() ?? path;
  return {
    src: String(src),
    fileName,
    normalizedName: normalizeProductText(fileName.replace(/\.[^/.]+$/, "")),
    folderName: normalizeProductText(path.split("/").slice(-2, -1)[0] ?? ""),
  };
});

const inverterAssetEntries = Object.entries(inverterAssetModules).map(([path, src]) => {
  const fileName = path.split("/").pop() ?? path;
  return {
    src: String(src),
    fileName,
    normalizedName: normalizeProductText(fileName.replace(/\.[^/.]+$/, "")),
    folderName: normalizeProductText(path.split("/").slice(-2, -1)[0] ?? ""),
  };
});

function resolveProductAsset(product: ProductRecord): string | null {
  const categoryAssets =
    product.categoryId === "solar-panels" ? solarAssetEntries :
    product.categoryId === "solar-inverters" || product.categoryId === "hybrid-inverters" ? inverterAssetEntries :
    [];

  if (!categoryAssets.length) return null;

  const productKey = normalizeProductText(product.id.replace(/^doc-/, ""));
  const productName = normalizeProductText(product.name);
  const brandSlug = normalizeProductText(product.brandId ?? "");
  const powerTerms = extractPowerTerms(`${product.id} ${product.name}`);

  const exactMatch = categoryAssets.find(
    (asset) =>
      asset.normalizedName === productKey ||
      asset.normalizedName.includes(productKey) ||
      productKey.includes(asset.normalizedName),
  );

  if (exactMatch) {
    return exactMatch.src;
  }

  const brandPowerMatch = categoryAssets.find((asset) => {
    const folderMatch =
      !brandSlug || asset.folderName.includes(brandSlug) || brandSlug.includes(asset.folderName);
    const powerMatch =
      powerTerms.length === 0 ||
      extractPowerTerms(asset.fileName).some((term) => powerTerms.includes(term));
    const nameMatch =
      !productName ||
      asset.normalizedName.includes(productName) ||
      productName.includes(asset.normalizedName);
    return (folderMatch && powerMatch) || (folderMatch && nameMatch);
  });

  return brandPowerMatch?.src ?? null;
}

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
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.23 AM (1).jpeg"),
    alt: "CHINT NB1-63DC C20A two-pole solar DC circuit breaker",
  },
  "chint-nb1-63dc-c25a": {
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.22 AM.jpeg"),
    alt: "CHINT NB1-63DC C25A two-pole solar DC circuit breaker",
  },
  "chint-nb1-63dc-c32a": {
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.26 AM.jpeg"),
    alt: "CHINT NB1-63DC C32A two-pole solar DC circuit breaker",
  },
  "chint-nxb-63-c63-single-pole": {
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.22 AM (1).jpeg"),
    alt: "CHINT NXB-63 C63 single-pole AC circuit breaker",
  },
  "chint-nxb-63-c63-four-pole": {
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.25 AM.jpeg"),
    alt: "CHINT NXB-63 C63 four-pole AC circuit breaker",
  },
  "chint-nxb-63-c63-two-pole": {
    image: getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.21 AM.jpeg"),
    alt: "CHINT NXB-63 C63 two-pole AC circuit breaker",
    gallery: [
      getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.22 AM.jpeg"),
      getChintCircuitImage("WhatsApp Image 2026-11-04 at 9.26.26 AM.jpeg"),
    ],
  },
  "mora-aes-c63-breakers": {
    image: getMoraCircuitImage("AES C63.png"),
    alt: "MORA AES C63 AC miniature circuit breaker",
    gallery: [
      getMoraCircuitImage("WhatsApp Image 2026-11-04 at 9.26.33 AM.jpeg"),
      getMoraCircuitImage("WhatsApp Image 2026-11-04 at 9.26.42 AM.jpeg"),
    ],
  },
  "mora-aes-988-63a": {
    image: getMoraCircuitImage("AES-988 63A.png"),
    alt: "MORA AES-988 63A AC circuit breaker",
  },
  "mora-aes-dc-c63": {
    image: getMoraCircuitImage("AES-DC C63.png"),
    alt: "MORA AES-DC C63 two-pole DC circuit breaker",
  },
  "mora-afs-125-dc-c125": {
    image: getMoraCircuitImage("AFS-125-DC C125.png"),
    alt: "MORA AFS-125-DC C125 two-pole 1000V DC circuit breaker",
  },
  "mora-aes-20dcpv-1000v": {
    image: getMoraCircuitImage("WhatsApp Image 2026-11-04 at 9.26.32 AM.jpeg"),
    alt: "MORA AES-20DCPV/1000V photovoltaic DC surge protection device",
  },
  "mora-10-in-1-wifi-new-model": {
    image: getMoraCircuitImage("10 IN 1 WIFI NEW MODEL.png"),
    alt: "MORA 10-in-1 Wi-Fi smart protection device",
  },
  "mora-100a-breaker": {
    image: getMoraCircuitImage("100a.png"),
    alt: "MORA 100A circuit breaker",
  },
  "mora-125a-breaker-changeover": {
    image: getMoraCircuitImage("125A BREAKER TYPE CHANGE OVER.png"),
    alt: "MORA 125A breaker-type changeover switch",
  },
  "mora-160a-breaker": {
    image: getMoraCircuitImage("160A.png"),
    alt: "MORA 160A circuit breaker",
  },
  "mora-2-pole-ac-spd": {
    image: getMoraCircuitImage("2 POLE AC SPD.png"),
    alt: "MORA two-pole AC surge protection device",
  },
  "mora-2-pole-dc-spd": {
    image: getMoraCircuitImage("2 POLE DC SPD.png"),
    alt: "MORA two-pole DC surge protection device",
  },
  "mora-22mm-led-indicator": {
    image: getMoraCircuitImage("22mm LED INDICATOR.png"),
    alt: "MORA 22 mm LED indicator light",
  },
  "mora-4-pole-breaker": {
    image: getMoraCircuitImage("4 POLE.png"),
    alt: "MORA four-pole circuit breaker",
  },
  "mora-63a-elcb-2-pole": {
    image: getMoraCircuitImage("63 AMPERE ELCB 2 POLE.png"),
    alt: "MORA 63A two-pole ELCB",
  },
  "mora-ac-spd": {
    image: getMoraCircuitImage("AC SPD.png"),
    alt: "MORA AC surge protection device",
  },
  "mora-current-voltage-display": {
    image: getMoraCircuitImage("CURRENT AND VOLTAGE REAL-TIMEDISPLAY.png"),
    alt: "MORA real-time current and voltage display",
  },
  "mora-digital-time-switch": {
    image: getMoraCircuitImage("Digital Time Switch MOD.png"),
    alt: "MORA digital time switch module",
  },
  "mora-fire-extinguisher-ball": {
    image: getMoraCircuitImage("Fire Extinguisher Ball.png"),
    alt: "MORA fire extinguisher ball",
  },
  "mora-fire-extinguisher-device": {
    image: getMoraCircuitImage("Fire Extinguisher Device.png"),
    alt: "MORA automatic fire extinguisher device",
  },
  "mora-grand-aes-968": {
    image: getMoraCircuitImage("Grand AES-968.png"),
    alt: "MORA Grand AES-968 circuit breaker",
  },
  "mora-mccb-4-pole": {
    image: getMoraCircuitImage("MCCB MOLDED CASE CIRCUIT BREAKER 4 POLE.png"),
    alt: "MORA four-pole molded case circuit breaker",
  },
  "mora-mccb": {
    image: getMoraCircuitImage("MCCB MOLDED CASE CIRCUIT BREAKER.png"),
    alt: "MORA molded case circuit breaker",
  },
  "mora-molded-case-breaker": {
    image: getMoraCircuitImage("Molded Case Circuit Breaker.png"),
    alt: "MORA molded case circuit breaker",
  },
  "mora-aes-c63-alternate": {
    image: getMoraCircuitImage("MORA AES C63.png"),
    alt: "MORA AES C63 circuit breaker, alternate configuration",
  },
  "mora-ats": {
    image: getMoraCircuitImage("MORA ATS.png"),
    alt: "MORA automatic transfer switch",
  },
  "mora-changeover-relay-120a": {
    image: getMoraCircuitImage("MORA CHANGE OVER RELAY 120A.png"),
    alt: "MORA 120A changeover relay",
  },
  "mora-smart-10-in-1": {
    image: getMoraCircuitImage("MORA SMART 10 IN 1WIEL.png"),
    alt: "MORA Smart 10-in-1 protection device",
  },
  "mora-sub-meter-4-pole": {
    image: getMoraCircuitImage("MORA SUB METER 4 POLE.png"),
    alt: "MORA four-pole sub meter",
  },
  "mora-mini-digital-meter": {
    image: getMoraCircuitImage("MORAMini Digital Meter Voltage & Current.png"),
    alt: "MORA mini digital voltage and current meter",
  },
  "mora-pg-gland": {
    image: getMoraCircuitImage("PG GLAND.png"),
    alt: "MORA PG cable gland",
  },
};

const categoryProductImages: Record<string, { image: string; alt: string }> = {
  accessories: {
    image: productAccessories,
    alt: "Illustration of insulated solar DC cables",
  },
  "lithium-batteries": {
    image: productBattery,
    alt: "Representative lithium battery for solar energy storage",
  },
  "solar-inverters": {
    image: productInverter,
    alt: "Representative solar inverter",
  },
  "solar-panels": {
    image: productPanel,
    alt: "Representative photovoltaic solar panel",
  },
  vfds: {
    image: productVfd,
    alt: "Illustration of an industrial variable-frequency drive",
  },
};

export const products: Product[] = productRecords.map((product) => {
  const directAsset = productImages[product.id];
  const resolvedAsset = directAsset ?? {
    image: resolveProductAsset(product) ?? categoryProductImages[product.categoryId]?.image ?? productPanel,
    alt:
      directAsset?.alt ??
      categoryProductImages[product.categoryId]?.alt ??
      `${product.name} product image`,
  };

  if (!directAsset && !resolvedAsset.image) {
    throw new Error(`Missing image mapping for catalog product "${product.id}".`);
  }

  const gallery = directAsset?.gallery;
  return { ...product, ...resolvedAsset, ...(gallery ? { gallery } : {}) };
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
