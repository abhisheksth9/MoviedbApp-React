import { useState, useEffect } from "react"
import { getPopularMovies, searchMovies } from "../services/api";
import MovieList from "../components/MovieList";

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPopularMovies(page);
    // eslint-disable-next-line
  }, [page]);

  const loadPopularMovies = async (pageNum) => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies(pageNum);

      if (popularMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...popularMovies]);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load data...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
      setError(null)
      setHasMore(false);
    } catch (err) {
      console.log(err)
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
    setSearchQuery("");
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 font-semibold mb-4">
          {error}
        </div>
      )}

      {/* Movie List */}
      <MovieList movies={movies}/>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
                Load More
            </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <div className="text-center text-gray-600">Loading...</div>}
    </div>
  )
}

export default Home;

