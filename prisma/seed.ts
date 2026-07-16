import { prisma } from "../src/lib/prisma";

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

// Your exact data
const SLIDES: HeroSlideProps[] = [
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
    imageUrl:
      "https://res.cloudinary.com/dqylma6u3/image/upload/v1784138426/hero_01_sg6mqx.png",
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
    imageUrl:
      "https://res.cloudinary.com/dqylma6u3/image/upload/v1784138446/hero_02_puhojb.png",
    alt: "Product detail shown in natural light",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing slides to avoid duplicate keys during seed reruns
  // Use `any` cast to avoid TypeScript errors if the generated client type differs
  await (prisma as any).heroSlide.deleteMany();

  for (const slide of SLIDES) {
    await (prisma as any).heroSlide.create({
      data: {
        id: slide.id,
        // Wrap your titles nested object inside JSON stringify/parse to safely map into Postgres
        titles: JSON.parse(JSON.stringify(slide.titles)),
        description: slide.description,
        primaryCta: slide.primaryCta,
        primaryHref: slide.primaryHref,
        secondaryCta: slide.secondaryCta || null,
        secondaryHref: slide.secondaryHref || null,
        imageUrl: slide.imageUrl,
        alt: slide.alt,
        order: slide.id,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
