"use client";

import * as React from "react";
import Reveal from "@/components/animation/reveal";
import Container from "@/components/common/Container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { CATEGORIES } from "@/data/category";
import {
  imageScaleVariants,
  numberedItemVariants,
  textContainerVariants,
  textItemVariants,
} from "@/lib/animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Category = () => {
  const isMobile = useIsMobile();

  return (
    <Container className="relative bg-background mt-[-2%] z-101000 max-w-fit">
      <Reveal>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-3xl min-w-full max-w-64 sm:max-w-sm md:max-w-md lg:max-w-7xl"
          data-reveal
        >
          <CarouselContent>
            {CATEGORIES.map((c, index) => (
              <CarouselItem
                key={index}
                className={isMobile ? "@max-xs:basis-full sm:basis-1/2" : "basis-1/4"}
              >
                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                  className="p-1"
                >
                  <Card className="h-full w-full relative group overflow-hidden border-0 ring-0 outline-0">
                    <CardContent className="flex items-center justify-center p-2 h-full aspect-video">
                      <motion.a
                        href={c.href}
                        variants={textItemVariants}
                        className="relative z-2 font-normal text-xs p-2 bg-background/75 capitalize"
                      >
                        {c.label}
                      </motion.a>

                      <motion.span
                        variants={numberedItemVariants}
                        className="absolute top-1/2 -translate-y-1/2 right-0 text-9xl font-semibold translate-x-1/3 text-zinc-100/70 z-1"
                      >
                        {index + 1}
                      </motion.span>

                      <motion.div
                        variants={imageScaleVariants}
                        className="absolute inset-0"
                      >
                        <Image
                          src={c.image}
                          alt={c.label}
                          fill
                          className="object-cover group-hover:scale-110 transition-all ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0 -translate-x-1/2 md:-left-4" />
          <CarouselNext className="right-0 translate-x-1/2 md:-right-4" />
        </Carousel>
      </Reveal>
    </Container>
  );
};

export default Category;
