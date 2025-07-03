import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import DrawerLayout from '../components/DrawerLayout/DrawerLayout';

import Landing from '../components/pages/Landing';
import About from '../components/pages/About';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Dashboard from '../components/pages/Dashboard';
import Quizzes from '../components/pages/Quizzes';
import Settings from '../components/pages/Settings';
import NotFound from '../components/pages/NotFound';
import ContactUs from '../components/pages/ContactUs';

import QuizStart from '../components/pages/Attempts/QuizStart';
import StartAttempt from '../components/pages/Attempts/StartAttempt';
import AttemptResult from '../components/pages/Attempts/AttemptResult';
import AttemptHistory from '../components/pages/Attempts/AttemptHistory';
import LiveAttempt from '../components/pages/Attempts/LiveAttempt';

import PrivateRoute from './PrivateRoute';

const LayoutWrapper = () => {
  const location = useLocation();
  const hideSidebarPaths = ['/', '/login', '/register', '/about', '/contact-us'];
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <DrawerLayout showSidebar={showSidebar}>
      <Outlet />
    </DrawerLayout>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Private */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Quiz Attempt Pages */}
        <Route
          path="/attempts/start/:quizId"
          element={
            <PrivateRoute>
              <QuizStart />
            </PrivateRoute>
          }
        />

        <Route
          path="/attempts/result/:attemptId"
          element={
            <PrivateRoute>
              <AttemptResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/attempts/history"
          element={
            <PrivateRoute>
              <AttemptHistory />
            </PrivateRoute>
          }
        />

        <Route path="/attempts/live/:attemptId" 
        element={
          <PrivateRoute>
            <LiveAttempt />
          </PrivateRoute>
        }
         />


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
