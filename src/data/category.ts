// datatype
type CategoryProps = {
  icon?: string;
  label: string;
  image: string;
  href: string;
};

// data
export const CATEGORIES: CategoryProps[] = [
  {
    label: "Comfortable Chairs",
    image: "/assets/category/category_chair.png",
    href: "/shop/chairs",
  },
  {
    label: "Comfortable Sofa",
    image: "/assets/category/category_sofa.png",
    href: "/shop/sofas",
  },
  {
    label: "Elegant Tables",
    image: "/assets/category/category_table.png",
    href: "/shop/tables",
  },
  {
    label: "Cozy Beds",
    image: "/assets/category/category_bed.png",
    href: "/shop/beds",
  },
  {
    label: "Luxurious Lamps",
    image: "/assets/category/category_lamp.png",
    href: "/shop/lamps",
  },
  {
    label: "House Decors",
    image: "/assets/category/category_decor.png",
    href: "/shop/decors",
  },
  {
    label: "House Elements",
    image: "/assets/category/category_elements.png",
    href: "/shop/elements",
  },
  {
    label: "Storage & Shelving",
    image: "/assets/category/category_storage.png",
    href: "/shop/storage",
  },
  {
    label: "Kitchen Sets",
    image: "/assets/category/category_kitchen.png",
    href: "/shop/kitchen-sets",
  },
  {
    label: "Rugs & Carpets",
    image: "/assets/category/category_rugs.png",
    href: "/shop/rugs",
  },
];