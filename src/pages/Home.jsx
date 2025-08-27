import { useState, useEffect } from "react"
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";
import  MovieList from "../components/MovieList";

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }
            catch(err) {
                console.log(err)
                setError("Failed to load data...")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])
    

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err){
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

        setSearchQuery("");
    }

    return <div className="movie">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? 
        (<div className="loading">Loading...</div>) :
        (<div className="movie-list">
            <MovieList movies={movies}/>
        </div> 
        )}
    </div>
}

export default Home