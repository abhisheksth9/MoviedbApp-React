export const API_KEY = "YOUR_API_KEYS_HERE";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();
  return data.results || [];
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
  const data = await res.json();
  return data.results || [];
};
