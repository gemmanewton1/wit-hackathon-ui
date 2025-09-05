const Grid = ({ children, columns = 3, gap = 16 }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap
  }}>
    {children}
  </div>
);

export default Grid;
