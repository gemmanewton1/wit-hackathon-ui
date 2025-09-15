import Products from './Products';
import { getProducts } from "./actions";

export default async function ProductsPage() {

const products = await getProducts();
  return (
      <div style={{ width: "100%" }}>
        <h1>Products</h1>
        <p>
          This page displays a list of products fetched from the backend when the
          page loads.
        </p>
        <p>
          When you fill out the form and submit it, the new product details are
          sent to the backend API to be saved. Once successfully added, the new
          product will immediately appear in the table below.
        </p>
        <p>
          You can also delete a product using the delete button next to each
          entry. This removes the product from both the backend and the table.
        </p>
        <Products initialProducts={products} />
    </div>

  );

}
