/**
 * Public marketing content exposed through the MCP server.
 * Mirrors src/data/site.ts but without image imports, so the server bundle
 * stays free of asset dependencies.
 */

export const company = {
  name: "REINVENT ENERGIES",
  tagline: "Empowering Your Energy Choices",
  description:
    "Professional solar installation and renewable energy solutions in Gujranwala, Pakistan. Expert installation, high-quality solar products and energy consultation.",
  phone: "+92-55-3419847",
  additionalPhone: "+92 322 5478991",
  email: "info@reinventenergies.com",
  headOfficeAddress: "Plaza #30, Rachna Villas Block, Commercial Zone 1, DHA Gujranwala, Pakistan",
  address: "8 Sutlej Commercial, DC Colony, Gujranwala, Pakistan",
  city: "Gujranwala",
  country: "Pakistan",
  website: "https://reinventenergies.lovable.app",
  hours: "24/7 energy support",
};

export const services = [
  {
    name: "Solar Panel Installation",
    summary:
      "Professional solar panel installation designed for optimal performance, reliability and long-term energy savings.",
  },
  {
    name: "Inverter Solutions",
    summary:
      "High-quality inverter systems that maximise efficiency and convert solar energy for immediate use or storage.",
  },
  {
    name: "Energy Consultation",
    summary:
      "Expert consultations to identify the best solar solution for your requirements, maximising savings and sustainability.",
  },
  {
    name: "Battery Storage",
    summary: "Store daytime generation and stay powered through load shedding.",
  },
  {
    name: "Maintenance & Support",
    summary: "Ongoing monitoring, servicing and 24/7 support for installed systems.",
  },
];

export const products = [
  {
    name: "Solar Panels",
    category: "Solar Panel",
    summary: "High-efficiency monocrystalline modules built for harsh sunlight.",
    price: 22000,
    priceUnit: "panel",
    specs: [
      "Monocrystalline PERC / N-type cells",
      "Anti-reflective tempered glass",
      "Corrosion-resistant aluminium frame",
    ],
  },
  {
    name: "Hybrid Inverter",
    category: "Hybrid Inverter",
    summary: "Grid-tied and battery-ready conversion with smart monitoring.",
    price: 185000,
    priceUnit: "unit",
    specs: [
      "Grid-tie + battery hybrid operation",
      "Dual MPPT tracking",
      "App-based performance monitoring",
    ],
  },
  {
    name: "Battery Storage",
    category: "Energy Storage",
    summary: "Store daytime generation and run through load shedding.",
    price: 280000,
    priceUnit: "unit",
    specs: [
      "Lithium chemistry, modular capacity",
      "Integrated battery management system",
      "Silent wall-mounted installation",
    ],
  },
  {
    name: "Mounting Structures",
    category: "Mounting",
    summary: "Engineered structures rated for local wind and roof loads.",
    price: 6000,
    priceUnit: "panel",
    specs: [
      "Hot-dip galvanised / aluminium rails",
      "Wind-load engineered layouts",
      "Roof-safe, leak-proof fixings",
    ],
  },
  {
    name: "CHINT NB1-63DC C20A 2-Pole Breaker",
    category: "DC Protection",
    summary: "Two-pole DC circuit protection for solar installations.",
    price: 4500,
    priceUnit: "unit",
    specs: ["20A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    name: "CHINT NB1-63DC C25A 2-Pole Breaker",
    category: "DC Protection",
    summary: "Two-pole DC circuit protection for photovoltaic systems.",
    price: 4800,
    priceUnit: "unit",
    specs: ["25A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    name: "CHINT NB1-63DC C32A 2-Pole Breaker",
    category: "DC Protection",
    summary: "Higher-capacity DC circuit protection for solar applications.",
    price: 5200,
    priceUnit: "unit",
    specs: ["32A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    name: "CHINT NXB-63 C63 Single-Pole AC Breaker",
    category: "AC Protection",
    summary: "Compact single-pole AC circuit protection for distribution boards.",
    price: 2200,
    priceUnit: "unit",
    specs: ["63A rated current", "230V AC", "6kA breaking capacity"],
  },
  {
    name: "CHINT NXB-63 C63 Four-Pole AC Breaker",
    category: "AC Protection",
    summary: "Four-pole AC circuit protection for three-phase installations.",
    price: 12500,
    priceUnit: "unit",
    specs: ["63A rated current", "400V AC", "Four-pole protection"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Energy Consultation",
    detail: "We review your consumption, tariffs and goals to size the right system.",
  },
  {
    step: "02",
    title: "Site Assessment",
    detail: "Roof structure, shading and orientation are surveyed on-site.",
  },
  {
    step: "03",
    title: "System Design",
    detail: "Panel layout, inverter and storage are engineered around your load profile.",
  },
  {
    step: "04",
    title: "Professional Installation",
    detail: "Certified crews install mounting, modules and electrical work to standard.",
  },
  {
    step: "05",
    title: "System Activation",
    detail: "Commissioning, net-metering support and handover with monitoring set up.",
  },
];

export const statistics = [
  { label: "Years of Experience", value: "10+" },
  { label: "Solar Installations", value: "500+" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Energy Support", value: "24/7" },
];

export const vision =
  "To be a premier renewable energy provider in Pakistan, empowering communities with innovative and sustainable power solutions.";

export const mission =
  "To design and implement high-performance energy systems that offer long-term value, efficiency, and operational reliability.";

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
  { capacityKw: 400, description: "On-Grid Industrial Solar Project" },
  { capacityKw: 200, description: "On-Grid Solar Installation" },
  { capacityKw: 50, description: "On-Grid Solar Systems" },
  { capacityKw: 20, description: "On-Grid Solar Setup" },
  { capacityKw: 18, description: "Hybrid Solar — Engineering 30 Core, Gujranwala Cantt" },
  { capacityKw: 15, description: "On-Grid Solar Project" },
  { capacityKw: 8, description: "Hybrid Solar Installations (multiple sites)" },
];
