"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageOpenIcon } from "@hugeicons/core-free-icons";
import { containerVariants } from "@/lib/animation";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const COLUMN_MAP: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-3/4 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  columns = 4,
  className,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn("grid gap-x-4 gap-y-8", COLUMN_MAP[columns], className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <HugeiconsIcon
          icon={PackageOpenIcon}
          size={32}
          className="text-muted-foreground"
          strokeWidth={1.5}
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn("grid gap-x-4 gap-y-8", COLUMN_MAP[columns], className)}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}

export default ProductGrid;