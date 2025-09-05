const Navbar = ({ links = [] }) => (
  <nav style={{ background: "#007bff", padding: "10px" }}>
    {links.map(link => (
      <a key={link.label} href={link.href} style={{ color: "white", marginRight: 16, textDecoration: "none" }}>
        {link.label}
      </a>
    ))}
  </nav>
);

export default Navbar;
