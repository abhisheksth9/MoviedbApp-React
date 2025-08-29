import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}) {
    const {isLikes, addToLikes, removeFromLikes} = useMovieContext()
    const {isWatchlist, addToWatchlist, removeFromWatchlist} = useMovieContext()
    const {isFavourites, addToFavourites, removeFromFavourites} = useMovieContext()

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

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className = {`likes-btn ${likes ? "active": ""}`} onClick={onLikesClick}>❤️</button>
                <button className={`watchlist-btn ? ${watchlist ? "active": ""}`} onClick={onWatchlistClick} >➕</button>
                <button className={`favourites-btn ? ${favourites ? "active": ""}`} onClick={onFavouritesClick} >⭐</button>
            </div>
        </div>
        <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard