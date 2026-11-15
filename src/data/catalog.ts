import { importedBrands, importedProductRecords } from "./imported-products";

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
  { id: "rego", name: "REGO" },
  ...importedBrands.filter((brand) => !new Set(["chint", "mora"]).has(brand.id)),
];

export const productCategories = [
  { id: "ac-protection", label: "AC Protection" },
  { id: "accessories", label: "Accessories" },
  { id: "dc-protection", label: "DC Protection" },
  { id: "energy-storage", label: "Energy Storage" },
  { id: "hybrid-inverters", label: "Hybrid Inverters" },
  { id: "lithium-batteries", label: "Lithium Batteries" },
  { id: "mounting-structures", label: "Mounting Structures" },
  { id: "solar-inverters", label: "Solar Inverters" },
  { id: "solar-panels", label: "Solar Panels" },
  { id: "vfds", label: "VFDs" },
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
    name: "MORA AES C63 AC Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "AES C63",
    summary:
      "MORA AES C63 miniature circuit breaker for AC distribution. Available configurations may vary; confirm the required pole count and availability when ordering.",
    specs: ["C63 current rating", "230/400V AC, 50/60Hz (as marked)", "IEC 60898-1"],
  },
  {
    id: "mora-aes-988-63a",
    name: "MORA AES-988 63A AC Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "AES-988 63A",
    summary:
      "MORA AES-988 circuit breaker for AC distribution, rated at 63A. Confirm system compatibility and availability before ordering.",
    specs: ["63A rated current", "400V AC, 50Hz (as marked)"],
  },
  {
    id: "mora-aes-dc-c63",
    name: "MORA AES-DC C63 2-Pole DC Circuit Breaker",
    categoryId: "dc-protection",
    brandId: "mora",
    model: "AES-DC C63",
    summary:
      "Two-pole MORA AES-DC C63 breaker for photovoltaic DC circuits. Check the system voltage and installation requirements before use.",
    specs: ["C63 current rating", "500V DC (as marked)", "Two-pole configuration"],
  },
  {
    id: "mora-afs-125-dc-c125",
    name: "MORA AFS-125-DC C125 2-Pole DC Circuit Breaker",
    categoryId: "dc-protection",
    brandId: "mora",
    model: "AFS-125-DC C125",
    summary:
      "Two-pole MORA AFS-125-DC breaker for photovoltaic DC systems, rated C125. Verify system voltage and protection requirements before ordering.",
    specs: ["C125 current rating", "1000V DC (as marked)", "Two-pole configuration"],
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
  {
    id: "mora-10-in-1-wifi-new-model",
    name: "MORA 10-in-1 Wi-Fi Smart Protection Device",
    categoryId: "accessories",
    brandId: "mora",
    model: "10 IN 1 Wi-Fi",
    summary:
      "MORA Wi-Fi-enabled 10-in-1 electrical protection device. Confirm functions and system compatibility from the product label.",
    specs: ["Wi-Fi model", "Verify rated voltage and protection functions before installation"],
  },
  {
    id: "mora-100a-breaker",
    name: "MORA 100A Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "100A",
    summary:
      "MORA 100A circuit breaker for electrical distribution. Confirm pole count and system ratings before ordering.",
    specs: ["100A rating as marked", "Confirm voltage and pole configuration"],
  },
  {
    id: "mora-125a-breaker-changeover",
    name: "MORA 125A Breaker-Type Changeover Switch",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "125A Breaker Type Change Over",
    summary:
      "MORA 125A breaker-type changeover switch for selecting between electrical supplies. Confirm configuration and ratings before installation.",
    specs: ["125A rating as marked", "Changeover switch"],
  },
  {
    id: "mora-160a-breaker",
    name: "MORA 160A Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "160A",
    summary:
      "MORA 160A circuit breaker for electrical distribution. Confirm pole count and system ratings before ordering.",
    specs: ["160A rating as marked", "Confirm voltage and pole configuration"],
  },
  {
    id: "mora-2-pole-ac-spd",
    name: "MORA 2-Pole AC Surge Protection Device",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "2 Pole AC SPD",
    summary:
      "Two-pole MORA surge protection device for AC systems. Verify voltage and protection ratings against the product label.",
    specs: ["Two-pole configuration", "AC surge protection"],
  },
  {
    id: "mora-2-pole-dc-spd",
    name: "MORA 2-Pole DC Surge Protection Device",
    categoryId: "dc-protection",
    brandId: "mora",
    model: "2 Pole DC SPD",
    summary:
      "Two-pole MORA surge protection device for DC systems. Verify voltage and protection ratings against the product label.",
    specs: ["Two-pole configuration", "DC surge protection"],
  },
  {
    id: "mora-22mm-led-indicator",
    name: "MORA 22 mm LED Indicator",
    categoryId: "accessories",
    brandId: "mora",
    model: "22 mm LED Indicator",
    summary:
      "Panel-mount MORA LED indicator for electrical control panels. Confirm operating voltage and indicator colour when ordering.",
    specs: ["22 mm panel mount", "Confirm operating voltage"],
  },
  {
    id: "mora-4-pole-breaker",
    name: "MORA 4-Pole Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "4 Pole",
    summary:
      "Four-pole MORA circuit breaker for electrical distribution. Confirm current and voltage ratings from the product label.",
    specs: ["Four-pole configuration", "Verify rated current and voltage"],
  },
  {
    id: "mora-63a-elcb-2-pole",
    name: "MORA 63A 2-Pole ELCB",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "63A ELCB 2 Pole",
    summary:
      "Two-pole MORA earth-leakage circuit breaker rated at 63A. Check trip sensitivity and system compatibility before installation.",
    specs: ["63A rating as marked", "Two-pole configuration"],
  },
  {
    id: "mora-ac-spd",
    name: "MORA AC Surge Protection Device",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "AC SPD",
    summary:
      "MORA surge protection device for AC systems. Verify voltage and protection ratings against the product label.",
    specs: ["AC surge protection", "Verify rated voltage before installation"],
  },
  {
    id: "mora-current-voltage-display",
    name: "MORA Real-Time Current and Voltage Display",
    categoryId: "accessories",
    brandId: "mora",
    model: "Current and Voltage Real-Time Display",
    summary:
      "MORA display module for monitoring electrical current and voltage. Confirm measurement range and connection requirements before use.",
    specs: ["Current and voltage display", "Verify measurement range from product label"],
  },
  {
    id: "mora-digital-time-switch",
    name: "MORA Digital Time Switch Module",
    categoryId: "accessories",
    brandId: "mora",
    model: "Digital Time Switch MOD",
    summary:
      "MORA digital time-switch module for scheduled electrical control. Confirm supply voltage and switching ratings before installation.",
    specs: ["Digital time-switch module", "Verify supply and switching ratings"],
  },
  {
    id: "mora-fire-extinguisher-ball",
    name: "MORA Fire Extinguisher Ball",
    categoryId: "accessories",
    brandId: "mora",
    model: "Fire Extinguisher Ball",
    summary:
      "MORA fire-extinguisher ball. Follow the product instructions and applicable fire-safety guidance for placement and use.",
    specs: ["Fire-safety product", "Follow manufacturer instructions"],
  },
  {
    id: "mora-fire-extinguisher-device",
    name: "MORA Fire Extinguisher Device",
    categoryId: "accessories",
    brandId: "mora",
    model: "Fire Extinguisher Device",
    summary:
      "MORA fire-extinguisher device. Confirm the application and operating instructions from the product documentation.",
    specs: ["Fire-safety product", "Follow manufacturer instructions"],
  },
  {
    id: "mora-grand-aes-968",
    name: "MORA Grand AES-968 Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "Grand AES-968",
    summary:
      "MORA Grand AES-968 circuit breaker for electrical distribution. Confirm pole count and ratings from the product label.",
    specs: ["Model: AES-968", "Verify rated current and voltage"],
  },
  {
    id: "mora-mccb-4-pole",
    name: "MORA 4-Pole Molded Case Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "MCCB 4 Pole",
    summary:
      "Four-pole MORA molded case circuit breaker for electrical distribution. Confirm current and voltage ratings before ordering.",
    specs: ["Molded case circuit breaker", "Four-pole configuration"],
  },
  {
    id: "mora-mccb",
    name: "MORA Molded Case Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "MCCB",
    summary:
      "MORA molded case circuit breaker for electrical distribution. Confirm pole count and ratings from the product label.",
    specs: ["Molded case circuit breaker", "Verify rated current and voltage"],
  },
  {
    id: "mora-molded-case-breaker",
    name: "MORA Molded Case Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "Molded Case Circuit Breaker",
    summary:
      "MORA molded case circuit breaker. Check the exact model and ratings before selecting for an installation.",
    specs: ["Molded case circuit breaker", "Verify model and ratings"],
  },
  {
    id: "mora-aes-c63-alternate",
    name: "MORA AES C63 Circuit Breaker – Alternate Configuration",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "AES C63",
    summary:
      "Alternate MORA AES C63 breaker configuration. Confirm the required pole count and ratings before ordering.",
    specs: ["C63 rating as marked", "Confirm pole configuration"],
  },
  {
    id: "mora-ats",
    name: "MORA Automatic Transfer Switch",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "ATS",
    summary:
      "MORA automatic transfer switch for transferring a load between power sources. Verify system and switching ratings before installation.",
    specs: ["Automatic transfer switch", "Verify rated current and voltage"],
  },
  {
    id: "mora-changeover-relay-120a",
    name: "MORA 120A Changeover Relay",
    categoryId: "ac-protection",
    brandId: "mora",
    model: "Change Over Relay 120A",
    summary:
      "MORA 120A changeover relay for switching between electrical supplies. Confirm wiring and system ratings before installation.",
    specs: ["120A rating as marked", "Changeover relay"],
  },
  {
    id: "mora-smart-10-in-1",
    name: "MORA Smart 10-in-1 Protection Device",
    categoryId: "accessories",
    brandId: "mora",
    model: "Smart 10-in-1",
    summary:
      "MORA Smart 10-in-1 electrical protection device. Confirm the included protection functions and rated voltage from its product label.",
    specs: ["10-in-1 model", "Verify functions and ratings before installation"],
  },
  {
    id: "mora-sub-meter-4-pole",
    name: "MORA 4-Pole Sub Meter",
    categoryId: "accessories",
    brandId: "mora",
    model: "Sub Meter 4 Pole",
    summary:
      "MORA four-pole sub meter for electrical measurement. Confirm meter type, range and connection requirements before ordering.",
    specs: ["Four-pole configuration", "Verify measurement range"],
  },
  {
    id: "mora-mini-digital-meter",
    name: "MORA Mini Digital Voltage and Current Meter",
    categoryId: "accessories",
    brandId: "mora",
    model: "Mini Digital Meter",
    summary:
      "MORA mini digital meter for displaying voltage and current. Confirm measurement range and installation requirements from the product label.",
    specs: ["Voltage and current display", "Verify measurement range"],
  },
  {
    id: "mora-pg-gland",
    name: "MORA PG Cable Gland",
    categoryId: "accessories",
    brandId: "mora",
    model: "PG Gland",
    summary:
      "MORA PG cable gland for cable entry and retention. Select the gland size to match the cable and enclosure opening.",
    specs: ["PG cable gland", "Select size for cable and enclosure"],
  },
  {
    id: "mora-rego-5351390-mccb",
    name: "REGO 5351390 Molded Case Circuit Breaker",
    categoryId: "ac-protection",
    brandId: "rego",
    model: "5351390",
    summary:
      "REGO molded case circuit breaker, model 5351390. Verify the product label for current, voltage and pole configuration.",
    specs: ["Model: 5351390", "Verify rated current and voltage"],
  },
  ...importedProductRecords,
];
