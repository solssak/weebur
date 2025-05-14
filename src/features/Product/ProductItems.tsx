'use client';

import { VIEW_MODE } from '@/types/Product';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { StatusMessage } from '@/ui/StatusMessage';
import { initializeViewMode } from '@/utils/initializeViewMode';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Grid } from './Grid';
import { List } from './List';
import { SearchForm } from './SearchForm';
import { SortButton } from './SortButton';
import { useProducts } from '@/hooks/useProduct';

export const ProductItems = () => {
  const [ref, inView] = useInView();
  const [viewMode, setViewMode] = useState<VIEW_MODE>('grid');
  const {
    products,
    isLoading,
    hasMore,
    searchQuery,
    setSearchQuery,
    loadMore,
    search,
    sort,
  } = useProducts();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewMode(initializeViewMode());
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (inView && !isLoading && hasMore) {
        loadMore();
      }
    }
  }, [inView, isLoading, hasMore, loadMore]);

  const handleSort = (newSortBy: string, newOrder: 'asc' | 'desc' | 'null') => {
    if (newOrder === 'null') {
      sort(null, null);
      return;
    }
    sort(newSortBy, newOrder);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await search(searchQuery);
  };

  const isEmptyResult = products.length === 0 && !isLoading;
  const isEndOfList = !hasMore && products.length > 0;

  return (
    <section className="m-auto max-w-7xl">
      <div className="flex items-center mb-4">
        <SearchForm
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <SortButton onSort={handleSort} />
      </div>

      {(() => {
        switch (viewMode) {
          case 'grid':
            return <Grid product={products} />;
          case 'list':
            return <List product={products} />;
          default:
            return null;
        }
      })()}

      {isEndOfList && <StatusMessage message="더 이상 불러올 수 없습니다." />}

      {hasMore || isLoading ? (
        <LoadingSpinner ref={ref} />
      ) : (
        isEmptyResult && <StatusMessage message="일치하는 결과가 없습니다." />
      )}
    </section>
  );
};
