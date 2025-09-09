'use server'

import Product from "../../../models/Product";

export async function addProduct(data: FormData) {

  const name = data.get("name")?.toString();
  const description = data.get("description")?.toString() || "";
  const price = parseFloat(data.get("price")?.toString() || "0");

  if (!name || isNaN(price)) throw new Error("Invalid input");

  const product = await Product.create({ name, description, price });

  // Need to convert to plain object
  return {
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
  };
}
