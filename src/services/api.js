export const API_KEY = "043f1a12aeb55a449d2ca7095ea84adc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = "http://localhost:5000";


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

export const signup = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const signin = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};