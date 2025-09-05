const Button = ({ label, onClick, type = "button", style }) => (
  <button type={type} style={style} onClick={onClick}>
    {label}
  </button>
);

export default Button;
