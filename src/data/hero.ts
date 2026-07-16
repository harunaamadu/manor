interface TitleProps {
  title: string;
  titleSpan?: string;
}

export type HeroSlideProps = {
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
    imageUrl: "https://res.cloudinary.com/dqylma6u3/image/upload/v1784138426/hero_01_sg6mqx.png",
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
    imageUrl: "https://res.cloudinary.com/dqylma6u3/image/upload/v1784138446/hero_02_puhojb.png",
    alt: "Product detail shown in natural light",
  },
];