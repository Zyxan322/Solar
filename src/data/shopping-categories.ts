import { brands, productCategories, type Product } from "@/data/site";

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
    productCategoryIds: ["hybrid-inverters", "solar-inverters"],
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

export type HeaderProductCategory = {
  id: string;
  label: string;
  href: (typeof shoppingCategories)[number]["href"] | "/products";
  companies: {
    id: string;
    name: string;
    products: Product[];
  }[];
};

export function getHeaderProductCategories(productList: Product[]): HeaderProductCategory[] {
  const categories = [
    ...shoppingCategories.map((category) => ({
      id: category.id,
      label: category.label,
      href: category.href,
      productCategoryIds: category.productCategoryIds as readonly string[],
    })),
    ...productCategories
      .filter(
        (category) =>
          !shoppingCategories.some((shoppingCategory) =>
            shoppingCategory.productCategoryIds.some((id) => id === category.id),
          ),
      )
      .map((category) => ({
        id: category.id,
        label: category.label,
        href: "/products" as const,
        productCategoryIds: [category.id],
      })),
  ];

  return categories.flatMap((category) => {
    const categoryProducts = productList.filter((product) =>
      category.productCategoryIds.some((id) => id === product.categoryId),
    );
    if (categoryProducts.length === 0) return [];

    const groupedProducts = new Map<string, HeaderProductCategory["companies"][number]>();
    for (const product of categoryProducts) {
      const companyId = product.brandId?.trim() || "unspecified";
      let company = groupedProducts.get(companyId);
      if (!company) {
        company = {
          id: companyId,
          name:
            companyId === "unspecified"
              ? "Other products"
              : (brands.find((brand) => brand.id === companyId)?.name ?? companyId),
          products: [],
        };
        groupedProducts.set(companyId, company);
      }
      company.products.push(product);
    }

    return [
      {
        id: category.id,
        label: category.label,
        href: category.href,
        companies: [...groupedProducts.values()].sort((a, b) => a.name.localeCompare(b.name)),
      },
    ];
  });
}
