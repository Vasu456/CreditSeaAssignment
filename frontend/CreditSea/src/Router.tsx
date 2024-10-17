import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'; // Ensure Tailwind CSS is correctly loaded
import Navbar from "./components/Navbar.tsx";
import AdminDashboard from "./components/AdminDashboard.tsx"; // Create this component
import VerifierDashboard from "./components/VerifierDashboard.tsx"; // Create this component
import Sidebar from "./components/Sidebar.tsx"; // Create this component
import App from "./App.tsx";

const Routers: React.FC = () => {
  const location = useLocation();

  // Function to check if current path includes "/Dashboard"
  const isDashboardRoute = location.pathname.includes("/Dashboard");

  return (
    <div className="App bg-gray-100 min-h-screen">
      {/* Navbar is always present */}
      <Navbar />

      <div className="flex flex-row">
        {/* Sidebar will only be rendered when "/Dashboard" is in the path */}
        {isDashboardRoute && (
          <div className="w-64">
            <Sidebar />
          </div>
        )}

        {/* Main content area */}
        <div className={isDashboardRoute ? "flex-grow p-6" : "w-full p-6"}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Dashboard" element={<AdminDashboard />} />
            <Route path="/Dashboard/Loans" element={<VerifierDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AppRouter: React.FC = () => (
  <Router>
    <Routers />
  </Router>
);

export default AppRouter;
