"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ImageNotFound01Icon,
} from "@hugeicons/core-free-icons";
import { fadeVariants } from "@/lib/animation";
import type { ProductImageData } from "@/types";

export interface ProductGalleryProps {
  images: ProductImageData[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;
  const current = hasImages ? images[active] : undefined;

  const goTo = (index: number) => {
    setActive(((index % images.length) + images.length) % images.length);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="group relative overflow-hidden rounded-lg">
        <Skeleton className="flex aspect-square w-full items-center justify-center bg-muted">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.alt ?? productName}
                variants={fadeVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h-full w-full object-cover"
              />
            ) : (
              <HugeiconsIcon
                icon={ImageNotFound01Icon}
                size={28}
                className="text-muted-foreground"
                strokeWidth={1.5}
              />
            )}
          </AnimatePresence>
        </Skeleton>

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => goTo(active - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Previous image"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => goTo(active + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Next image"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "size-14 shrink-0 overflow-hidden rounded-md border transition-opacity",
                i === active
                  ? "border-foreground opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80",
              )}
            >
              <img
                src={img.src}
                alt={img.alt ?? `${productName} thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;