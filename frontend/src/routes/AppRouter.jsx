import { Routes, Route } from 'react-router-dom';
import DrawerLayout from '../components/DrawerLayout/DrawerLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Quizzes from '../pages/Quizzes';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <DrawerLayout showSidebar={false}>
            <Landing />
          </DrawerLayout>
        }
      />

      <Route
        path="/login"
        element={
          <DrawerLayout showSidebar={false}>
            <Login />
          </DrawerLayout>
        }
      />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
            <DrawerLayout showSidebar={true}>
              <Dashboard />
            </DrawerLayout>
        }
      />

      <Route
        path="/quizzes"
        element={
          <PrivateRoute>
            <DrawerLayout showSidebar={true}>
              <Quizzes />
            </DrawerLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <DrawerLayout showSidebar={true}>
              <Settings />
            </DrawerLayout>
          </PrivateRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route
        path="*"
        element={
          <DrawerLayout showSidebar={false}>
            <NotFound />
          </DrawerLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
