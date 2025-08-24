import MovieCard from "./MovieCard";
import '../css/MovieList.css'

function MovieList({movies}) {
    return (
        <div className="movie-list">
            {movies.map((movie) => 
                <MovieCard movie={movie} key={movie.id}/>
            )}
        </div>
    )
}

export default MovieList