"use client";

import { useEffect, useState } from "react";
import { fetchProducts, type ProductListParams } from "@/lib/api/products";
import { Product } from "@/types/product";

export interface UseProductsResult {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Fetches a product list for `ProductGrid`. Re-fetches whenever any filter
 * value changes:
 *
 *   const { products, isLoading } = useProducts({ category: "jackets", sort: "newest" });
 *   <ProductGrid products={products} loading={isLoading} />
 */
export function useProducts(params: ProductListParams = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [version, setVersion] = useState(0);

  const { query, category, sort, page, pageSize } = params;

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchProducts({ query, category, sort, page, pageSize }, controller.signal)
      .then((res) => {
        setProducts(res.products);
        setTotal(res.total);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err : new Error("Failed to load products"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [query, category, sort, page, pageSize, version]);

  return {
    products,
    total,
    isLoading,
    error,
    refetch: () => setVersion((v) => v + 1),
  };
}

export default useProducts;