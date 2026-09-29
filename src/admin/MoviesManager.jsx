import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const MoviesManager = () => {
  const { movies, categories, addMovie, updateMovie, deleteMovie } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    banner: '',
    videoUrl: '',
    trailerUrl: '',
    category: [],
    year: new Date().getFullYear(),
    rating: 8.0,
    duration: '2h 00m',
    ageRating: '13+',
    cast: '',
    director: '',
    isFeatured: false,
    isTrending: false,
  });

  const filtered = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      category: Array.isArray(formData.category) ? formData.category : formData.category.split(',').map(s=>s.trim()).filter(Boolean),
      cast: typeof formData.cast === 'string' ? formData.cast.split(',').map(s=>s.trim()).filter(Boolean) : formData.cast,
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating),
    };
    if (editing) {
      updateMovie(editing.id, payload);
      setEditing(null);
    } else {
      addMovie(payload);
    }
    setShowForm(false);
    setFormData({
      title: '', description: '', thumbnail: '', banner: '', videoUrl: '', trailerUrl: '',
      category: [], year: new Date().getFullYear(), rating: 8.0, duration: '2h 00m',
      ageRating: '13+', cast: '', director: '', isFeatured: false, isTrending: false,
    });
  };

  const handleEdit = (movie) => {
    setEditing(movie);
    setFormData({
      ...movie,
      cast: movie.cast.join(', '),
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Movies Management</h1>
          <p className="text-gray-400 text-sm">Add movies using direct video links and thumbnails</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#E50914] hover:bg-[#b81d24] text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2">
          <span className="text-xl">+</span> Add Movie
        </button>
      </div>

      <div className="bg-[#181818] border border-[#232323] rounded-xl p-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E50914]"
          />
          <span className="bg-[#232323] px-4 py-2.5 rounded-lg text-sm text-gray-400">{filtered.length} movies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-gray-400 border-b border-[#232323]">
              <tr>
                <th className="pb-3 font-medium">Movie</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Video Link</th>
                <th className="pb-3 font-medium">Stats</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map(movie => (
                <tr key={movie.id} className="border-b border-[#232323]/50 hover:bg-[#232323]/50">
                  <td className="py-3">
                    <div className="flex gap-3">
                      <img src={movie.thumbnail} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                      <div>
                        <p className="font-semibold line-clamp-1">{movie.title}</p>
                        <p className="text-xs text-gray-400">{movie.year} • {movie.duration} • {movie.ageRating}</p>
                        <div className="flex gap-1 mt-1">
                          {movie.isFeatured && <span className="text-[10px] bg-yellow-600 px-1.5 py-0.5 rounded">FEATURED</span>}
                          {movie.isTrending && <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded">TRENDING</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {movie.category.map(c => (
                        <span key={c} className="text-[11px] bg-[#232323] border border-[#333] px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="max-w-[200px]">
                      <p className="text-xs text-gray-300 truncate" title={movie.videoUrl}>{movie.videoUrl}</p>
                      <p className="text-[11px] text-gray-500 truncate" title={movie.thumbnail}>Thumb: {movie.thumbnail?.slice(0,30)}...</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <p className="text-xs">{movie.views?.toLocaleString()} views</p>
                    <p className="text-xs text-gray-400">{movie.rating} ⭐</p>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(movie)} className="px-3 py-1 bg-[#232323] hover:bg-[#333] rounded text-xs">Edit</button>
                      <button onClick={() => { if(confirm(`Delete ${movie.title}?`)) deleteMovie(movie.id); }} className="px-3 py-1 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-[#181818] border border-[#232323] rounded-xl w-full max-w-2xl my-8">
            <div className="p-6 border-b border-[#232323] flex justify-between items-center">
              <h2 className="text-xl font-bold">{editing ? 'Edit Movie' : 'Add New Movie'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="w-8 h-8 bg-[#232323] rounded-full flex items-center justify-center">✕</button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Movie Title *</label>
                  <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" placeholder="The Dark Horizon" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Description *</label>
                  <textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" placeholder="Movie description..." />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Thumbnail URL * (Poster 500x750)</label>
                  <input required value={formData.thumbnail} onChange={e=>setFormData({...formData, thumbnail: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="https://...jpg" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Banner URL * (1920x1080)</label>
                  <input required value={formData.banner} onChange={e=>setFormData({...formData, banner: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="https://...jpg" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Video Direct Link * (MP4, m3u8, etc)</label>
                  <input required value={formData.videoUrl} onChange={e=>setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="https://.../video.mp4" />
                  <p className="text-[11px] text-gray-500 mt-1">Use direct MP4 links. Sample: https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Trailer URL (optional)</label>
                  <input value={formData.trailerUrl} onChange={e=>setFormData({...formData, trailerUrl: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="https://.../trailer.mp4" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Categories (comma separated)</label>
                  <input value={Array.isArray(formData.category) ? formData.category.join(', ') : formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="Action, Sci-Fi, Trending Now" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {categories.map(c => (
                      <button type="button" key={c.id} onClick={() => {
                        const current = Array.isArray(formData.category) ? formData.category : formData.category.split(',').map(s=>s.trim()).filter(Boolean);
                        const updated = current.includes(c.name) ? current.filter(x=>x!==c.name) : [...current, c.name];
                        setFormData({...formData, category: updated});
                      }} className={`text-[11px] px-2 py-1 rounded-full border ${(Array.isArray(formData.category) ? formData.category : []).includes(c.name) ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-[#232323] border-[#333] text-gray-400'}`}>
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Cast (comma separated)</label>
                  <input value={formData.cast} onChange={e=>setFormData({...formData, cast: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#E50914] outline-none" placeholder="Chris Evans, Scarlett Johansson" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Director</label>
                  <input value={formData.director} onChange={e=>setFormData({...formData, director: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" placeholder="Christopher Nolan" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Year</label>
                  <input type="number" value={formData.year} onChange={e=>setFormData({...formData, year: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Rating (0-10)</label>
                  <input type="number" step="0.1" min="0" max="10" value={formData.rating} onChange={e=>setFormData({...formData, rating: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration</label>
                  <input value={formData.duration} onChange={e=>setFormData({...formData, duration: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none" placeholder="2h 18m" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Age Rating</label>
                  <select value={formData.ageRating} onChange={e=>setFormData({...formData, ageRating: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#E50914] outline-none">
                    <option>7+</option><option>13+</option><option>16+</option><option>18+</option>
                  </select>
                </div>

                <div className="flex gap-4 md:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFeatured} onChange={e=>setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 rounded" />
                    <span className="text-sm">Featured (show in hero?)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isTrending} onChange={e=>setFormData({...formData, isTrending: e.target.checked})} className="w-4 h-4 rounded" />
                    <span className="text-sm">Trending</span>
                  </label>
                </div>
              </div>

              {(formData.thumbnail || formData.banner) && (
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[#232323]">
                  {formData.thumbnail && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Thumbnail Preview</p>
                      <img src={formData.thumbnail} alt="thumb" className="w-full h-40 object-cover rounded" onError={(e)=>e.target.style.display='none'} />
                    </div>
                  )}
                  {formData.banner && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Banner Preview</p>
                      <img src={formData.banner} alt="banner" className="w-full h-40 object-cover rounded" onError={(e)=>e.target.style.display='none'} />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#232323] flex gap-3 justify-end">
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2.5 bg-[#232323] hover:bg-[#333] rounded-lg text-sm">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-[#E50914] hover:bg-[#b81d24] rounded-lg font-semibold text-sm">{editing ? 'Update Movie' : 'Add Movie'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MoviesManager;
