'use client';

import { ProductItem, VIEW_MODE } from '@/types/Product';
import { fetchProducts } from '@/utils/search';
import { initializeViewMode } from '@/utils/initializeViewMode';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Grid } from './Grid';
import { List } from './List';
import { SearchForm } from './SearchForm';

export const ProductItems = () => {
  const [ref, inView] = useInView();

  const [page, setPage] = useState<number>(1);
  const [allItems, setAllItems] = useState<ProductItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [viewMode, setViewMode] = useState<VIEW_MODE>('grid');

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setViewMode(initializeViewMode());
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (inView && !isLoadingMore && hasMore) {
        try {
          setIsLoadingMore(true);
          const { products } = await fetchProducts({
            query: searchQuery,
            page,
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
      }
    };

    loadProducts();
  }, [inView, isLoadingMore, hasMore, page]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setPage(1);
    setAllItems([]);
    setHasMore(true);

    const { products } = await fetchProducts({
      query: searchQuery,
      page: 1,
    });

    setAllItems(products);
    setPage(2);
  };

  return (
    <section className="m-auto max-w-7xl">
      <SearchForm
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {viewMode === 'grid' ? (
        <Grid
          product={allItems}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          ref={ref}
        />
      ) : (
        <List
          product={allItems}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          ref={ref}
        />
      )}
    </section>
  );
};
