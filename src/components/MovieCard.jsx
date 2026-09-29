import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const MovieCard = ({ movie, rank }) => {
  const { playMovie, setSelectedMovie, toggleMyList, myList } = useMovies();
  const [isHovered, setIsHovered] = useState(false);
  const isInMyList = myList.includes(movie.id);

  return (
    <div
      className="relative min-w-[160px] md:min-w-[220px] lg:min-w-[260px] h-[90px] md:h-[125px] lg:h-[145px] rounded-md overflow-hidden cursor-pointer movie-card bg-[#232323] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedMovie(movie)}
    >
      {/* Rank for Top 10 */}
      {rank !== undefined && (
        <div className="absolute -left-2 bottom-0 z-20 text-[70px] md:text-[100px] font-black leading-none text-black" style={{WebkitTextStroke: '2px #595959', textShadow: '0 0 10px rgba(0,0,0,0.8)'}}>
          {rank + 1}
        </div>
      )}

      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-2 md:p-3 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'} opacity-100`}>
        <h3 className="text-xs md:text-sm font-bold line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] text-green-400 font-bold">{Math.round(movie.rating * 10)}% Match</span>
          <span className="text-[9px] border border-gray-400 px-0.5">{movie.ageRating}</span>
          <span className="text-[10px] text-gray-300">{movie.duration}</span>
        </div>
        <div className="flex gap-1 mt-1.5">
          <span className="text-[9px] text-gray-300">{movie.category.slice(0,2).join(' • ')}</span>
        </div>
      </div>

      {/* Hover Expanded Card (Desktop) */}
      <div className={`hidden lg:flex absolute -inset-2 bg-[#181818] rounded-md shadow-2xl z-30 flex-col overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="relative h-[140px]">
          <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); playMovie(movie); }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMyList(movie.id); }}
                className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white"
              >
                <span className="text-white text-sm">{isInMyList ? '✓' : '+'}</span>
              </button>
              <button className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              </button>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedMovie(movie); }}
              className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-green-400 font-bold">{Math.round(movie.rating*10)}% Match</span>
            <span className="border border-gray-500 px-1">{movie.ageRating}</span>
            <span>{movie.duration}</span>
            <span className="border border-gray-500 px-1 text-[10px]">HD</span>
          </div>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {movie.category.map(c => (
              <span key={c} className="text-[11px] text-gray-300 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>{c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
