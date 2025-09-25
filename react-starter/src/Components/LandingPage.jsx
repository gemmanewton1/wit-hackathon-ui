import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      <section className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Your new favorite app for everything.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
}

export default LandingPage;
