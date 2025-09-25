import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./Components/SignIn";
import LandingPage from "./Components/LandingPage";
import CommunitiesPage from "./Components/CommunityPage";
import Dashboard from "./Components/Dashboard"; // Add this import

function App() {
  const location = useLocation();
  // Hide navbar on sign-in page
  const showNavbar = location.pathname !== "/";
  const navLinks = [
    { label: "Home", href: "/landing" },
    { label: "Communities", href: "/communities" },
    { label: "Dashboard", href: "/dashboard" } // Add dashboard link
  ];

  return (
    <>
      {showNavbar && <Navbar links={navLinks} />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
      </Routes>
    </>
  );
}

export default App;
