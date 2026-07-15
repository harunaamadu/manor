import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import type { ProductReview } from "@/types/product";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <HugeiconsIcon
          key={n}
          icon={StarIcon}
          size={size}
          color="transparent"
          strokeWidth={1.5}
          className={cn(
            n <= Math.round(rating) ? "fill-amber-400" : "fill-muted",
          )}
        />
      ))}
    </div>
  );
}

export interface ProductRatingSummaryProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

/** Compact rating shown on cards / near the title */
export function ProductRatingSummary({
  rating,
  reviewCount,
  className,
}: ProductRatingSummaryProps) {
  return (
    <Tooltip>
      <div className={cn("flex items-center gap-1.5", className)}>
        <TooltipTrigger> {/** - Removed asChild **/}
          <button
            type="button"
            className="flex items-center gap-1 rounded-sm"
            aria-label={`${rating.toFixed(1)} out of 5 stars`}
          >
            <Stars rating={rating} />
          </button>
        </TooltipTrigger>
        <span className="text-xs text-muted-foreground tabular-nums">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()})
        </span>
      </div>

      <TooltipContent side="bottom">
        {rating.toFixed(1)} out of 5 · {reviewCount.toLocaleString()} reviews
      </TooltipContent>
    </Tooltip>
  );
}

export interface ProductReviewsProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  className?: string;
}

/** Full review list for the product detail page */
export function ProductReviews({
  reviews,
  rating,
  reviewCount,
  className,
}: ProductReviewsProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center gap-3">
        <span className="text-3xl font-semibold tabular-nums">
          {rating.toFixed(1)}
        </span>
        <div className="flex flex-col gap-0.5">
          <Stars rating={rating} size={16} />
          <span className="text-xs text-muted-foreground">
            Based on {reviewCount.toLocaleString()} reviews
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No reviews yet — be the first to write one.
        </p>
      ) : (
        <ul className="flex flex-col divide-y">
          {reviews.map((review) => (
            <li key={review.id} className="flex flex-col gap-1.5 py-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Stars rating={review.rating} />
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600">
                      <HugeiconsIcon icon={Tick02Icon} size={12} />
                      Verified
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>

              {review.title && (
                <p className="text-sm font-medium">{review.title}</p>
              )}
              <p className="text-sm text-muted-foreground">{review.body}</p>
              <span className="text-xs font-medium">{review.author}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductReviews;