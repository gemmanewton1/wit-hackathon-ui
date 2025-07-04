import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home.jsx";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/home" style={{ margin: "0 10px", color: "#61dafb" }}>
            Home
          </Link>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </header>
    </div>
  </Router>
);

export default App;
