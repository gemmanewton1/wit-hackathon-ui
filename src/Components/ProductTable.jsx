const ProductTable = ({ products, onDelete }) => {
  return (
    <div className="table-wrapper">
      <h2>Products List</h2>
      <p>
        This table shows all products saved in the backend, including the ones
        you've added and those already stored.
      </p>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id || product._id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td className="actions">
                <button
                  onClick={() => onDelete(product.id || product._id)}
                  className="delete-btn"
                  aria-label={`Delete product ${product.name}`}
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

export default ProductTable;
