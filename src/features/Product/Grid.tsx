'use client';

import { ProductItem } from '@/types/Product';
import Image from 'next/image';

interface GridProps {
  product: ProductItem[];
}

export const Grid = ({ product }: GridProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {product.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="25vw"
              className="object-cover rounded-lg"
            />
          </div>
          <h2 className="text-lg font-bold mb-2 line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐ {product.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-500">
              💬 {product.reviews.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
