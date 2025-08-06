import { useState } from "react";

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [error, setError] = useState("");

  // Updates form state so that the input value on screen stays in sync with what the user types.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This function runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent user submitting empty fields or fields with spaces
    if (!formData.name.trim() || parseFloat(formData.price) <= 0) {
      setError("Please enter a name and a price greater than 0.");
      return;
    }

    // Send the filled-in form data to the parent component
    onAddProduct({ name: formData.name, price: parseFloat(formData.price) });

    // Clear previous error messages
    setError("");

    // Clear the form fields after submission
    setFormData({ name: "", price: "" });
  };

  return (
    <>
      <h2> Add New Product</h2>
      <p>Fill in the form below to save a new product to the backend</p>
      {error && (
        <p className="form-error" aria-live="polite">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Product Information</legend>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="productPrice">Product Price (£)</label>
          <input
            type="number"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min={0.01}
          />
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </>
  );
};

export default ProductForm;
