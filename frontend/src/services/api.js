import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api"
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
}

export const getMovieById = (id) => api.get(`/movies/${id}`);

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export default api;