import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const SettingsManager = () => {
  const { settings, setSettings, movies, categories, banners } = useMovies();
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    setSettings(form);
    alert('Settings saved!');
  };

  const handleExport = () => {
    const data = {
      movies,
      categories,
      banners,
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netflix-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.movies) localStorage.setItem('netflix_movies', JSON.stringify(data.movies));
        if (data.categories) localStorage.setItem('netflix_categories', JSON.stringify(data.categories));
        if (data.banners) localStorage.setItem('netflix_banners', JSON.stringify(data.banners));
        if (data.settings) localStorage.setItem('netflix_settings', JSON.stringify(data.settings));
        alert('Import successful! Reloading...');
        window.location.reload();
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset all data to defaults? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">App Settings</h1>
        <p className="text-gray-400 text-sm">Configure your Netflix clone</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#181818] border border-[#232323] rounded-xl p-6 space-y-4">
          <h3 className="font-bold">General Settings</h3>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">App Name</label>
            <input value={form.appName} onChange={e=>setForm({...form, appName: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#E50914]" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Logo Letter</label>
            <input value={form.logo} onChange={e=>setForm({...form, logo: e.target.value})} maxLength={2} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#E50914]" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Primary Color</label>
            <div className="flex gap-3">
              <input type="color" value={form.primaryColor} onChange={e=>setForm({...form, primaryColor: e.target.value})} className="w-12 h-10 rounded" />
              <input value={form.primaryColor} onChange={e=>setForm({...form, primaryColor: e.target.value})} className="flex-1 bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between cursor-pointer bg-[#232323] p-3 rounded-lg">
              <span className="text-sm">Enable My List</span>
              <input type="checkbox" checked={form.enableMyList} onChange={e=>setForm({...form, enableMyList: e.target.checked})} className="w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer bg-[#232323] p-3 rounded-lg">
              <span className="text-sm">Enable Downloads UI</span>
              <input type="checkbox" checked={form.enableDownloads} onChange={e=>setForm({...form, enableDownloads: e.target.checked})} className="w-4 h-4" />
            </label>
          </div>

          <button onClick={handleSave} className="w-full bg-[#E50914] hover:bg-[#b81d24] text-white py-2.5 rounded-lg font-semibold">Save Settings</button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-4">Data Management</h3>
            <div className="space-y-3">
              <button onClick={handleExport} className="w-full bg-[#232323] hover:bg-[#333] text-white py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                <span>💾</span> Export Backup (JSON)
              </button>
              
              <label className="w-full bg-[#232323] hover:bg-[#333] text-white py-3 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer">
                <span>📤</span> Import Backup
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              <button onClick={handleReset} className="w-full bg-red-900/20 hover:bg-red-900/30 text-red-300 py-3 rounded-lg text-sm">
                ⚠️ Reset All Data
              </button>
            </div>

            <div className="mt-6 p-3 bg-[#0f0f0f] rounded-lg text-xs font-mono text-gray-400">
              <p>Storage: localStorage</p>
              <p className="mt-1">Movies: {movies.length}</p>
              <p>Categories: {categories.length}</p>
              <p>Banners: {banners.length}</p>
            </div>
          </div>

          <div className="bg-[#181818] border border-[#232323] rounded-xl p-6">
            <h3 className="font-bold mb-3">How Video Direct Links Work</h3>
            <div className="text-xs text-gray-400 space-y-3">
              <p>1. <strong className="text-white">Add Movie:</strong> In Movies tab, click Add Movie and paste direct MP4 URL.</p>
              <p>2. <strong className="text-white">Thumbnail:</strong> Paste image URL (500x750). Use Unsplash or any public image.</p>
              <p>3. <strong className="text-white">Banner:</strong> Wide image (1920x1080) for hero section.</p>
              <p>4. <strong className="text-white">Video:</strong> Any direct video link. Supports MP4, WebM. For HLS (.m3u8) you'd need hls.js.</p>
              <div className="bg-[#232323] p-3 rounded mt-3">
                <p className="text-white font-semibold mb-1">Sample Links (free):</p>
                <p className="break-all">https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4</p>
                <p className="break-all mt-1">https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#E50914] to-[#b81d24] rounded-xl p-6 text-white">
            <h3 className="font-bold">App Features Built</h3>
            <ul className="text-sm mt-3 space-y-1.5 opacity-90 list-disc list-inside">
              <li>Bottom Navigation (mobile) + Top Nav (desktop)</li>
              <li>Hero Banner Carousel with auto-rotate</li>
              <li>Search Bar with live filtering</li>
              <li>Category Rows (horizontal scroll)</li>
              <li>Movie Cards with hover preview</li>
              <li>Video Player (direct link)</li>
              <li>My List (favorites)</li>
              <li>Admin Panel with full CRUD</li>
              <li>Thumbnail & Banner management</li>
              <li>Direct video URL support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
