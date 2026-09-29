import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const BannersManager = () => {
  const { banners, movies, addBanner, updateBanner, deleteBanner, featuredBanners } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ movieId: '', order: 1, active: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.movieId) return alert('Select movie');
    addBanner({ movieId: formData.movieId, order: parseInt(formData.order), active: formData.active });
    setShowForm(false);
    setFormData({ movieId: '', order: banners.length+1, active: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Banner Management</h1>
          <p className="text-gray-400 text-sm">Control hero banners shown on homepage</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#E50914] hover:bg-[#b81d24] text-white px-6 py-2.5 rounded-lg font-semibold">+ Add Banner</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold">Active Banners Order (Homepage Carousel)</h3>
          {featuredBanners.length === 0 ? (
            <div className="bg-[#181818] border border-[#232323] rounded-xl p-8 text-center text-gray-400">
              No active banners. Add movies to banner rotation.
            </div>
          ) : (
            <div className="space-y-3">
              {featuredBanners.map((b, idx) => (
                <div key={b.id} className="bg-[#181818] border border-[#232323] rounded-xl overflow-hidden flex">
                  <div className="w-10 bg-[#232323] flex flex-col items-center justify-center gap-1 py-2">
                    <span className="text-xs font-bold">{idx+1}</span>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => updateBanner(b.id, { order: Math.max(1, b.order-1) })} className="w-6 h-6 bg-[#141414] rounded text-[10px]">↑</button>
                      <button onClick={() => updateBanner(b.id, { order: b.order+1 })} className="w-6 h-6 bg-[#141414] rounded text-[10px]">↓</button>
                    </div>
                  </div>
                  <img src={b.movie.banner} alt={b.movie.title} className="w-32 h-20 object-cover" />
                  <div className="flex-1 p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{b.movie.title}</p>
                      <p className="text-xs text-gray-400">{b.movie.year} • {b.movie.category.join(', ')}</p>
                      <p className="text-[11px] text-gray-500 mt-1">Order: {b.order} • {b.active ? 'Active' : 'Inactive'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateBanner(b.id, { active: !b.active })} className={`px-3 py-1 rounded text-xs ${b.active ? 'bg-green-900/30 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                        {b.active ? 'Active' : 'Inactive'}
                      </button>
                      <button onClick={() => { if(confirm('Remove banner?')) deleteBanner(b.id); }} className="px-3 py-1 bg-red-900/30 text-red-300 rounded text-xs">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <h3 className="font-bold mb-3">All Banners (including inactive)</h3>
            <div className="bg-[#181818] border border-[#232323] rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-gray-400 border-b border-[#232323]">
                  <tr>
                    <th className="p-3">Movie</th>
                    <th className="p-3">Order</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map(b => {
                    const movie = movies.find(m=>m.id===b.movieId);
                    return (
                      <tr key={b.id} className="border-b border-[#232323]/50">
                        <td className="p-3 flex gap-2 items-center">
                          <img src={movie?.thumbnail} className="w-8 h-10 object-cover rounded" />
                          <span>{movie?.title || 'Unknown'}</span>
                        </td>
                        <td className="p-3">{b.order}</td>
                        <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${b.active ? 'bg-green-900/30 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{b.active ? 'Active' : 'Inactive'}</span></td>
                        <td className="p-3 flex gap-2">
                          <button onClick={() => updateBanner(b.id, { active: !b.active })} className="px-2 py-1 bg-[#232323] rounded text-xs">Toggle</button>
                          <button onClick={() => deleteBanner(b.id)} className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-4">Preview</h3>
            {featuredBanners[0] ? (
              <div>
                <img src={featuredBanners[0].movie.banner} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                <p className="font-bold mt-3">{featuredBanners[0].movie.title}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{featuredBanners[0].movie.description}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No banner to preview</p>
            )}
          </div>

          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-3">Tips</h3>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li>Only active banners show on homepage</li>
              <li>Lower order number shows first</li>
              <li>Use high-quality 1920x1080 banner images</li>
              <li>Featured movies work best as banners</li>
              <li>Max 5 banners recommended for UX</li>
            </ul>
          </div>

          <div className="bg-[#232323] rounded-xl p-4">
            <p className="text-sm font-semibold">Available Movies</p>
            <p className="text-xs text-gray-400 mt-1">{movies.length} movies can be used as banners</p>
            <div className="mt-3 max-h-60 overflow-y-auto space-y-2">
              {movies.slice(0,10).map(m => (
                <div key={m.id} className="flex gap-2 items-center text-xs">
                  <img src={m.thumbnail} className="w-6 h-8 object-cover rounded" />
                  <span className="truncate">{m.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-[#181818] border border-[#232323] rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">Add Banner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Select Movie</label>
                <select required value={formData.movieId} onChange={e=>setFormData({...formData, movieId: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none">
                  <option value="">Choose movie...</option>
                  {movies.map(m => (
                    <option key={m.id} value={m.id}>{m.title} ({m.year})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Order</label>
                <input type="number" min="1" value={formData.order} onChange={e=>setFormData({...formData, order: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.active} onChange={e=>setFormData({...formData, active: e.target.checked})} />
                <span className="text-sm">Active</span>
              </label>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-[#232323] rounded-lg">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-[#E50914] rounded-lg font-semibold">Add Banner</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BannersManager;
