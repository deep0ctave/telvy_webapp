import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Drawer from './Drawer.jsx';
import Footer from './Footer.jsx';
import About from './About.jsx';
import ContactUs from './ContactUs.jsx';
import Register from './Registration.jsx';
import Login from './Login.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import HomePage from './HomePage.jsx';
import Dashboard from './Dashboard.jsx';
import QuizzesPage from './QuizzesPage.jsx';
import SettingsPage from './SettingsPage.jsx';
import AccountSettings from './AccountSettings.jsx';
import PrivacySettings from './PrivacySettings.jsx';
import NotificationSettings from './NotificationSettings.jsx';
import HelpAndFAQ from './HelpandFAQ.jsx';
import Notifications from './Notifications.jsx';
import GroupPage from './GroupPage.jsx';
import StatsPage from './StatsPage.jsx';
import Leaderboard from './LeaderboardPage.jsx';
import QuizPage from './QuizPage.jsx';

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
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/privacy" element={<PrivacySettings />} />
          <Route path="/help" element={<HelpAndFAQ />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quizzes/:quizId" element={<QuizPage />} /> {/* Testing Quiz Component */}
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
