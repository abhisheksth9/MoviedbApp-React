import '../css/Profile.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

export function Favourite() {
    const {favourites} = useMovieContext();

    if (favourites) {
        return (
            <div className='list'>
                <h2 className='favourites'>Your Favourites</h2>
                <div className="favourites-list">
                    {favourites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>  
            </div>
        )
    }
    return <div className="favourite-empty">
        <h3>No favourite movies yet</h3>
        <p>Start adding movies to your favourites</p>
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
            <Favourite />
            <Watchlist />
        </section>
    )
}