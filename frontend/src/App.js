import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Me from "./pages/me/me";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetail from "./pages/MovieDetails/MovieDetails";
import LoginPage from "./pages/loginpage/LoginPage";
import SignupPage from "./pages/signuppage/SignupPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;