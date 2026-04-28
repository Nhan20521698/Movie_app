import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔥 QUAN TRỌNG NHẤT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMovies = () => api.get("/movies");

export const getMoviesByGenre = (genre) => {
  return api.get("/movies/genre", {
    params: { genre }
  });
};

export const searchMovies = (keyword) => {
  return api.get("/movies/search", {
    params: { keyword }
  });
};

export const getMovieById = (id) => api.get(`/movies/${id}`);

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const getFavorites = () => {
  return api.get("/favorites");
};

export const toggleFavorite = (movie_id) => {
  return api.post("/favorites", { movie_id }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const checkFavorite = (movie_id) => {
  return api.get("/favorites/check", {
    params: { movie_id }
  });
};

export default api;