import '../css/Profile.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favourite() {
    const {favourites} = useMovieContext();

    if (favourites) {
        return (
            <div className='favourites'>
                <h2>Your Favourites</h2>
                <div className="movie-grid">
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

export default Favourite