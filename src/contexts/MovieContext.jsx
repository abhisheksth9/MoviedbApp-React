import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")
        
        if (storedFavs) setFavourites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    useEffect(() => {
        const storedWatchlist = localStorage.getItem("watchlist")

        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
    }, [])

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }, [watchlist])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourites = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const addToWatchlist = (movie) => {
        setWatchlist(prev => [...prev, movie])
    }

    const removeFromWatchlist = (movieId) => {
        setWatchlist(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isWatchlist = (movieId) => {
        return watchlist.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourites,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isWatchlist
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}