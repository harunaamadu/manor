"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouteObserver } from "@/hooks/use-route-observer";

interface NavItem {
  label: string;
  href: string;
}

interface NavlinksProps {
  navItems: NavItem[];
  loadingDelay?: number;
}

const Navlinks = ({ navItems, loadingDelay = 300 }: NavlinksProps) => {
  const { isActive } = useRouteObserver();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), loadingDelay);
    return () => clearTimeout(timer);
  }, [loadingDelay]);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-2 lg:gap-6 md:flex">
      {navItems.map((item) => {
        const active = isReady && isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="px-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-800 relative group"
          >
            {isReady ? (
              <span className="relative z-1">{item.label}</span>
            ) : (
              <span
                aria-hidden="true"
                className="relative z-1 inline-block h-4 w-12 animate-pulse rounded bg-zinc-200 align-middle text-transparent"
              >
                {item.label}
              </span>
            )}

            {/* active link / hovered link highlight */}
            <span
              className={`absolute inset-0 z-0 block border-b border-b-primary bg-primary/10 skew-x-12 transition-opacity duration-300 ${
                active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default Navlinks;