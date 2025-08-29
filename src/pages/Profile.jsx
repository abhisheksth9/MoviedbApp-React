import '../css/Profile.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

export function Favourites() {
    const {favourites} = useMovieContext();
    return (
        <div className='favourites-container'>
            <h2 className='list'>Five Favourites</h2>
            <div className='favourites-list'>
                {favourites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    )
}

export function Likes() {
    const {likes} = useMovieContext();

    if (likes) {
        return (
            <div className='list'>
                <h2 className='likes'>Likes</h2>
                <div className="likes-list">
                    {likes.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>  
            </div>
        )
    }
    return <div className="likes-empty">
        <h3>No favourite movies yet</h3>
        <p>Start adding movies to your likes</p>
    </div>
}

export function Watchlist() {
    const {watchlist} = useMovieContext();

    if (watchlist){
        return (
            <div className='list'>
                <h2 className='watchlists'>Watchlist</h2>
                <div className='watchlists-list'>
                        {watchlist.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                </div>
            </div>
        )
    }
    return <div className="watchlist-empty">
        <h3>No movies on watchlist yet</h3>
        <p>Start adding movies to your watchlist</p>
    </div>
}

export default function Profile(){
    return(
        <section>
            <Favourites />
            <Likes />
            <Watchlist />
        </section>
    )
}