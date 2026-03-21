import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CodeConvertor from "./Pages/CodeConvertor";
import CodeDebugger from "./Pages/CodeDebugger";
import HelpSection from "./Pages/HelpSection";
import Contact from "./components/Contact";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feature from "./components/Feature";
import Roadmap from "./components/Roadmap/Roadmap";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or a loading spinner
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes */}
            <Route path="/learn" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
            <Route path="/code-convertor" element={<ProtectedRoute><CodeConvertor /></ProtectedRoute>} />
            <Route path="/code-debugger" element={<ProtectedRoute><CodeDebugger /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpSection /></ProtectedRoute>} />
            
            {/* Redirect unknown routes to home */}
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
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
