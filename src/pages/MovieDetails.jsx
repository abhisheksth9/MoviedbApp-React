import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cast");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsRes.json();
        setCredits(creditsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!movie) return <div className="text-center">Movie not found</div>;

  const { cast = [], crew = [] } = credits || {};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* --- Movie Main Info --- */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg max-w-sm"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres?.map((g, idx) => (
              <span key={g.id}>
                <Link 
                  to={`/genre/${g.id}`} 
                  className="text-blue-600 hover:underline">
                  {g.name}
                </Link>
                {idx < movie.genres.length - 1 && ", "}
              </span>
            )) || "N/A"}
          </p>
        </div>
      </div>

      {/* --- Tabs --- */}
      <div className="mt-10">
        {/* Tab Navigation */}
        <div className="flex space-x-6 border-b">
          {["cast", "crew"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Cast */}
          {activeTab === "cast" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cast.map((actor) => (
                <Link to={`/person/${actor.id}`} key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded shadow"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                      No Image
                    </div>
                  )}
                  <p className="mt-2 font-semibold text-sm">{actor.name}</p>
                  <p className="text-gray-500 text-xs">{actor.character}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Crew */}
          {activeTab === "crew" && (
            <div className="space-y-6">
              {["Director", "Writer", "Cinematography", "Music"].map((role) => {
                const people = crew.filter((c) =>
                  role === "Writer"
                    ? c.job === "Writer" || c.department === "Writing"
                    : c.job === role
                );
                if (!people.length) return null;

                return (
                  <div key={role}>
                    <h3 className="text-lg font-bold mb-2">{role}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {people.map((person) => (
                        <Link
                          to={`/person/${person.id}`}
                          key={person.credit_id}
                          className="w-36 flex-shrink-0 text-center"
                        >
                          {person.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                              alt={person.name}
                              className="w-36 h-40 object-cover rounded shadow"
                            />
                          ) : (
                            <div className="w-36 h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                              No Image
                            </div>
                          )}
                          <p className="mt-2 text-sm font-semibold truncate">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.job}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
