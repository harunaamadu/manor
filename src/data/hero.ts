interface TitleProps {
  title: string;
  titleSpan?: string;
}

type HeroSlideProps = {
  id: number;
  titles: TitleProps;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  imageUrl: string;
  alt: string;
};

export const SLIDES: HeroSlideProps[] = [
  {
    id: 1,
    titles: {
      title: "Crafted for",
      titleSpan: "everyday living",
    },
    description:
      "Discover pieces made with quality materials and timeless design, built to last well beyond the season.",
    primaryCta: "Shop Now",
    primaryHref: "/shop",
    secondaryCta: "Collection",
    secondaryHref: "/collections",
    imageUrl: "/assets/hero/hero_01.png",
    alt: "Featured product styled in a minimal setting",
  },
  {
    id: 2,
    titles: {
      title: "LumaTwist™",
      titleSpan: "Wooden Pendant",
    },
    description:
      "Beautifully crafted wooden pendant lamp with a flowing spiral silhouette, offering soft lighting and minimalist Scandinavian appeal.",
    primaryCta: "Explore",
    primaryHref: "/shop",
    secondaryHref: "/about",
    imageUrl: "/assets/hero/hero_02.png",
    alt: "Product detail shown in natural light",
  },
];