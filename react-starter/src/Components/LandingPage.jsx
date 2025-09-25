import React from "react";
import { Link } from "react-router-dom";
import StreakSection from "./Streak";
import SpeechBubble from "./SpeechBubble";
import SheKnowsBot from "./Bot";

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
      <div>
        <button>Export</button>
        {/* </div>
      <div className="flex justify-center items-center h-screen bg-gray-100"> */}
        {/* <SpeechBubble text="Hello! I'm a speech bubble." /> */}

        <SheKnowsBot />
      </div>
    </div>
  );
}

export default LandingPage;
