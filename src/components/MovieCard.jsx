import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}) {
    const {isFavourites, addToFavourites, removeFromFavourites} = useMovieContext()
    const {isWatchlist, addToWatchlist, removeFromWatchlist} = useMovieContext()
    const favourite = isFavourites(movie.id)
    const watchlist = isWatchlist(movie.id)

    function onFavouriteClick(e) {
        e.preventDefault()
        if (favourite) removeFromFavourites(movie.id)
        else addToFavourites(movie)
    }

    function onWatchlistClick(e) {
        e.preventDefault()
        if (watchlist) removeFromwa(movie.id)
        else addToWatchlist(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className = {`favourite-btn ${favourite ? "active": ""}`} onClick={onFavouriteClick}>❤️</button>
                <button className={`watchlist ? "active" : `} onClick={onWatchlistClick} >➕</button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard