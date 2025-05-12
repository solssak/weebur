'use client';

import { ProductItem } from '@/types/Product';
import { Grid } from './Grid';
import { List } from './List';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const ProductItems = () => {
  const [ref, inView] = useInView();
  const [page, setPage] = useState<number>(1);
  const [allItems, setAllItems] = useState<ProductItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchMoreProducts = async () => {
      if (inView && !isLoadingMore && hasMore) {
        try {
          setIsLoadingMore(true);
          const skip = page * 20;
          const response = await fetch(
            `https://dummyjson.com/products?limit=20&skip=${skip}`,
          );
          const data = await response.json();

          if (data.products.length === 0) {
            setHasMore(false);
            return;
          }

          setAllItems((prev) => [...prev, ...data.products]);
          setPage((prev) => prev + 1);
        } catch (error) {
          console.error('데이터를 불러오는데 에러가 발생했습니다.', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    fetchMoreProducts();
  }, [inView, isLoadingMore, hasMore, page]);

  return (
    <section className="m-auto max-w-7xl">
      <Grid
        product={allItems}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        ref={ref}
      />
      <List
        product={allItems}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        ref={ref}
      />
    </section>
  );
};
