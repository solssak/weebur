export type ProductResponse = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
};
