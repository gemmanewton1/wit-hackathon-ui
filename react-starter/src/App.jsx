import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./Components/SignIn";
import LandingPage from "./Components/LandingPage";
import CommunitiesPage from "./Components/CommunityPage";

function App() {
  const location = useLocation();
  // Hide navbar on sign-in page
  const showNavbar = location.pathname !== "/";
  const navLinks = [
    { label: "Home", href: "/landing" },
    { label: "Communities", href: "/communities" }
  ];

  return (
    <>
      {showNavbar && <Navbar links={navLinks} />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
      </Routes>
    </>
  );
}

export default App;
