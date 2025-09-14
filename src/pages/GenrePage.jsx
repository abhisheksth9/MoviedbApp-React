import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY } from "../services/api";

function GenrePage() {
  const { id } = useParams(); // genre id
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        const genre = data.genres.find((g) => g.id.toString() === id);
        setGenreName(genre?.name || "Unknown Genre");
      } catch (error) {
        console.error("Error fetching genre name:", error);
      }
    };

    fetchMoviesByGenre();
    fetchGenreName();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{genreName} Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-3">
              <h2 className="text-md font-semibold truncate">{movie.title}</h2>
              <p className="text-sm text-gray-500">
                {(movie.release_date || "").split("-")[0] || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenrePage;
