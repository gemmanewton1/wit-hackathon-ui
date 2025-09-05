const Select = ({ options, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
