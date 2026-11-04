export type ProductRecord = {
  id: string;
  name: string;
  categoryId: string;
  brandId?: string;
  model?: string;
  sku?: string;
  subcategory?: string;
  summary: string;
  specs: string[];
  price?: number;
  priceUnit?: string;
};

export const brands = [
  { id: "chint", name: "CHINT" },
  { id: "mora", name: "MORA" },
] as const;

export const productCategories = [
  { id: "ac-protection", label: "AC Protection" },
  { id: "dc-protection", label: "DC Protection" },
  { id: "energy-storage", label: "Energy Storage" },
  { id: "hybrid-inverters", label: "Hybrid Inverters" },
  { id: "mounting-structures", label: "Mounting Structures" },
  { id: "solar-panels", label: "Solar Panels" },
] as const;

export function getProductCategoryLabel(categoryId: string) {
  return productCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}

export const productRecords: ProductRecord[] = [
  {
    id: "solar-panels",
    name: "Solar Panels",
    categoryId: "solar-panels",
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
    id: "hybrid-inverter",
    name: "Hybrid Inverter",
    categoryId: "hybrid-inverters",
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
    id: "battery-storage",
    name: "Battery Storage",
    categoryId: "energy-storage",
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
    id: "mounting-structures",
    name: "Mounting Structures",
    categoryId: "mounting-structures",
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
    id: "chint-nb1-63dc-c20a",
    name: "CHINT NB1-63DC C20A 2-Pole Breaker",
    categoryId: "dc-protection",
    brandId: "chint",
    model: "NB1-63DC C20A",
    summary: "Two-pole DC circuit protection for solar installations.",
    price: 4500,
    priceUnit: "unit",
    specs: ["20A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    id: "chint-nb1-63dc-c25a",
    name: "CHINT NB1-63DC C25A 2-Pole Breaker",
    categoryId: "dc-protection",
    brandId: "chint",
    model: "NB1-63DC C25A",
    summary: "Two-pole DC circuit protection for photovoltaic systems.",
    price: 4800,
    priceUnit: "unit",
    specs: ["25A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    id: "chint-nb1-63dc-c32a",
    name: "CHINT NB1-63DC C32A 2-Pole Breaker",
    categoryId: "dc-protection",
    brandId: "chint",
    model: "NB1-63DC C32A",
    summary: "Higher-capacity DC circuit protection for solar applications.",
    price: 5200,
    priceUnit: "unit",
    specs: ["32A rated current", "Up to 500V DC", "Two-pole overcurrent protection"],
  },
  {
    id: "chint-nxb-63-c63-single-pole",
    name: "CHINT NXB-63 C63 Single-Pole AC Breaker",
    categoryId: "ac-protection",
    brandId: "chint",
    model: "NXB-63 C63",
    summary: "Compact single-pole AC circuit protection for distribution boards.",
    price: 2200,
    priceUnit: "unit",
    specs: ["63A rated current", "230V AC", "6kA breaking capacity"],
  },
  {
    id: "chint-nxb-63-c63-four-pole",
    name: "CHINT NXB-63 C63 Four-Pole AC Breaker",
    categoryId: "ac-protection",
    brandId: "chint",
    model: "NXB-63 C63",
    summary: "Four-pole AC circuit protection for three-phase installations.",
    price: 12500,
    priceUnit: "unit",
    specs: ["63A rated current", "400V AC", "Four-pole protection"],
  },
  {
    id: "chint-nxb-63-c63-two-pole",
    name: "CHINT NXB-63 C63 Two-Pole AC Breaker",
    categoryId: "ac-protection",
    brandId: "chint",
    model: "NXB-63 C63",
    summary:
      "Two-pole CHINT NXB-63 C63 circuit breaker. Contact us to confirm current availability and pricing.",
    specs: [],
  },
  {
    id: "mora-aes-c63-breakers",
    name: "MORA AES C63 Circuit Breakers",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "AES C63",
    summary:
      "MORA AES C63 circuit breakers. Contact us to confirm the available configuration, pricing and availability.",
    specs: [],
  },
  {
    id: "mora-aes-20dcpv-1000v",
    name: "MORA AES-20DCPV/1000V Surge Protection Device",
    categoryId: "dc-protection",
    brandId: "mora",
    model: "AES-20DCPV/1000V",
    summary:
      "MORA photovoltaic DC surge protection device. Contact us to confirm current availability and pricing.",
    specs: ["1000V DC", "In: 20kA", "Imax: 40kA", "Up: ≤ 4.0kV"],
  },
];
