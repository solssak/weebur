import { ProductItem } from '@/types/Product';
import { fetchProducts } from '@/utils/fetchProducts';
import { useState } from 'react';

interface UseProductsReturn {
  products: ProductItem[];
  isLoading: boolean;
  hasMore: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  loadMore: () => Promise<void>;
  search: (query: string) => Promise<void>;
  sort: (sortBy: string | null, order: 'asc' | 'desc' | null) => Promise<void>;
}

const getInitialSearchQuery = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('searchQuery') || '';
};

const getInitialSortState = () => {
  if (typeof window === 'undefined') return { sortBy: null, order: null };
  const savedSortQuery = localStorage.getItem('sortQuery');
  if (savedSortQuery) {
    return JSON.parse(savedSortQuery);
  }
  return { sortBy: null, order: null };
};

export const useProducts = (): UseProductsReturn => {
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(getInitialSearchQuery);
  const { sortBy: initialSortBy, order: initialOrder } = getInitialSortState();
  const [sortBy, setSortBy] = useState<string | null>(initialSortBy);
  const [order, setOrder] = useState<'asc' | 'desc' | null>(initialOrder);

  const loadProducts = async (
    currentPage: number,
    currentSortBy = sortBy,
    currentOrder = order,
    shouldReset = false,
  ) => {
    try {
      setIsLoading(true);
      const { products: newProducts } = await fetchProducts({
        query: searchQuery,
        page: currentPage,
        sortBy: currentSortBy,
        order: currentOrder,
      });

      if (newProducts.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) =>
        shouldReset ? newProducts : [...prev, ...newProducts],
      );
    } catch (error) {
      console.error('데이터를 불러오는데 에러가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading) return;
    setPage(page + 1);
    await loadProducts(page + 1);
  };

  const search = async (query: string) => {
    setSearchQuery(query);
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchQuery', query);
    }
    setPage(1);
    setProducts([]);
    setHasMore(true);
    await loadProducts(1, sortBy, order, true);
  };

  const sort = async (
    newSortBy: string | null,
    newOrder: 'asc' | 'desc' | null,
  ) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'sortQuery',
        JSON.stringify({ sortBy: newSortBy, order: newOrder }),
      );
    }
    setPage(1);
    setProducts([]);
    setHasMore(true);
    await loadProducts(1, newSortBy, newOrder, true);
  };

  return {
    products,
    isLoading,
    hasMore,
    searchQuery,
    setSearchQuery,
    loadMore,
    search,
    sort,
  };
};
