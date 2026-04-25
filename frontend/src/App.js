import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Me from "./pages/me/me";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetail from "./pages/MovieDetails/MovieDetails";
import LoginPage from "./pages/loginpage/LoginPage";
import SignupPage from "./pages/signuppage/SignupPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import PrivacyPolicy from "./pages/privacypolicypage/PrivacyPolicyPage";
import HelpCenter from "./pages/helpcenterpage/HeplCenterPage";
import Contact from "./pages/contactpage/ContactPage";
import MyList from "./pages/mylistpage/MyListPage";


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
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;