const List = ({ items = [], renderItem }) => (
  <ul>
    {items.map((item, idx) => (
      <li key={idx}>
        {renderItem ? renderItem(item) : item}
      </li>
    ))}
  </ul>
);

export default List;
