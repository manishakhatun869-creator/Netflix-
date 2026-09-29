import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';

const HeroBanner = () => {
  const { featuredBanners, playMovie, setSelectedMovie, toggleMyList, myList } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredBanners]);

  if (featuredBanners.length === 0) {
    return (
      <div className="h-[70vh] bg-[#181818] flex items-center justify-center">
        <p className="text-gray-400">No featured banners. Add movies in Admin panel.</p>
      </div>
    );
  }

  const currentBanner = featuredBanners[currentIndex];
  const movie = currentBanner?.movie;
  if (!movie) return null;

  const isInMyList = myList.includes(movie.id);

  return (
    <div className="relative h-[75vh] md:h-[95vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end md:justify-center h-full px-4 md:px-12 lg:px-16 pb-20 md:pb-0 pt-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 leading-tight drop-shadow-2xl">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-3 text-sm md:text-base">
            <span className="text-green-400 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
            <span className="border border-gray-400 px-1 text-xs">{movie.ageRating}</span>
            <span>{movie.year}</span>
            <span className="border border-gray-400 px-1 text-xs">HD</span>
            <span>{movie.duration}</span>
          </div>

          <p className="text-sm md:text-lg text-white/90 line-clamp-3 mb-6 md:mb-8 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => playMovie(movie)}
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-2.5 rounded font-bold text-base md:text-lg hover:bg-white/80 transition"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Play
            </button>
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-2.5 rounded font-bold text-base md:text-lg hover:bg-gray-500/50 transition backdrop-blur"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              More Info
            </button>
            <button
              onClick={() => toggleMyList(movie.id)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition"
            >
              <span className="text-xl">{isInMyList ? '✓' : '+'}</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="text-gray-400">Starring:</span>
            <span className="text-gray-300">{movie.cast?.slice(0,3).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-20 md:bottom-28 right-4 md:right-16 flex gap-2 z-20">
        {featuredBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 md:w-3 md:h-1.5 transition-all ${idx === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-gray-500'}`}
          />
        ))}
      </div>

      {/* Age & Volume */}
      <div className="absolute bottom-20 md:bottom-28 right-0 flex items-center gap-3 z-20">
        <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 hover:border-white hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-1.414" /></svg>
        </button>
        <div className="bg-[#333]/60 border-l-4 border-white pl-2 pr-6 md:pr-12 py-1 text-sm">
          {movie.ageRating}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
