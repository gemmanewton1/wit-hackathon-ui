'use client'
import { useState, useEffect } from "react";
import { addCustomer, deleteCustomer } from "./actions";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";


const Customers = ({initialCustomers}) => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [error, setError] = useState(null);




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
      {/* {customers.length > 0 && (
        <CustomerTable customers={customers} onDelete={handleDeleteCustomer} />
      )}
      <CustomerForm onAddCustomer={handleAddCustomer} /> */}
    </div>
  );
};

export default Customers;
