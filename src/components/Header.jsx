import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

const Header = () => {
  const { settings, searchQuery, setSearchQuery } = useMovies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 lg:px-16 py-3 md:py-4">
        {/* Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#E50914] flex items-center justify-center font-black text-white text-xl md:text-2xl rounded-sm">
              {settings.logo || 'N'}
            </div>
            <span className="text-[#E50914] font-black text-xl md:text-2xl tracking-widest hidden sm:block">{settings.appName}</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link to="/" className={`${isActive('/') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'} transition`}>Home</Link>
            <Link to="/search" className={`${isActive('/search') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'} transition`}>TV Shows</Link>
            <Link to="/" className="text-gray-300 hover:text-white transition">Movies</Link>
            <Link to="/" className="text-gray-300 hover:text-white transition">New & Popular</Link>
            <Link to="/mylist" className={`${isActive('/mylist') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'} transition`}>My List</Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search */}
          <div className="flex items-center">
            {showSearch ? (
              <div className="flex items-center gap-2 bg-black border border-white px-2 py-1 animate-fade-in">
                <button onClick={() => setShowSearch(false)} className="text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <input
                  autoFocus
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value && location.pathname !== '/search') navigate('/search');
                  }}
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-32 md:w-60 text-sm"
                />
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)} className="text-white hover:text-gray-300 transition">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            )}
          </div>

          <span className="text-white text-sm hidden md:block">DVD</span>
          <button className="text-white">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="https://i.pravatar.cc/100?img=12" alt="profile" className="w-7 h-7 md:w-8 md:h-8 rounded" />
            <svg className="w-4 h-4 text-white hidden md:block" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </div>

          <Link to="/admin" className="ml-2 px-3 py-1 bg-[#E50914] text-white text-xs md:text-sm rounded font-semibold hover:bg-[#b81d24] transition">Admin</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
