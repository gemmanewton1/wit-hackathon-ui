import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("❌ DATABASE_URL is not defined in environment variables");
}

// Prevent multiple connections during hot reload in development
if (!mongoose.connection.readyState) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
}

export default mongoose;
