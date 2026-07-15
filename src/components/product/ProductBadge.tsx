import React from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SparklesIcon,
  FireIcon,
  Alert02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import type { ProductBadgeType } from "@/types";

export interface ProductBadgeProps {
  type: ProductBadgeType;
  label?: string;
  className?: string;
}

const BADGE_CONFIG: Record<
  Exclude<ProductBadgeType, "custom">,
  { label: string; icon: typeof SparklesIcon | null; className: string }
> = {
  new: {
    label: "New",
    icon: SparklesIcon,
    className: "bg-foreground text-background",
  },
  sale: {
    label: "Sale",
    icon: null,
    className: "bg-red-500 text-white",
  },
  bestseller: {
    label: "Bestseller",
    icon: FireIcon,
    className: "bg-amber-400 text-black",
  },
  "low-stock": {
    label: "Low stock",
    icon: Alert02Icon,
    className: "bg-amber-100 text-amber-900",
  },
  "out-of-stock": {
    label: "Out of stock",
    icon: Cancel01Icon,
    className: "bg-muted text-muted-foreground",
  },
};

export function ProductBadge({ type, label, className }: ProductBadgeProps) {
  const config = type === "custom" ? null : BADGE_CONFIG[type];
  const text = label ?? config?.label ?? "";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-tight",
        config?.className ?? "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {config?.icon && (
        <HugeiconsIcon icon={config.icon} size={12} strokeWidth={2} />
      )}
      {text}
    </span>
  );
}

export function ProductBadgeList({
  badges,
  className,
}: {
  badges?: { type: ProductBadgeType; label?: string }[];
  className?: string;
}) {
  if (!badges?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map((b, i) => (
        <ProductBadge key={`${b.type}-${i}`} type={b.type} label={b.label} />
      ))}
    </div>
  );
}

export default ProductBadge;