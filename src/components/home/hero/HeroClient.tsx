// src/components/home/hero/HeroClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imageVariants, textContainerVariants, textItemVariants } from "@/lib/animation";
import { HeroSlideProps } from "@/data/hero";

interface HeroClientProps {
  slides: HeroSlideProps[];
}

export default function HeroClient({ slides }: HeroClientProps) {
  return (
    <Container
      as="section"
      className="relative h-fit overflow-hidden p-0! bg-linear-to-b from-background from-0% via-foreground/3 via-80% to-foreground/6 to-100%"
    >
      {/* ✅ Wrapper for a smooth entry animation over the entire layout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-6 md:min-h-[calc(100svh-24em)]">
                  <motion.div
                    className="flex flex-col items-center md:items-start justify-center gap-4 p-4 md:p-10"
                    variants={textContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    <motion.h1
                      variants={textItemVariants}
                      className="text-4xl text-center md:text-start font-semibold font-heading tracking-tight md:text-5xl"
                    >
                      {slide.titles.title}{" "}
                      <span className="opacity-50">{slide.titles.titleSpan}</span>
                    </motion.h1>

                    <motion.p
                      variants={textItemVariants}
                      className="max-w-md text-base text-center md:text-start md:text-lg"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      variants={textItemVariants}
                      className="mt-2 flex items-center gap-4"
                    >
                      <Button size="lg" asChild>
                        <Link href={slide.primaryHref}>{slide.primaryCta}</Link>
                      </Button>

                      {slide.secondaryCta && slide.secondaryHref && (
                        <Button variant="link" size="lg" asChild>
                          <Link
                            href={slide.secondaryHref}
                            className="text-sm font-medium text-zinc-700 dark:text-inherit underline-offset-4 transition hover:text-zinc-950 hover:underline"
                          >
                            {slide.secondaryCta}
                          </Link>
                        </Button>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="relative block aspect-square h-full"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    <Image
                      src={slide.imageUrl}
                      alt={slide.alt}
                      fill
                      priority
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {slides.length > 1 && (
            <>
              <CarouselPrevious variant="ghost" className="left-2" />
              <CarouselNext variant="ghost" className="right-2" />
            </>
          )}
        </Carousel>
      </motion.div>
    </Container>
  );
}
