import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import About from "./Views/About";
import Contact from "./Views/Contact";
import NotFound from "./Views/NotFound";
import logo from "./logo.svg";
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
          <Link to="/about" style={{ margin: "0 10px", color: "#61dafb" }}>
            About
          </Link>
          <Link to="/contact" style={{ margin: "0 10px", color: "#61dafb" }}>
            Contact
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </header>
    </div>
  </Router>
);

export default App;
