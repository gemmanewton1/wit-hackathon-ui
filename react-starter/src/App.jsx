import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import LandingPage from "./Components/LandingPage";
import CommunitiesPage from "./Components/CommunityPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/communities" element={<CommunitiesPage />} />
    </Routes>
  );
}

export default App;
