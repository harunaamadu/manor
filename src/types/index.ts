export type SectionTitle = {
  title: string | "Add Title";
  spanText?: string;
};

export interface ProductImageData {
  id: string;
  src: string;
  alt?: string;
}

export interface ProductVariantOption {
  id: string;
  label: string;
  /** Hex value when the variant type is "color", otherwise omit */
  swatch?: string;
  available?: boolean;
}

export interface ProductVariantGroup {
  id: string;
  name: string;
  type: "color" | "size" | "text";
  options: ProductVariantOption[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
  verified?: boolean;
}

export type ProductBadgeType =
  | "new"
  | "sale"
  | "bestseller"
  | "low-stock"
  | "out-of-stock"
  | "custom";

// export interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   price: number;
//   compareAtPrice?: number;
//   currency?: string;
//   images: ProductImageData[];
//   rating?: number;
//   reviewCount?: number;
//   badges?: { type: ProductBadgeType; label?: string }[];
//   variants?: ProductVariantGroup[];
//   inStock?: boolean;
// }