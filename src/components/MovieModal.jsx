import React from 'react';
import { useMovies } from '../context/MovieContext';

const MovieModal = () => {
  const { selectedMovie, setSelectedMovie, playMovie, toggleMyList, myList } = useMovies();

  if (!selectedMovie) return null;

  const isInMyList = myList.includes(selectedMovie.id);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-2 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-[#181818] rounded-md w-full max-w-3xl mt-4 md:mt-8 mb-20 animate-scale-in overflow-hidden">
        {/* Close */}
        <button
          onClick={() => setSelectedMovie(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-[60vw] max-h-[400px] md:h-[400px]">
          <img src={selectedMovie.banner} alt={selectedMovie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-black mb-2 drop-shadow-lg">{selectedMovie.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => { playMovie(selectedMovie); setSelectedMovie(null); }}
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/80"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play
              </button>
              <button
                onClick={() => toggleMyList(selectedMovie.id)}
                className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white"
              >
                <span className="text-white">{isInMyList ? '✓' : '+'}</span>
              </button>
              <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-sm mb-3">
              <span className="text-green-400 font-bold">{Math.round(selectedMovie.rating*10)}% Match</span>
              <span className="border border-gray-500 px-1 text-xs">{selectedMovie.ageRating}</span>
              <span>{selectedMovie.year}</span>
              <span className="border border-gray-500 px-1 text-xs">HD</span>
              <span>{selectedMovie.duration}</span>
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">{selectedMovie.description}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-400">Cast: </span>
              <span className="text-gray-200">{selectedMovie.cast?.join(', ')}</span>
            </div>
            <div>
              <span className="text-gray-400">Genres: </span>
              <span className="text-gray-200">{selectedMovie.category.join(', ')}</span>
            </div>
            <div>
              <span className="text-gray-400">Director: </span>
              <span className="text-gray-200">{selectedMovie.director}</span>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>👁️ {selectedMovie.views?.toLocaleString()} views</span>
                <span>•</span>
                <span>⭐ {selectedMovie.rating}/10</span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-1">Video Direct Link:</p>
                <p className="text-[11px] bg-black p-2 rounded break-all text-gray-300">{selectedMovie.videoUrl}</p>
              </div>
            </div>
          </div>
        </div>

        {/* More Like This */}
        <div className="px-6 md:px-10 pb-8">
          <h3 className="font-semibold mb-4">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Could show related */}
            <div className="bg-[#232323] rounded p-3 text-xs text-gray-400">
              Thumbnail: <span className="text-gray-200 break-all">{selectedMovie.thumbnail}</span>
            </div>
            <div className="bg-[#232323] rounded p-3 text-xs text-gray-400">
              Banner: <span className="text-gray-200 break-all">{selectedMovie.banner}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
