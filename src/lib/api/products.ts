import { Product } from "@/types/product";

/**
 * Point this at your real API. Adjust the base URL / paths to match your
 * backend — these two functions are the only thing the hooks depend on, so
 * swapping in a different client (REST, GraphQL, a CMS SDK) only touches
 * this file.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export interface ProductListParams {
  query?: string;
  category?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "rating";
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchProducts(
  params: ProductListParams = {},
  signal?: AbortSignal,
): Promise<ProductListResponse> {
  const search = new URLSearchParams();
  if (params.query) search.set("query", params.query);
  if (params.category) search.set("category", params.category);
  if (params.sort) search.set("sort", params.sort);
  if (params.page) search.set("page", String(params.page));
  if (params.pageSize) search.set("pageSize", String(params.pageSize));

  const res = await fetch(`${API_BASE}/products?${search.toString()}`, {
    signal,
  });
  return handleResponse<ProductListResponse>(res);
}

export async function fetchProduct(
  slug: string,
  signal?: AbortSignal,
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${slug}`, { signal });
  return handleResponse<Product>(res);
}