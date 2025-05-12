import { ProductResponse } from '@/types/Product';
import { Grid } from './Grid';
import { List } from './List';

export const ProductItems = ({ product }: { product: ProductResponse }) => {
  return (
    <>
      <section className="m-auto max-w-7xl">
        {/* Grid */}
        <Grid product={product} />
        {/* List */}
        <List product={product} />
      </section>
    </>
  );
};
