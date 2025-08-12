import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import Products from "./Views/Products";
import Customers from "./Views/Customers";
import NotFound from "./Views/NotFound";
import logo from "./witLogo.png";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav style={{ marginBottom: "2rem" }}>
          <Link to="/" style={{ margin: "0 10px", color: "#61dafb" }}>
            Home
          </Link>
          <Link to="/products" style={{ margin: "0 10px", color: "#61dafb" }}>
            Products
          </Link>
          <Link to="/customers" style={{ margin: "0 10px", color: "#61dafb" }}>
            Customers
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </header>
    </div>
  </Router>
);

export default App;
