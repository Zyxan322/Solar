import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { list, put } from "@vercel/blob";
import { productRecords, brands, productCategories } from "@/data/catalog";

export type AdminProduct = {
  id: string;
  name: string;
  nameAr?: string;
  categoryId: string;
  brandId?: string;
  model?: string;
  sku?: string;
  subcategory?: string;
  summary: string;
  description?: string;
  descriptionAr?: string;
  specs: string[];
  specifications: Record<string, string>;
  price?: number;
  salePrice?: number;
  wholesalePrice?: number;
  priceUnit?: string;
  currency: string;
  contactForPrice: boolean;
  showPrice: boolean;
  status: "published" | "draft";
  featured: boolean;
  stock: number;
  lowStock: number;
  image: string;
  gallery: string[];
  alt: string;
  tags: string[];
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
};

type Store = {
  products: AdminProduct[];
  brands: {
    id: string;
    name: string;
    status: "active" | "draft";
    logo?: string;
    website?: string;
  }[];
  categories: { id: string; label: string; status: "active" | "draft" }[];
  activity: { id: string; actor: string; action: string; createdAt: string }[];
  settings: {
    companyName: string;
    tagline: string;
    phone: string;
    additionalPhone: string;
    whatsapp: string;
    email: string;
    address: string;
    headOfficeAddress: string;
    logo: string;
    currency: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    seoTitle: string;
    seoDescription: string;
  };
};

const DATA_DIR = join(process.cwd(), ".data");
const STORE_FILE = join(DATA_DIR, "reinvent-admin.json");
const CLOUD_STORE_PATH = "reinvent-admin/store.json";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function seedProduct(product: (typeof productRecords)[number], index: number): AdminProduct {
  return {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    brandId: product.brandId,
    model: product.model,
    sku: product.sku,
    subcategory: product.subcategory,
    summary: product.summary,
    specs: product.specs,
    specifications: {},
    price: product.price,
    priceUnit: product.priceUnit,
    currency: "PKR",
    contactForPrice: product.price === undefined,
    showPrice: product.price !== undefined,
    status: "published",
    featured: index < 6,
    stock: product.price === undefined ? 0 : 25,
    lowStock: 5,
    image: "",
    gallery: [],
    alt: product.name,
    tags: [],
    slug: slugify(product.name),
  };
}

function seedStore(): Store {
  mkdirSync(DATA_DIR, { recursive: true });
  const store: Store = {
    products: productRecords.map(seedProduct),
    brands: brands.map((brand) => ({ ...brand, status: "active" as const })),
    categories: productCategories.map((category) => ({
      id: category.id,
      label: category.label,
      status: "active",
    })),
    activity: [],
    settings: {
      companyName: "REINVENT ENERGIES",
      tagline: "Empowering Your Energy Choices",
      phone: "+92-55-3419847",
      additionalPhone: "+92 322 5478991",
      whatsapp: "+923225478991",
      email: "info@reinventenergies.com",
      address: "8 Sutlej Commercial, DC Colony, Gujranwala, Pakistan",
      headOfficeAddress:
        "Plaza #30, Rachna Villas Block, Commercial Zone 1, DHA Gujranwala, Pakistan",
      logo: "/src/assets/logo.jpg",
      currency: "PKR",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      seoTitle: "Reinvent Energies | Premium Solar Solutions in Pakistan",
      seoDescription:
        "Professional solar panel installation, inverter solutions and energy consultation in Pakistan.",
    },
  };
  writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  return store;
}

function normalizeStore(store: Partial<Store>): Store {
  const defaults = {
    products: productRecords.map((product, index) => seedProduct(product, index)),
    brands: brands.map((brand) => ({ ...brand, status: "active" as const })),
    categories: productCategories.map((category) => ({
      id: category.id,
      label: category.label,
      status: "active" as const,
    })),
    activity: [] as Store["activity"],
    settings: {
      companyName: "REINVENT ENERGIES",
      tagline: "Empowering Your Energy Choices",
      phone: "+92-55-3419847",
      additionalPhone: "+92 322 5478991",
      whatsapp: "+923225478991",
      email: "info@reinventenergies.com",
      address: "8 Sutlej Commercial, DC Colony, Gujranwala, Pakistan",
      headOfficeAddress:
        "Plaza #30, Rachna Villas Block, Commercial Zone 1, DHA Gujranwala, Pakistan",
      logo: "/src/assets/logo.jpg",
      currency: "PKR",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      seoTitle: "Reinvent Energies | Premium Solar Solutions in Pakistan",
      seoDescription:
        "Professional solar panel installation, inverter solutions and energy consultation in Pakistan.",
    },
  };
  return {
    ...defaults,
    ...store,
    products: store.products ?? defaults.products,
    brands: store.brands ?? defaults.brands,
    categories: store.categories ?? defaults.categories,
    activity: store.activity ?? defaults.activity,
    settings: { ...defaults.settings, ...(store.settings ?? {}) },
  };
}

export async function readStore(): Promise<Store> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: CLOUD_STORE_PATH, limit: 1 });
      if (blobs[0]) {
        const response = await fetch(blobs[0].downloadUrl, { cache: "no-store" });
        if (response.ok) return normalizeStore((await response.json()) as Partial<Store>);
      }
    } catch (error) {
      console.error("Unable to read admin store from Vercel Blob.", error);
    }
  }

  try {
    return normalizeStore(JSON.parse(readFileSync(STORE_FILE, "utf8")) as Partial<Store>);
  } catch {
    return seedStore();
  }
}

export async function writeStore(store: Store) {
  mkdirSync(dirname(STORE_FILE), { recursive: true });
  writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(CLOUD_STORE_PATH, JSON.stringify(store), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  }
}

export async function saveProduct(input: Partial<AdminProduct>, existingId?: string) {
  const store = await readStore();
  const id = existingId ?? randomUUID();
  const previous = store.products.find((product) => product.id === id);
  const now = new Date();
  const product: AdminProduct = {
    id,
    name: input.name?.trim() || "Untitled product",
    nameAr: input.nameAr,
    categoryId: input.categoryId || "solar-panels",
    brandId: input.brandId,
    model: input.model,
    sku: input.sku,
    subcategory: input.subcategory,
    summary: input.summary?.trim() || "",
    description: input.description,
    descriptionAr: input.descriptionAr,
    specs: input.specs ?? previous?.specs ?? [],
    specifications: input.specifications ?? previous?.specifications ?? {},
    price: input.price,
    salePrice: input.salePrice,
    wholesalePrice: input.wholesalePrice,
    priceUnit: input.priceUnit,
    currency: input.currency || "PKR",
    contactForPrice: input.contactForPrice ?? false,
    showPrice: input.showPrice ?? true,
    status: input.status || "draft",
    featured: input.featured ?? false,
    stock: input.stock ?? 0,
    lowStock: input.lowStock ?? 5,
    image: input.image || "",
    gallery: input.gallery ?? [],
    alt: input.alt || input.name || "Reinvent Energies product",
    tags: input.tags ?? [],
    slug: slugify(input.slug || input.name || id),
  };

  if (existingId) {
    store.products = store.products.map((entry) => (entry.id === existingId ? product : entry));
  } else {
    store.products.unshift(product);
  }
  store.activity.unshift({
    id: randomUUID(),
    actor: "Administrator",
    action: `${existingId ? "Updated" : "Created"} product: ${product.name}`,
    createdAt: now.toISOString(),
  });
  await writeStore(store);
  return product;
}
