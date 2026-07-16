// src/components/home/hero/Hero.tsx
import React from "react";
import HeroClient from "./HeroClient";
import { HeroSlideProps } from "@/data/hero";

interface HeroProps {
  slides: HeroSlideProps[];
}

export default function Hero({ slides }: HeroProps) {
  // Keeps architecture extendable for server-side logging, analytics, or contextual fallbacks
  return <HeroClient slides={slides} />;
}
