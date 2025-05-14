'use client';

import { ProductItem } from '@/types/Product';
import Image from 'next/image';

interface ListProps {
  product: ProductItem[];
}

export const List = ({ product }: ListProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {product.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex gap-6">
            <div className="relative w-48 h-48 flex-shrink-0">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="192px"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.rating}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-500">
                  💬 {product.reviews.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
