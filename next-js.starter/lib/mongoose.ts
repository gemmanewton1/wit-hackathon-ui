import mongoose from "mongoose";

// checks if mongoose is already connected before creating a new connection
// this ensures there is only one open connection when Next.js does a hot reload
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.DATABASE_URL!);
}

export default mongoose;