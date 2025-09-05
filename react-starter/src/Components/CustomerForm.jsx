import { useState } from "react";

// This component lets users add a new customer
const CustomerForm = ({ onAddCustomer }) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  // Updates form state so that the input value on screen stays in sync with what the user types.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // This function validates and submits form data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check that all fields are filled and contain non-whitespace characters
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    // Send the filled-in form data to the parent component (Customer.jsx)
    onAddCustomer(formData);

    // Clear previous error messages
    setError("");

    // Reset the form fields - clears user's input values from fields once they have successfully submitted
    setFormData(initialFormData);
  };
  return (
    <>
      <h2>Add New Customer</h2>
      <p>Fill in the form below to save a new customer to the backend.</p>
      {error && (
        <p className="form-error" aria-live="polite">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Customer Information</legend>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </>
  );
};
export default CustomerForm;
