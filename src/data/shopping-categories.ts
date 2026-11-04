import type { Product } from "@/data/site";

export const shoppingCategories = [
  {
    id: "solar-panels",
    label: "Solar Panels",
    href: "/solar-panels",
    description:
      "Explore dependable solar modules selected for high output, long-term performance and Pakistan's climate.",
    productCategoryIds: ["solar-panels"],
    brands: ["JinkoSolar", "LONGi Solar", "Trina Solar", "JA Solar", "Canadian Solar"],
  },
  {
    id: "inverters",
    label: "Inverters",
    href: "/inverters",
    description:
      "Find reliable conversion and hybrid inverter solutions for homes and commercial solar systems.",
    productCategoryIds: ["hybrid-inverters"],
    brands: [
      "Huawei",
      "Sungrow",
      "Growatt",
      "SMA Solar Technology",
      "GoodWe",
      "Fronius",
      "SolarEdge",
      "Inverex",
      "Enphase Energy",
      "Victron Energy",
    ],
  },
  {
    id: "breakers",
    label: "Breakers",
    href: "/breakers",
    description: "Shop circuit protection components for safer solar and electrical installations.",
    productCategoryIds: ["ac-protection", "dc-protection"],
    brands: ["CHINT", "MORA"],
  },
] as const;

export type ShoppingCategoryId = (typeof shoppingCategories)[number]["id"];

export function getShoppingCategoryProducts(
  categoryId: ShoppingCategoryId,
  productList: Product[],
) {
  const category = shoppingCategories.find((entry) => entry.id === categoryId);
  if (!category) return [];

  return productList.filter((product) => {
    if (!category.productCategoryIds.some((id) => id === product.categoryId)) return false;
    return categoryId !== "breakers" || /\b(?:circuit )?breakers?\b/i.test(product.name);
  });
}
