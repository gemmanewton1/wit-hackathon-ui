import React from "react";
import { useNavigate } from "react-router-dom";

const communities = [
  { id: 1, name: "React Developers", members: 1200 },
  { id: 2, name: "JavaScript Enthusiasts", members: 850 },
  { id: 3, name: "Web Design", members: 540 },
  { id: 4, name: "Open Source Contributors", members: 300 },
];

const CommunitiesPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/landing");
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="communities-title">Recommended Communities</h1>
      <button onClick={handleBack}>Back</button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search communities..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* Communities List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {communities.map((community) => (
          <div
            key={community.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <div>
              <h2 style={{ margin: "0" }}>{community.name}</h2>
              <p style={{ margin: "5px 0 0", color: "#555" }}>
                {community.members} members
              </p>
            </div>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
