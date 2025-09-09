import mongoose from "../db/connect"

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);