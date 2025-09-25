import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ links = [] }) => (
  <nav className="navbar-opaque" style={{ padding: "16px", display: "flex", alignItems: "center" }}>
    {links.map(link => (
      <Link
        key={link.label}
        to={link.href}
        style={{
          color: "#222",
          marginRight: 24,
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

export default Navbar;
