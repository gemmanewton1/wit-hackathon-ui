'use server'

import Product from "../../../lib/models/Product";

interface ProductType {
  id: string;
  name: string;
  price: number;
}


interface NewProductInput {
  name: string;
  price: number;
}


export async function addProduct({ name, price }: NewProductInput): Promise<ProductType> {
  if (!name || isNaN(price)) throw new Error("Invalid input");

  const product = await Product.create({ name, price });

  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  };
}


export async function getProducts(): Promise<ProductType[]> {
  const products = await Product.find({});

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  }));
}

export async function deleteProduct(productId: string){

  if (!productId) throw new Error("Product ID is required");

  await Product.findByIdAndDelete(productId)
}


