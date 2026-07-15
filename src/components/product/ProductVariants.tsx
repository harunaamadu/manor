"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import type { ProductVariantGroup } from "@/types";

export interface ProductVariantsProps {
  groups: ProductVariantGroup[];
  onChange?: (selection: Record<string, string>) => void;
  className?: string;
}

export function ProductVariants({
  groups,
  onChange,
  className,
}: ProductVariantsProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      groups.map((g) => [g.id, g.options.find((o) => o.available !== false)?.id ?? ""]),
    ),
  );

  const select = (groupId: string, optionId: string) => {
    const next = { ...selected, [groupId]: optionId };
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {groups.map((group) => {
        const activeOption = group.options.find(
          (o) => o.id === selected[group.id],
        );

        return (
          <fieldset key={group.id} className="flex flex-col gap-2">
            <legend className="flex w-full items-center justify-between text-sm">
              <span className="font-medium">{group.name}</span>
              {activeOption && (
                <span className="text-muted-foreground">
                  {activeOption.label}
                </span>
              )}
            </legend>

            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isActive = selected[group.id] === option.id;
                const disabled = option.available === false;

                if (group.type === "color") {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => select(group.id, option.id)}
                      aria-label={option.label}
                      aria-pressed={isActive}
                      className={cn(
                        "relative flex size-8 items-center justify-center rounded-full border-2 transition-colors",
                        isActive ? "border-foreground" : "border-transparent",
                        disabled && "cursor-not-allowed opacity-30",
                      )}
                    >
                      <span
                        className="size-6 rounded-full border"
                        style={{ backgroundColor: option.swatch }}
                      />
                      {isActive && (
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={12}
                          className="absolute text-white mix-blend-difference"
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => select(group.id, option.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "min-w-9 rounded-md border px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground",
                      disabled &&
                        "cursor-not-allowed border-dashed text-muted-foreground line-through opacity-50",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

export default ProductVariants;