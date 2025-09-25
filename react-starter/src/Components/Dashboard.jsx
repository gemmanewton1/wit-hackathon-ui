import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Streak Section */}
      <div className="streak-section">
        <h2>Your Usage Streak</h2>
        <div className="streak-bar">
          {/* Example streak: 7 days */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`streak-dot ${i < 5 ? "active" : ""}`}
              title={`Day ${i + 1}`}
            />
          ))}
        </div>
        <span>5 day streak!</span>
      </div>

      {/* Split Screen Section */}
      <div className="split-section">
        <div className="split-left">
          <h3>Insights</h3>
          <p>Your pain has decreased by 20% this week.</p>
          <div className="graph-placeholder">
            {/* Fake Negative Graph SVG */}
            <svg width="220" height="100" viewBox="0 0 220 100">
              <polyline
                fill="none"
                stroke="#007bff"
                strokeWidth="4"
                points="10,10 40,40 70,30 100,70 130,50 160,80 190,60 210,90"
              />
              <circle cx="10" cy="10" r="4" fill="#007bff" />
              <circle cx="40" cy="40" r="4" fill="#007bff" />
              <circle cx="70" cy="30" r="4" fill="#007bff" />
              <circle cx="100" cy="70" r="4" fill="#007bff" />
              <circle cx="130" cy="50" r="4" fill="#007bff" />
              <circle cx="160" cy="80" r="4" fill="#007bff" />
              <circle cx="190" cy="60" r="4" fill="#007bff" />
              <circle cx="210" cy="90" r="4" fill="#007bff" />
            </svg>
          </div>
        </div>
        <div className="split-right">
          <h3>Predictions</h3>
          <p>Next week, you are likely to maintain your streak!</p>
          <h4>More Insights</h4>
          <ul>
            <li>Most active time: 8-10am</li>
            <li>Top feature used: Community Chat</li>
          </ul>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/communities")}>Communities</button>
          <button onClick={() => navigate("/landing")}>Journal</button>
        <button>Education</button>
      </div>
    </div>
  );
}

export default Dashboard;
