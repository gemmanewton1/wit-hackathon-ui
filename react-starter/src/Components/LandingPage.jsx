import React from "react";
import { Link } from "react-router-dom";
import SheKnowsBot from "./Bot";

function LandingPage() {
  return (
    <div className="landing-container">
      <div>
        <SheKnowsBot />
      </div>
    </div>
  );
}

export default LandingPage;
