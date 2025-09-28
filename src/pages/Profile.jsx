import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

export function Favourites() {
  const { favourites } = useMovieContext();

  const fiveFavourites = favourites.slice(0,5)

  if (favourites && favourites.length > 0){
    return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Five Favourite</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {fiveFavourites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  )
  }
  return (
    <div className="p-6 text-center text-gray-600">
      <h3 className="text-lg font-semibold">No favourite movies yet</h3>
      <p className="mt-2">Start adding movies to your favourites</p>
    </div>
  )
  
}

export function Likes() {
  const { likes } = useMovieContext();

  if (likes && likes.length > 0) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {likes.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 text-center text-gray-600">
      <h3 className="text-lg font-semibold">No movies on likes yet</h3>
      <p className="mt-2">Start adding movies to your likes</p>
    </div>
  )
}

export function Watchlist() {
  const { watchlist } = useMovieContext();

  if (watchlist && watchlist.length > 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Watchlist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 text-center text-gray-600">
      <h3 className="text-lg font-semibold">No movies on watchlist yet</h3>
      <p className="mt-2">Start adding movies to your watchlist</p>
    </div>
  )
}

export default function Profile() {
  return (
    <section className="max-w-7xl mx-auto">
      <Favourites />
      <Likes />
      <Watchlist />
    </section>
  )
}
