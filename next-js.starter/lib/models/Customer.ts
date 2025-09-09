import mongoose from "../db/connect"

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
});

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
