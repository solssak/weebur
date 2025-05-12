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

export type VIEW_MODE = 'grid' | 'list';

export const VIEW_MODE_KEY = 'product_view_mode';
export const VIEW_MODE_EXPIRY_KEY = 'product_view_mode_expiry';
