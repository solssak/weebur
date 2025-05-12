'use client';

import { ProductResponse } from '@/types/Product';
import Image from 'next/image';

export const Grid = ({ product }: { product: ProductResponse }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {product.products.map((product: any) => (
        <div key={product.id}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-sm text-gray-500 ">{product.rating}</p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      ))}
    </div>
  );
};
