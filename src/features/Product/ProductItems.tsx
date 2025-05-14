'use client';

import { ProductItem, VIEW_MODE } from '@/types/Product';
import { fetchProducts } from '@/utils/search';
import { initializeViewMode } from '@/utils/initializeViewMode';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Grid } from './Grid';
import { List } from './List';
import { SearchForm } from './SearchForm';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { StatusMessage } from '@/ui/StatusMessage';
import { SortButton } from './SortButton';

export const ProductItems = () => {
  const [ref, inView] = useInView();

  const [page, setPage] = useState<number>(1);
  const [allItems, setAllItems] = useState<ProductItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [viewMode, setViewMode] = useState<VIEW_MODE>('grid');
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const saved = localStorage.getItem('searchQuery');
    return saved || '';
  });
  const [sortBy, setSortBy] = useState<string | null>(() => {
    const saved = localStorage.getItem('sortQuery');
    if (saved) {
      const { sortBy } = JSON.parse(saved);
      return sortBy;
    }
    return null;
  });
  const [order, setOrder] = useState<'asc' | 'desc' | null>(() => {
    const saved = localStorage.getItem('sortQuery');
    if (saved) {
      const { order } = JSON.parse(saved);
      return order;
    }
    return null;
  });

  useEffect(() => {
    setViewMode(initializeViewMode());
  }, []);

  const handleSort = (newSortBy: string, newOrder: 'asc' | 'desc' | 'null') => {
    if (newOrder === 'null') {
      setSortBy(null);
      setOrder(null);
      localStorage.setItem(
        'sortQuery',
        JSON.stringify({ sortBy: null, order: null }),
      );
      setPage(1);
      setAllItems([]);
      setHasMore(true);
      loadProducts(1, null, null);
      return;
    }

    setSortBy(newSortBy);
    setOrder(newOrder);
    localStorage.setItem(
      'sortQuery',
      JSON.stringify({ sortBy: newSortBy, order: newOrder }),
    );
    setPage(1);
    setAllItems([]);
    setHasMore(true);
    loadProducts(1, newSortBy, newOrder);
  };

  const loadProducts = async (
    currentPage: number,
    currentSortBy = sortBy,
    currentOrder = order,
  ) => {
    try {
      setIsLoadingMore(true);
      const { products } = await fetchProducts({
        query: searchQuery,
        page: currentPage,
        sortBy: currentSortBy,
        order: currentOrder,
      });

      if (products.length === 0) {
        setHasMore(false);
        return;
      }

      setAllItems((prev) => [...prev, ...products]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('데이터를 불러오는데 에러가 발생했습니다.', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (inView && !isLoadingMore && hasMore) {
      loadProducts(page);
    }
  }, [inView]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    localStorage.setItem('searchQuery', searchQuery);
    setPage(1);
    setAllItems([]);
    setHasMore(true);
    try {
      const { products } = await fetchProducts({
        query: searchQuery,
        page: 1,
        sortBy,
        order,
      });

      setAllItems(products);
      setPage(2);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const isEmptyResult = allItems.length === 0 && searchQuery;
  const isEndOfList = !hasMore && allItems.length > 0;
  const shouldShowSpinner = hasMore || isLoadingMore;

  return (
    <section className="m-auto max-w-7xl">
      <div className="flex items-center gap-4 mb-4">
        <SearchForm
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <SortButton onSort={handleSort} />
      </div>

      {viewMode === 'grid' ? (
        <Grid product={allItems} />
      ) : (
        <List product={allItems} />
      )}

      {isEndOfList && <StatusMessage message="더 이상 불러올 수 없습니다." />}

      {shouldShowSpinner ? (
        <LoadingSpinner ref={ref} />
      ) : (
        <>
          {isEmptyResult && (
            <StatusMessage message="일치하는 결과가 없습니다." />
          )}
        </>
      )}
    </section>
  );
};
