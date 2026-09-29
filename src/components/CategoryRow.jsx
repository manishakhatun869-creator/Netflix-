import React, { useRef } from 'react';
import MovieCard from './MovieCard';

const CategoryRow = ({ title, movies, isTop10 }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative group/row mb-6 md:mb-8">
      <h2 className="text-white text-base md:text-xl font-semibold mb-3 px-4 md:px-12 lg:px-16 hover:text-white cursor-pointer">
        {title} <span className="text-xs text-[#54b9c5] opacity-0 group-hover/row:opacity-100 ml-2 transition">Explore All ›</span>
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 md:gap-2.5 overflow-x-scroll scrollbar-hide px-4 md:px-12 lg:px-16 scroll-smooth"
        >
          {movies.map((movie, idx) => (
            <div key={movie.id} className={`${isTop10 ? 'pl-6 md:pl-10' : ''} flex-shrink-0`}>
              <MovieCard movie={movie} rank={isTop10 ? idx : undefined} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;
