import React from 'react';
import { useMovies } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { movies, categories, banners, settings } = useMovies();

  const totalViews = movies.reduce((sum, m) => sum + (m.views || 0), 0);
  const trendingCount = movies.filter(m => m.isTrending).length;
  const featuredCount = movies.filter(m => m.isFeatured).length;

  const stats = [
    { label: 'Total Movies', value: movies.length, icon: '🎬', color: 'bg-blue-600', change: '+12%' },
    { label: 'Categories', value: categories.length, icon: '📁', color: 'bg-purple-600', change: '+2' },
    { label: 'Active Banners', value: banners.filter(b=>b.active).length, icon: '🖼️', color: 'bg-green-600', change: '4 active' },
    { label: 'Total Views', value: `${(totalViews/1000000).toFixed(1)}M`, icon: '👁️', color: 'bg-red-600', change: '+23%' },
  ];

  const recentMovies = [...movies].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening with your Netflix clone.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#181818] border border-[#232323] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className="text-xs bg-[#232323] px-2 py-1 rounded-full text-green-400">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold mt-4">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Movies */}
        <div className="lg:col-span-2 bg-[#181818] border border-[#232323] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Recently Added Movies</h3>
            <Link to="/admin/movies" className="text-sm text-[#E50914] hover:underline">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentMovies.map(movie => (
              <div key={movie.id} className="flex items-center gap-4 p-3 bg-[#232323] rounded-lg hover:bg-[#2a2a2a] transition">
                <img src={movie.thumbnail} alt={movie.title} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{movie.title}</p>
                  <p className="text-xs text-gray-400 truncate">{movie.category.join(', ')} • {movie.year}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-black px-1.5 py-0.5 rounded">{movie.ageRating}</span>
                    <span className="text-xs text-gray-500">{movie.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{movie.rating} ⭐</p>
                  <p className="text-xs text-gray-400">{movie.views?.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & System */}
        <div className="space-y-6">
          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin/movies" className="w-full bg-[#E50914] hover:bg-[#b81d24] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <span>➕</span> Add New Movie
              </Link>
              <Link to="/admin/banners" className="w-full bg-[#232323] hover:bg-[#333] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <span>🖼️</span> Manage Banners
              </Link>
              <Link to="/admin/categories" className="w-full bg-[#232323] hover:bg-[#333] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <span>📁</span> Add Category
              </Link>
            </div>
          </div>

          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-4">System Status</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">App Name</span>
                <span className="font-semibold">{settings.appName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Featured</span>
                <span className="font-semibold">{featuredCount} movies</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trending</span>
                <span className="font-semibold">{trendingCount} movies</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Video Source</span>
                <span className="text-green-400 font-semibold">Direct Link ✓</span>
              </div>
              <div className="pt-4 border-t border-[#232323]">
                <p className="text-xs text-gray-400 mb-2">Data Storage</p>
                <div className="bg-[#0f0f0f] rounded p-3 text-xs font-mono text-gray-300">
                  localStorage<br/>
                  • netflix_movies<br/>
                  • netflix_categories<br/>
                  • netflix_banners<br/>
                  • netflix_settings
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#E50914] to-[#b81d24] rounded-xl p-6 text-white">
            <h3 className="font-bold">Need Help?</h3>
            <p className="text-sm mt-2 opacity-90">Add movies using direct video links (MP4) and thumbnail URLs. Supports any public video URL.</p>
            <ul className="text-xs mt-3 space-y-1 opacity-80 list-disc list-inside">
              <li>MP4 direct links recommended</li>
              <li>Thumbnail: 500x750 JPG/PNG</li>
              <li>Banner: 1920x1080 JPG/PNG</li>
              <li>Video will play in built-in player</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
