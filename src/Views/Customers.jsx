import { useState, useEffect } from "react";
import { addCustomer, fetchCustomers, deleteCustomer } from "../services/api";
import CustomerTable from "../Components/CustomerTable";
import CustomerForm from "../Components/CustomerForm";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers()
      .then((res) => {
        // Map _id to id for all customers
        setCustomers(res.data.map(c => ({ ...c, id: c._id })));
        setError(null); // Clear any previous errors on success
      })
      .catch((err) => {
        console.error("Failed to fetch customers", err);
        setError("Failed to load customers. Please try again.");
      });
  }, []);

  const handleAddCustomer = (newCustomer) => {
    setError(null);
    addCustomer(newCustomer)
      .then((res) => {
        setCustomers((previousCustomers) => [...previousCustomers, res.data]);
      })
      .catch((err) => {
        console.error("Failed to add customer", err);
        setError("Failed to add customer. Please try again.");
      });
  };

  const handleDeleteCustomer = (id) => {
    setError(null);
    deleteCustomer(id)
      .then(() => {
        setCustomers((prev) => prev.filter((customer) => customer._id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete customer", err);
        setError("Failed to delete customer. Please try again.");
      });
  };
  return (
    <div style={{ width: "100%" }}>
      <h1>Customers</h1>
      <p>
        This page displays a list of customers fetched from the backend when the
        page loads.
      </p>
      <p>
        When you fill out the form and submit it, the new customer details are
        sent to the backend API to be saved. Once successfully added, the new
        customer will immediately appear in the table below.
      </p>
      <p>
        You can also delete a customer using the delete button next to each
        entry. This removes the customer from both the backend and the table.
      </p>
      {error && (
        <p style={{ color: "red" }} role="alert">
          {error}
        </p>
      )}
      {customers.length > 0 && (
        <CustomerTable customers={customers} onDelete={handleDeleteCustomer} />
      )}
      <CustomerForm onAddCustomer={handleAddCustomer} />
    </div>
  );
};

export default Customers;
