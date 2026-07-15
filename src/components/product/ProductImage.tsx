import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageNotFound01Icon } from "@hugeicons/core-free-icons";

export interface ProductImageProps {
  src?: string;
  alt?: string;
  href?: string;
  aspect?: "square" | "portrait" | "landscape";
  className?: string;
  priority?: boolean;
}

const ASPECT_MAP = {
  square: "aspect-square",
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
};

export function ProductImage({
  src,
  alt,
  href,
  aspect = "portrait",
  className,
}: ProductImageProps) {
  const content = (
    <Skeleton
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-md bg-muted",
        ASPECT_MAP[aspect],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? "Product image"}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out",
            href && "group-hover:scale-105",
          )}
        />
      ) : (
        <HugeiconsIcon
          icon={ImageNotFound01Icon}
          size={24}
          className="text-muted-foreground"
          strokeWidth={1.5}
        />
      )}
    </Skeleton>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-md"
      aria-label={alt ?? "View product"}
    >
      {content}
    </Link>
  );
}

export default ProductImage;