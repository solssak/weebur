'use client';

import { ProductResponse } from '@/types/Product';
import Image from 'next/image';

export const List = ({ product }: { product: ProductResponse }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {product.products.map((product: any) => (
        <div key={product.id}>
          <div className="flex gap-4">
            <div>
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={100}
                height={100}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-sm text-gray-500">{product.rating}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
