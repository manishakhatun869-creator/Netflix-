import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useMovies } from '../context/MovieContext';

const MyListPage = () => {
  const { movies, myList, setSelectedMovie, playMovie, toggleMyList } = useMovies();
  const myMovies = movies.filter(m => myList.includes(m.id));

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      <Header />
      <div className="pt-20 px-4 md:px-12 lg:px-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-8">{myMovies.length} titles</p>

        {myMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {myMovies.map(movie => (
              <div key={movie.id} className="group relative bg-[#232323] rounded overflow-hidden">
                <div className="aspect-[2/3] relative cursor-pointer" onClick={() => setSelectedMovie(movie)}>
                  <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => { e.stopPropagation(); playMovie(movie); }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm line-clamp-1">{movie.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{movie.year} • {movie.duration}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => playMovie(movie)} className="flex-1 bg-white text-black text-xs py-1.5 rounded font-bold hover:bg-gray-200">Play</button>
                    <button onClick={() => toggleMyList(movie.id)} className="px-3 py-1.5 border border-gray-600 rounded text-xs hover:border-white">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#232323] flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your list is empty</h3>
            <p className="text-gray-400 text-sm mb-6">Add movies and TV shows to your list to watch them later. Click the + icon on any title to add it.</p>
            <a href="/" className="inline-block bg-[#E50914] text-white px-6 py-2 rounded font-semibold hover:bg-[#b81d24]">Browse Movies</a>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MyListPage;
