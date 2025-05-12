import { ProductItems } from '@/features/Product/ProductItems';

export default async function Home() {
  const getProduct = await fetch('https://dummyjson.com/products');
  const product = await getProduct.json();

  return <ProductItems product={product} />;
}
