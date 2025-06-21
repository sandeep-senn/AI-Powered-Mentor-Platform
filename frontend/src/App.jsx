import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './Pages/Home';
import Learn from './Pages/Learn';
import Progress from './Pages/Progress';
import Topic from './components/Topic/Topic';
import CodeConverter from './Pages/CodeConvertor';
import CodeDebugger from './Pages/CodeDebugger';
import Feature from './components/Feature';
import Contact from './components/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HelpSection from './Pages/HelpSection';
import Roadmap from './components/Roadmap/Roadmap';

const App = () => {
  return (
    <>
      {/* Baaki sab components */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/learn/:category/:topic" element={<Topic />} />
          <Route path="/code-convertor" element={<CodeConverter />} />
          <Route path="/code-debug" element={<CodeDebugger />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpSection />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </AnimatePresence>
    </Router>
    </>
  );
};

export default App;
