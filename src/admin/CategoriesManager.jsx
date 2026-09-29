import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const CategoriesManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory, movies } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', color: '#E50914' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateCategory(editing.id, formData);
      setEditing(null);
    } else {
      addCategory(formData);
    }
    setShowForm(false);
    setFormData({ name: '', color: '#E50914' });
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, color: cat.color });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-400 text-sm">Manage movie categories / genres</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#E50914] hover:bg-[#b81d24] text-white px-6 py-2.5 rounded-lg font-semibold">+ Add Category</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const count = movies.filter(m => m.category.includes(cat.name)).length;
          return (
            <div key={cat.id} className="bg-[#181818] border border-[#232323] rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: cat.color }}>
                    {cat.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold">{cat.name}</h3>
                    <p className="text-xs text-gray-400">Slug: {cat.slug}</p>
                    <p className="text-xs text-gray-500 mt-1">{count} movies</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(cat)} className="w-8 h-8 bg-[#232323] hover:bg-[#333] rounded flex items-center justify-center">✏️</button>
                  <button onClick={() => { if(confirm(`Delete ${cat.name}?`)) deleteCategory(cat.id); }} className="w-8 h-8 bg-red-900/20 hover:bg-red-900/40 rounded flex items-center justify-center">🗑️</button>
                </div>
              </div>
              <div className="mt-4 h-2 bg-[#232323] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, count*10)}%`, backgroundColor: cat.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-[#181818] border border-[#232323] rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Category' : 'Add Category'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category Name</label>
                <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#E50914]" placeholder="Action, Comedy..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Color</label>
                <div className="flex gap-3">
                  <input type="color" value={formData.color} onChange={e=>setFormData({...formData, color: e.target.value})} className="w-12 h-10 rounded bg-transparent" />
                  <input value={formData.color} onChange={e=>setFormData({...formData, color: e.target.value})} className="flex-1 bg-[#232323] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#E50914]" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2.5 bg-[#232323] rounded-lg">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-[#E50914] rounded-lg font-semibold">{editing ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoriesManager;
