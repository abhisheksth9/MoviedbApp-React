import { Link } from 'react-router-dom'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({ movie }) {
  const { isLikes, addToLikes, removeFromLikes } = useMovieContext()
  const { isWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext()
  const { isFavourites, addToFavourites, removeFromFavourites } = useMovieContext()

  const likes = isLikes(movie.id)
  const watchlist = isWatchlist(movie.id)
  const favourites = isFavourites(movie.id)

  function onLikesClick(e) {
    e.preventDefault()
    if (likes) removeFromLikes(movie.id)
    else addToLikes(movie)
  }

  function onWatchlistClick(e) {
    e.preventDefault()
    if (watchlist) removeFromWatchlist(movie.id)
    else addToWatchlist(movie)
  }

  function onFavouritesClick(e) {
    e.preventDefault()
    if (favourites) removeFromFavourites(movie.id)
    else addToFavourites(movie)
  }

  return (
    <Link to={`/movie/${movie.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative">
        {/* Poster */}
        <div className="relative">
           {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<div class='text-center px-2 text-sm text-gray-700'>No poster available</div>`;
              }}
            />
            ) : (
              <div className="text-center px-2 text-sm text-gray-700">
                No poster available
              </div>
            )}
            {/* Score Badge */}
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-bold shadow">
                {movie.vote_average.toFixed(1)}
            </div>

            {/* Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 bg-none bg-opacity-0 hover: transition">
            <button
                onClick={onLikesClick}
                className={`p-2 text-xl rounded-full ${
                likes ? "bg-red-600 text-white" : "bg-white text-red-600"
                }`}
            >
                ❤️
            </button>
            <button
                onClick={onWatchlistClick}
                className={`p-2 text-xl rounded-full ${
                watchlist ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
            >
                ➕
            </button>
            <button
                onClick={onFavouritesClick}
                className={`p-2 text-xl rounded-full ${
                favourites ? "bg-yellow-500 text-white" : "bg-white text-yellow-500"
                }`}
            >
                ⭐
            </button>
            </div>
        </div>

        {/* Info */}
        <div className="p-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.release_date?.split("-")[0]}</p>
        </div>
        </div>
    </Link>
  )
}

export default MovieCard
