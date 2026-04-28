import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, toggleFavorite } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MyListPage.css";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FIX: toast có type
  const [toast, setToast] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getFavorites()
      .then(res => {
        const data = (res.data || []).map(f => f.Movie);
        setMovies(data);
      })
      .catch(err => {
        console.error(err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // 🔥 FIX: show toast có màu
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  return (
    <div className="mylist-page">
      <Navbar />

      <h1 className="title">❤️ My List</h1>

      {loading ? (
        <div className="grid">
          {Array(8).fill().map((_, i) => (
            <div key={i} className="skeleton"></div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid">
          {movies.map(movie => (
            <div key={movie.id} className="card">

              {/* ❌ REMOVE */}
              <button
                className="remove-btn"
                onClick={async (e) => {
                  e.stopPropagation();

                  try {
                    await toggleFavorite(movie.id);

                    setMovies(prev =>
                      prev.filter(m => m.id !== movie.id)
                    );

                    // ✅ SUCCESS (màu xanh)
                    showToast("Removed from My List ✔", "success");
                  } catch (err) {
                    console.error(err);

                    // ❌ ERROR (màu đỏ)
                    showToast("Error removing movie ❌", "error");
                  }
                }}
              >
                ✖
              </button>

              <div onClick={() => navigate(`/movies/${movie.id}`)}>
                <img src={movie.image} alt={movie.title} loading="lazy" />

                <div className="overlay">
                  <h3>{movie.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No favorites yet 😢</h2>
          <p>Start liking movies to see them here!</p>
        </div>
      )}

      {/* 🔔 TOAST */}
      {toast.message && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyList;