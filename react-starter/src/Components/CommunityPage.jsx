import React from "react";
import { useNavigate } from "react-router-dom";

const communities = [
  { id: 1, name: "Mindfulness Group", members: 1200 },
  { id: 2, name: "Endometriosis Support", members: 850 },
  { id: 3, name: "Women Health", members: 540 },
  { id: 4, name: "Health Hackers", members: 300 }
];

const CommunitiesPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/landing");
  };
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Back Button - Top Right with Box */}
      <button
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
          color: "#333",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        aria-label="Back"
        onMouseOver={(e) => (e.currentTarget.style.background = "#e0e0e0")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
      >
        <span style={{ fontSize: "22px", marginRight: "6px" }}>&larr;</span>{" "}
        Back
      </button>
      <h1
        className="communities-title"
        style={{ marginLeft: 50, marginTop: 0 }}
      >
        Recommended Communities
      </h1>

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
              background: "rgba(77, 155, 171, 0.5)", // #4d9bab at 50% opacity
            }}
          >
            <div className="community-tile">
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
