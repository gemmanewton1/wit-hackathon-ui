const Card = ({ title, children }) => (
  <div style={{
    border: "1px solid #eee",
    borderRadius: 6,
    padding: 16,
    margin: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  }}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
);

export default Card;
