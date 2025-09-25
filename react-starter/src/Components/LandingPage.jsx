import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      <nav>
        <div className="logo">MyApp</div>
        <ul>
          <li>
            <Link to="/">Sign In</Link>
          </li>
          <li>
            <Link to="/communities">Communities</Link>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <section className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Your new favorite app for everything.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
}

export default LandingPage;
