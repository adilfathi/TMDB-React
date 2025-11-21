import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Star, Calendar, TrendingUp } from 'lucide-react';

export default function TMDBMovieApp() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('popular');

  // Prefer using a Vite env variable for the API key.
  // Create a `.env` file with `VITE_TMDB_API_KEY=your_key` or set the variable in your environment.
  // Fallback to the demo key if the env variable is not provided.
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Demo API key
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${BASE_URL}/movie/${category}`, {
        params: {
          api_key: API_KEY,
          language: 'id-ID',
          page: 1,
        },
      });

      if (!response || !response.data) {
        throw new Error('Gagal mengambil data film');
      }

      setMovies(response.data.results || []);
    } catch (err) {
      setError(err?.message || 'Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'popular', label: 'Populer', icon: TrendingUp },
    { value: 'now_playing', label: 'Sedang Tayang', icon: Film },
    { value: 'top_rated', label: 'Rating Tertinggi', icon: Star },
    { value: 'upcoming', label: 'Akan Datang', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">TMDB Movie App</h1>
          </div>
          <p className="text-gray-300">Jelajahi koleksi film dari The Movie Database</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                category === value
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Movies Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:scale-105 cursor-pointer"
              >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-700">
                  {movie.poster_path ? (
                    <img
                      src={`${IMG_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
