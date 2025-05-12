import { ProductItem } from '@/types/Product';

interface FetchProductsParams {
  query?: string;
  page: number;
  limit?: number;
}

export const fetchProducts = async ({
  query,
  page,
  limit = 20,
}: FetchProductsParams): Promise<{
  products: ProductItem[];
}> => {
  try {
    const skip = (page - 1) * limit;
    const url = query
      ? `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(url);
    const data = await response.json();
    return {
      products: data.products,
    };
  } catch (error) {
    console.error('데이터를 불러오는데 에러가 발생했습니다:', error);
    return {
      products: [],
    };
  }
};
