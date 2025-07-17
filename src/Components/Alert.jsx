const Alert = ({ type = "info", message }) => {
  const colors = {
    info: "#d1ecf1",
    success: "#d4edda",
    warning: "#fff3cd",
    error: "#f8d7da"
  };
  return (
    <div style={{
      background: colors[type] || "#d1ecf1",
      color: "#333",
      padding: 12,
      borderRadius: 4,
      margin: "10px 0"
    }}>
      {message}
    </div>
  );
};

export default Alert;
