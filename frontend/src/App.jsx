import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CodeConvertor from "./Pages/CodeConvertor";
import CodeDebugger from "./Pages/CodeDebugger";
import HelpSection from "./Pages/HelpSection";
import Contact from "./components/Contact";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Profile from "./Pages/Auth/Profile";
import SettingsPage from "./Pages/Auth/Settings";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feature from "./components/Feature";
import Roadmap from "./components/Roadmap/Roadmap";
import Upgrade from "./Pages/Upgrade";
import CookieBanner from "./components/CookieBanner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      <CookieBanner />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/learn" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="/code-convertor" element={<ProtectedRoute><CodeConvertor /></ProtectedRoute>} />
          <Route path="/code-debugger" element={<ProtectedRoute><CodeDebugger /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpSection /></ProtectedRoute>} />
          <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
