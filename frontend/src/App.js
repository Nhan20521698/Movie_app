import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Me from "./pages/me/me";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetail from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;