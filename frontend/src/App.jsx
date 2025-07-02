import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Drawer from './Drawer.jsx';
import Footer from './Footer.jsx';
import LandingPage from './LandingPage.jsx';


// The main logic component
function MainLayout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/quiz","/about","/contact","/register","/login","/forgotpassword"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

// Quiz example data
  const sampleQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris"
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      answer: "4"
    }
  ];

  return (
    <>
      <Drawer showSidebar={showSidebar}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Drawer>
      <Footer />
    </>
  );
}

// The top-level component with Router
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
