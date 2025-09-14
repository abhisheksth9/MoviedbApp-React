import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList";

function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">"{query}"</span>
      </h1>

      {loading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && movies.length === 0 && (
        <div className="text-gray-500">No results found.</div>
      )}

      <MovieList movies={movies} />
    </div>
  );
}

export default SearchResults;
