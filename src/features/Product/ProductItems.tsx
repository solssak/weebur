'use client';

import {
  ProductItem,
  VIEW_MODE_KEY,
  VIEW_MODE_EXPIRY_KEY,
  VIEW_MODE,
} from '@/types/Product';
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

  const [viewMode, setViewMode] = useState<VIEW_MODE>('grid');

  useEffect(() => {
    const loadViewMode = () => {
      const savedViewMode = localStorage.getItem(VIEW_MODE_KEY);
      const expiryTime = localStorage.getItem(VIEW_MODE_EXPIRY_KEY);

      if (
        savedViewMode &&
        expiryTime &&
        new Date().getTime() < parseInt(expiryTime)
      ) {
        setViewMode(savedViewMode as VIEW_MODE);
      } else {
        const newViewMode = Math.random() < 0.5 ? 'grid' : 'list';
        setViewMode(newViewMode);
        localStorage.setItem(VIEW_MODE_KEY, newViewMode);
        localStorage.setItem(
          VIEW_MODE_EXPIRY_KEY,
          (new Date().getTime() + 24 * 60 * 60 * 1000).toString(),
        );
      }
    };

    loadViewMode();
  }, []);

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
