import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import DrawerLayout from '../components/DrawerLayout/DrawerLayout';

import Landing from '../pages/Landing';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Quizzes from '../pages/Quizzes';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

import PrivateRoute from './PrivateRoute';
import ContactUs from '../pages/ContactUs';

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
        <Route path="/contact-us" element={<ContactUs />}/>

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

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
