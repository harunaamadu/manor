"use client";

import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseRouteObserverReturn {
  /** The current pathname, e.g. "/blog/my-post" */
  pathname: string;
  /**
   * Returns true if `href` matches the current route.
   * Exact match by default; pass `exact: false` to also match nested routes
   * (e.g. href "/blog" matches pathname "/blog/my-post").
   */
  isActive: (href: string, options?: { exact?: boolean }) => boolean;
}

/**
 * Tracks the current route (via Next.js's usePathname) so UI like nav links
 * can tell whether they correspond to the page that's currently active.
 */
export function useRouteObserver(): UseRouteObserverReturn {
  const pathname = usePathname() ?? "";

  const normalize = useCallback(
    (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path),
    []
  );

  const isActive = useCallback(
    (href: string, options?: { exact?: boolean }) => {
      const exact = options?.exact ?? true;
      const currentPath = normalize(pathname);
      const targetPath = normalize(href);

      if (exact) {
        return currentPath === targetPath;
      }

      return (
        currentPath === targetPath ||
        currentPath.startsWith(`${targetPath}/`)
      );
    },
    [pathname, normalize]
  );

  return useMemo(() => ({ pathname, isActive }), [pathname, isActive]);
}