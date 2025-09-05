const CustomerTable = ({ customers, onDelete }) => {
  return (
    <div className="table-wrapper">
      <h2>Customers List</h2>
      <p>
        This table shows all customers saved in the backend, including the ones
        you've added and those already stored.
      </p>
      <table className="styled-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.dateOfBirth}</td>

              <td>
                <button
                  onClick={() => onDelete(customer._id || customer.id)}
                  className="delete-btn"
                  aria-label={`Delete customer ${customer.firstName} ${customer.lastName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
