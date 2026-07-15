"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  Menu04Icon,
  Search02Icon,
  ShoppingCart02Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";

import { ClientOnly } from "@/components/common/OnlyClient";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type HugeIcon = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const IconButton = ({
  icon,
  href,
  label,
  onClick,
}: {
  icon: HugeIcon;
  href?: string;
  label: string;
  onClick?: () => void;
}) => {
  const content = (
    <HugeiconsIcon
      icon={icon}
      size={20}
      color="currentColor"
      strokeWidth={1.5}
    />
  );

  return href ? (
    <Button variant="ghost" size="icon-lg" asChild aria-label={label}>
      <Link href={href}>{content}</Link>
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={label}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

const CartBadge = ({
  count,
  hideBadge,
}: {
  count: number;
  hideBadge: boolean;
}) => {
  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <ClientOnly>
      <AnimatePresence mode="wait">
        {!hideBadge && count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className={cn(
              "absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-zinc-700 px-1 text-[10px] font-semibold leading-none text-zinc-50",
            )}
          >
            {displayCount}
          </motion.span>
        )}
      </AnimatePresence>
    </ClientOnly>
  );
};

const CartButton = ({
  count = 0,
  hideBadge = false,
  asLink = true,
  onClick,
}: {
  count?: number;
  hideBadge?: boolean;
  /** Render as a <Link> to /cart, or as a toggle button that fires onClick */
  asLink?: boolean;
  onClick?: () => void;
}) => {
  const icon = (
    <HugeiconsIcon
      icon={ShoppingCart02Icon}
      size={20}
      color="currentColor"
      strokeWidth={1.5}
    />
  );

  if (asLink) {
    return (
      <Button
        variant="ghost"
        size="icon-lg"
        className="relative"
        asChild
        aria-label="Open cart"
      >
        <Link href="/cart">
          {icon}
          <CartBadge count={count} hideBadge={hideBadge} />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="relative"
      aria-label="Open cart panel"
      aria-haspopup="dialog"
      onClick={onClick}
    >
      {icon}
      <CartBadge count={count} hideBadge={hideBadge} />
    </Button>
  );
};

const NavActions = ({
  cartCount = 10, // Counter
  onOpenCart,
}: {
  cartCount?: number;
  /** Called when the top navbar cart button is clicked — open your cart panel/drawer here */
  onOpenCart?: () => void;
}) => {
  const isMobile = useIsMobile();

  // Gate isMobile-dependent markup until after mount so the first client
  // render matches the server render exactly (avoids hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showMobileUI = mounted && isMobile;

  return (
    <div className="flex items-center gap-4">
      {/* Desktop actions */}
      {!showMobileUI && (
        <>
          <IconButton icon={Search02Icon} label="Search" />
          <IconButton icon={FavouriteIcon} href="/wishlist" label="Wishlist" />
          <IconButton icon={User02Icon} href="/login" label="Account" />
        </>
      )}

      {/* Top navbar cart: toggles the cart panel, badge visible */}
      <CartButton count={cartCount} asLink={false} onClick={onOpenCart} />

      {/* Mobile menu trigger */}
      {showMobileUI && <IconButton icon={Menu04Icon} label="Open menu" />}

      {/* Mobile bottom nav */}
      {showMobileUI && (
        <nav className="fixed bottom-0 left-1/2 z-50 flex w-xs max-w-full -translate-x-1/2 items-center justify-evenly bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-1px_0_0_var(--color-border)]">
          <IconButton icon={Search02Icon} label="Search" />
          <IconButton icon={FavouriteIcon} href="/wishlist" label="Wishlist" />
          <IconButton icon={User02Icon} href="/login" label="Account" />
          {/* Bottom nav cart: real link to /cart, badge hidden */}
          <CartButton count={cartCount} hideBadge asLink />
        </nav>
      )}
    </div>
  );
};

export default NavActions;