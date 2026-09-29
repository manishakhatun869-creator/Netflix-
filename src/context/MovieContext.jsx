import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMovies, initialCategories, initialBanners, initialSettings } from '../data/seedData';

const MovieContext = createContext();

export const useMovies = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovies must be used within MovieProvider');
  return ctx;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('netflix_movies');
    return saved ? JSON.parse(saved) : initialMovies;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('netflix_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('netflix_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('netflix_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('netflix_mylist');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    localStorage.setItem('netflix_movies', JSON.stringify(movies));
  }, [movies]);
  useEffect(() => {
    localStorage.setItem('netflix_categories', JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem('netflix_banners', JSON.stringify(banners));
  }, [banners]);
  useEffect(() => {
    localStorage.setItem('netflix_settings', JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem('netflix_mylist', JSON.stringify(myList));
  }, [myList]);

  // Movies CRUD
  const addMovie = (movie) => {
    const newMovie = { ...movie, id: `m${Date.now()}`, views: 0, createdAt: new Date().toISOString().split('T')[0] };
    setMovies(prev => [newMovie, ...prev]);
    return newMovie;
  };
  const updateMovie = (id, updates) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };
  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    setBanners(prev => prev.filter(b => b.movieId !== id));
    setMyList(prev => prev.filter(mid => mid !== id));
  };

  // Categories CRUD
  const addCategory = (cat) => {
    const newCat = { ...cat, id: `c${Date.now()}`, slug: cat.name.toLowerCase().replace(/\s+/g, '-') };
    setCategories(prev => [...prev, newCat]);
  };
  const updateCategory = (id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Banners CRUD
  const addBanner = (banner) => {
    const newBanner = { ...banner, id: `b${Date.now()}` };
    setBanners(prev => [...prev, newBanner]);
  };
  const updateBanner = (id, updates) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };
  const deleteBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const toggleMyList = (movieId) => {
    setMyList(prev => prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]);
  };

  const playMovie = (movie) => {
    setCurrentVideo(movie);
    setIsPlayerOpen(true);
    // increment views
    updateMovie(movie.id, { views: (movie.views || 0) + 1 });
  };

  const getMoviesByCategory = (catName) => {
    return movies.filter(m => m.category.includes(catName));
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredBanners = banners.filter(b => b.active).sort((a,b) => a.order - b.order).map(b => {
    const movie = movies.find(m => m.id === b.movieId);
    return movie ? { ...b, movie } : null;
  }).filter(Boolean);

  const value = {
    movies,
    categories,
    banners,
    settings,
    myList,
    searchQuery,
    setSearchQuery,
    selectedMovie,
    setSelectedMovie,
    isPlayerOpen,
    setIsPlayerOpen,
    currentVideo,
    setCurrentVideo,
    addMovie,
    updateMovie,
    deleteMovie,
    addCategory,
    updateCategory,
    deleteCategory,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleMyList,
    playMovie,
    getMoviesByCategory,
    filteredMovies,
    featuredBanners,
    setSettings,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
