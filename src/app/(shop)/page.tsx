// src/app/page.tsx
import React, { Suspense } from "react";
import Hero from "@/components/home/hero/Hero";
import HeroSkeleton from "@/components/home/hero/HeroSkeleton"; // Import Skeleton
import Category from "@/components/shared/category/Category";
import FeaturedSection from "@/components/home/sections/FeaturedSection";

import { prisma } from "@/lib/prisma";
import { HeroSlideProps } from "@/data/hero";

export const revalidate = 3600;

// 1. Isolate the async database operation into a child fetcher
async function HeroFetcher() {
  let slides: HeroSlideProps[] = [];

  try {
    const rawSlides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });

    slides = rawSlides.map((slide) => ({
      id: slide.id,
      titles: slide.titles as any,
      description: slide.description,
      primaryCta: slide.primaryCta,
      primaryHref: slide.primaryHref,
      // ensure optional fields are undefined (not null) to match HeroSlideProps
      secondaryCta: slide.secondaryCta ?? undefined,
      secondaryHref: slide.secondaryHref ?? undefined,
      imageUrl: slide.imageUrl,
      alt: slide.alt,
      order: slide.order,
    }));
  } catch (error) {
    console.error("⚠️ Failed to fetch hero slides from database:", error);
  }

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-center py-20 px-4 text-zinc-500">
        <p className="text-base font-medium">No active announcement banners found.</p>
      </div>
    );
  }

  return <Hero slides={slides} />;
}

// 2. Keep the core page structure instant while streaming data
export default function Home() {
  return (
    <main>
      {/* Suspense instantly shows the skeleton while HeroFetcher calls the database */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroFetcher />
      </Suspense>
      
      <Category />
      <FeaturedSection />
    </main>
  );
}
