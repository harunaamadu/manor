"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { productCardVariants } from "@/lib/animation";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "./ProductImage";
import { ProductBadgeList } from "./ProductBadge";
import { ProductPrice } from "./ProductPrice";
import { ProductRatingSummary } from "./ProductReviews";
import type { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const primaryImage = product.images[0];

  return (
    <motion.div variants={productCardVariants} className={className}>
      <Card className="gap-3 overflow-hidden border-none bg-transparent p-0 shadow-none">
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="relative">
            <ProductImage
              href={href}
              src={primaryImage?.src}
              alt={primaryImage?.alt ?? product.name}
              aspect="portrait"
            />
            {product.badges && (
              <ProductBadgeList
                badges={product.badges}
                className="absolute left-2 top-2"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Link
              href={href}
              className="text-sm font-semibold leading-tight tracking-tight hover:underline"
            >
              {product.name}
            </Link>

            {product.rating != null && product.reviewCount != null && (
              <ProductRatingSummary
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            )}

            <ProductPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              currency={product.currency}
              size="sm"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProductCard;