import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import MyListPage from './pages/MyListPage';
import MovieModal from './components/MovieModal';
import VideoPlayer from './components/VideoPlayer';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import MoviesManager from './admin/MoviesManager';
import CategoriesManager from './admin/CategoriesManager';
import BannersManager from './admin/BannersManager';
import SettingsManager from './admin/SettingsManager';

const ProtectedAdmin = ({ children }) => {
  const isAuth = localStorage.getItem('admin_auth') === 'true';
  if (!isAuth) return <Navigate to="/admin/login" replace />;
  return children;
};

// Component to auto-redirect admin APK to /admin
const AdminRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect admin APK via global flag injected in index.html or via URL param or localStorage
    const isAdminApk = window.IS_ADMIN_APK === true || 
                      localStorage.getItem('app_mode') === 'admin' ||
                      window.location.search.includes('admin=true') ||
                      document.title.includes('Admin');

    // If it's admin APK and user is on root, redirect to admin
    if (isAdminApk && location.pathname === '/') {
      // Check if already authenticated, if not go to login, else dashboard
      const isAuth = localStorage.getItem('admin_auth') === 'true';
      if (!isAuth) {
        navigate('/admin/login', { replace: true });
      } else {
        navigate('/admin', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <AdminRedirector />
        <Routes>
          {/* Client App */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mylist" element={<MyListPage />} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
            <Route index element={<Dashboard />} />
            <Route path="movies" element={<MoviesManager />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="banners" element={<BannersManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Modals */}
        <MovieModal />
        <VideoPlayer />
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
