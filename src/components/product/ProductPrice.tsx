import React from "react";
import { cn } from "@/lib/utils";

export interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

const SIZE_MAP = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export function ProductPrice({
  price,
  compareAtPrice,
  currency = "USD",
  size = "md",
  className,
}: ProductPriceProps) {
  const onSale = compareAtPrice != null && compareAtPrice > price;
  const discount = onSale
    ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100)
    : 0;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold tabular-nums", SIZE_MAP[size])}>
        {formatPrice(price, currency)}
      </span>

      {onSale && (
        <>
          <span className="text-muted-foreground text-sm line-through tabular-nums">
            {formatPrice(compareAtPrice!, currency)}
          </span>
          <span className="text-xs font-medium text-red-500">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}

export default ProductPrice;