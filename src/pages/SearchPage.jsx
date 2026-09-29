import React from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import BottomNavigation from '../components/BottomNavigation';
import { useMovies } from '../context/MovieContext';

const SearchPage = () => {
  const { filteredMovies, searchQuery, setSearchQuery, categories } = useMovies();

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      <Header />
      <div className="pt-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Search</h1>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, genres, actors..."
              className="w-full bg-[#232323] border border-gray-700 text-white px-12 py-4 rounded text-base focus:outline-none focus:border-white"
              autoFocus
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchQuery(cat.name)}
                className="px-3 py-1 bg-[#232323] hover:bg-[#333] text-white text-sm rounded-full border border-gray-700"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {searchQuery ? (
          <>
            <p className="text-gray-400 mb-4">{filteredMovies.length} results for "{searchQuery}"</p>
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {filteredMovies.map(movie => (
                  <div key={movie.id} className="aspect-[2/3] relative rounded overflow-hidden group cursor-pointer bg-[#232323]">
                    <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                      <p className="text-white font-bold text-sm">{movie.title}</p>
                      <p className="text-gray-300 text-xs">{movie.year} • {movie.rating}⭐</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No results found</p>
                <p className="text-gray-600 text-sm mt-2">Try different keywords or check spelling</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSearchQuery(cat.name)}
                  className="h-24 rounded flex items-center justify-center text-white font-bold text-lg hover:scale-[1.02] transition"
                  style={{ backgroundColor: cat.color || '#E50914' }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
