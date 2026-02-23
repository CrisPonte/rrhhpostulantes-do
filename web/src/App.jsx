import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import PostulantesList from './pages/PostulantesList';
import PostulanteDetail from './pages/PostulanteDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/postulantes" element={<PostulantesList />} />
              <Route path="/postulantes/:id" element={<PostulanteDetail />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>


          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
