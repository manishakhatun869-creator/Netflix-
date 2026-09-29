import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const menu = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/movies', label: 'Movies', icon: '🎬' },
    { path: '/admin/categories', label: 'Categories', icon: '📁' },
    { path: '/admin/banners', label: 'Banners', icon: '🖼️' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#181818] border-r border-[#232323] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform`}>
        <div className="p-6 border-b border-[#232323]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E50914] rounded flex items-center justify-center font-black text-lg">N</div>
            <div>
              <h1 className="font-black text-[#E50914] tracking-widest">NETFLIX</h1>
              <p className="text-xs text-gray-400 -mt-1">ADMIN PANEL</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menu.map(item => {
            const active = item.exact ? location.pathname === '/admin' : isActive(item.path) && item.path !== '/admin';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:bg-[#232323] hover:text-white'}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#232323]">
          <div className="bg-[#232323] rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold">Storage Info</p>
            <p className="text-xs text-gray-400 mt-1">Using LocalStorage as DB. Export backup regularly.</p>
            <div className="mt-2 h-1.5 bg-[#141414] rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-[#E50914]"></div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to App
          </Link>
          <button onClick={handleLogout} className="w-full bg-[#232323] hover:bg-[#333] text-white py-2 rounded-lg text-sm">Logout</button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#181818] border-b border-[#232323] flex items-center justify-between px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div>
            <h2 className="font-semibold">Admin Control Center</h2>
            <p className="text-xs text-gray-400 hidden md:block">Manage all app content, videos, thumbnails, banners & categories</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#232323] px-3 py-1.5 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Online
            </div>
            <img src="https://i.pravatar.cc/100?img=32" alt="admin" className="w-8 h-8 rounded-full" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
