import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple auth: admin123 or netflix
    if (password === 'admin123' || password === 'netflix' || password === 'admin') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password. Try: admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E50914] mx-auto flex items-center justify-center font-black text-3xl text-white rounded mb-4">N</div>
          <h1 className="text-3xl font-black text-[#E50914] tracking-widest">NETFLIX</h1>
          <p className="text-gray-400 mt-2">Admin Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#181818] border border-[#232323] rounded-lg p-8">
          <h2 className="text-xl font-bold mb-6">Admin Login</h2>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#232323] border border-[#333] rounded px-4 py-3 text-white focus:outline-none focus:border-[#E50914]"
              required
            />
            <p className="text-xs text-gray-500 mt-2">Hint: admin123 or netflix</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm p-3 rounded mb-4">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-[#E50914] hover:bg-[#b81d24] text-white font-bold py-3 rounded transition">
            Access Control Panel
          </button>

          <div className="mt-6 pt-6 border-t border-[#232323] text-center">
            <p className="text-xs text-gray-500">This panel controls all app system</p>
            <p className="text-xs text-gray-600 mt-1">• Add videos via direct link • Manage thumbnails • Banners • Categories</p>
            <a href="/" className="inline-block mt-4 text-sm text-gray-400 hover:text-white">← Back to Netflix App</a>
          </div>
        </form>

        <div className="mt-6 bg-[#181818] border border-[#232323] rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-2">Demo Credentials</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Password: <code className="bg-[#232323] px-1.5 py-0.5 rounded text-white">admin123</code></p>
            <p>• Full CRUD for Movies</p>
            <p>• Direct video URL + thumbnail support</p>
            <p>• Banner & Category management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
