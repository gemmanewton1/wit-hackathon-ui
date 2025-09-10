import Products from './Products';
import { getProducts } from "./actions";

export default async function ProductsPage() {

const products = await getProducts();
  return <Products initialProducts={products} />;

}
