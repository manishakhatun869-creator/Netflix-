import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'Home', path: '/', icon: (active) => (
      <svg className="w-6 h-6" fill={active ? "white" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { id: 'search', label: 'Search', path: '/search', icon: (active) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    )},
    { id: 'coming', label: 'Coming Soon', path: '/', icon: (active) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    )},
    { id: 'downloads', label: 'Downloads', path: '/mylist', icon: (active) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    )},
    { id: 'more', label: 'More', path: '/admin', icon: (active) => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
    )},
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#232323] z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path && tab.id !== 'coming' && tab.id !== 'more' ? true : (tab.id === 'home' && location.pathname === '/');
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
              {tab.icon(isActive)}
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
