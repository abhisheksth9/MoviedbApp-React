import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])
    const [likes, setLikes] = useState([])
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const storedLikes = localStorage.getItem("likes")
        const storedWatchlist = localStorage.getItem("watchlist")
        const storedFavourites = localStorage.getItem("favourites")
        
        if (storedLikes) setLikes(JSON.parse(storedLikes))
        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
        if (storedFavourites) setFavourites(JSON.parse(storedFavourites))
    }, [])

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes))
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [likes, watchlist, favourites])

    const addToLikes = (movie) => {
        setLikes(prev => [...prev, movie])
    }

    const removeFromLikes = (movieId) => {
        setLikes(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isLikes = (movieId) => {
        return likes.some(movie => movie.id === movieId)
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

     const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourites = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        likes,
        addToLikes,
        removeFromLikes,
        isLikes,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isWatchlist,
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourites
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}