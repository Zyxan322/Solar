import { useEffect, useState } from "react";

export type PublicSettings = {
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

export type PublicCatalog = {
  brands: {
    id: string;
    name: string;
    status: "active" | "draft";
    logo?: string;
    website?: string;
  }[];
  categories: { id: string; label: string; status: "active" | "draft" }[];
  settings: PublicSettings;
};

export function usePublicCatalog() {
  const [catalog, setCatalog] = useState<PublicCatalog | null>(null);

  useEffect(() => {
    fetch("/api/catalog")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PublicCatalog | null) => data && setCatalog(data))
      .catch(() => undefined);
  }, []);

  return catalog;
}
