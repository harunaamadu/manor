"use client";

import React from "react";
import Reveal from "@/components/animation/reveal";
import Container from "@/components/common/Container";
import Hero from "@/components/home/hero/Hero";
import Category from "@/components/shared/category/Category";
import FeaturedSection from "@/components/home/sections/FeaturedSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Category />
      <FeaturedSection />
    </main>
  );
}
