import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import BottomNavigation from '../components/BottomNavigation';
import { useMovies } from '../context/MovieContext';

const Home = () => {
  const { movies, categories, getMoviesByCategory } = useMovies();

  const trending = movies.filter(m => m.isTrending);
  const top10 = movies.filter(m => m.category.includes('Top 10')).slice(0,10);
  const featured = movies.filter(m => m.isFeatured);

  return (
    <div className="min-h-screen bg-[#141414] pb-20 lg:pb-0">
      <Header />
      <HeroBanner />

      <div className="relative z-20 -mt-16 md:-mt-32 space-y-2">
        {top10.length > 0 && (
          <CategoryRow title="Top 10 in Your Country Today" movies={top10} isTop10 />
        )}
        
        {trending.length > 0 && (
          <CategoryRow title="Trending Now" movies={trending} />
        )}

        {categories.map(cat => {
          const catMovies = getMoviesByCategory(cat.name);
          if (catMovies.length === 0) return null;
          // Skip if already shown as trending/top10 to avoid duplicate title? but allow
          if (cat.name === 'Top 10' || cat.name === 'Trending Now') return null;
          return <CategoryRow key={cat.id} title={cat.name} movies={catMovies} />;
        })}

        <CategoryRow title="Continue Watching for You" movies={movies.slice(0,5)} />
        <CategoryRow title="Because You Watched Dark Horizon" movies={[...movies].reverse().slice(0,6)} />
        <CategoryRow title="New Releases" movies={[...movies].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,8)} />
      </div>

      <footer className="px-4 md:px-12 lg:px-16 py-12 text-gray-500 text-xs">
        <div className="flex gap-4 mb-4">
          <span className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center">f</span>
          <span className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center">t</span>
          <span className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center">y</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
          <span>Audio Description</span><span>Help Center</span><span>Gift Cards</span><span>Terms of Use</span>
          <span>Privacy</span><span>Legal Notices</span><span>Cookie Preferences</span><span>Corporate Information</span>
          <span>Contact Us</span><span>Speed Test</span><span>Legal Guarantee</span><span>Netflix Originals</span>
        </div>
        <button className="mt-6 border border-gray-600 px-2 py-1 hover:text-white hover:border-white">Service Code</button>
        <p className="mt-4">© 1997-{new Date().getFullYear()} Netflix, Inc.</p>
      </footer>

      <BottomNavigation />
    </div>
  );
};

export default Home;
