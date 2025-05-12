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
  rating: number;
  thumbnail: string;
  reviews: Review[];
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
};
