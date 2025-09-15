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
    <>      
      {error && (
      <p style={{ color: "red" }} role="alert">
        {error}
      </p>
      )}
      {products.length > 0 && (
        <ProductTable products={products} onDelete={handleDeleteProduct} />
      )}
      <ProductForm onAddProduct={handleAddProduct} />
    </>

  );
};

export default Products;
