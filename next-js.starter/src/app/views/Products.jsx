'use client';

import { useState, useEffect } from "react";
// import { addProduct, fetchProducts, deleteProduct } from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchProducts()
    //   .then((res) => {
    //     setProducts(res.data);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to fetch products", err);
    //     setError("Failed to load products, Please try again");
    //   });
  }, []);

  const handleAddProduct = (newProduct) => {
    setError(null);
    // addProduct(newProduct)
    //   .then((res) => {
    //     setProducts((previousProducts) => [...previousProducts, res.data]);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to add product.", err);
    //     setError("Failed to add product.");
    //   });
  };

  const handleDeleteProduct = (id) => {
    setError(null);
    // deleteProduct(id)
    //   .then(() => {
    //     setProducts((prev) => prev.filter((product) => product.id !== id));
    //   })
    //   .catch((err) => {
    //     console.error("Failed to delete product", err);
    //     setError("Failed to delete product. Please try again.");
    //   });
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
