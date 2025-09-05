const Loader = () => (
  <div style={{ textAlign: "center", padding: 20 }}>
    <div style={{
      width: 24,
      height: 24,
      border: "4px solid #ccc",
      borderTop: "4px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    }} />
    <style>
      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Loader;
