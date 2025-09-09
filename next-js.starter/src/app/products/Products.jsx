'use client';

import { useState} from "react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { addProduct, deleteProduct } from "./actions"

const Products = ({ initialProducts }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(initialProducts)

  const handleAddProduct = async (product) => {
    setError(null);
    if(!error){
      try {
        const newProduct = await addProduct(product);
        setProducts((previousProducts) => [...previousProducts, newProduct]);
      } catch (err) {
        console.error(err);
      }
    }
  };


const handleDeleteProduct = async (id) => {
  setError(null);
  try {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  } catch (err) {
    console.error(err);
  }
};

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
      {error && (
        <p style={{ color: "red" }} role="alert">
          {error}
        </p>
      )}
      {products.length > 0 && (
        <ProductTable products={products} onDelete={handleDeleteProduct} />
      )}
      <ProductForm onAddProduct={handleAddProduct} />
    </div>
  );
};

export default Products;
