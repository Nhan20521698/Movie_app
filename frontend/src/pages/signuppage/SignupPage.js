import './SignupPage.css';
import { useState } from 'react';
import { register } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 validate password length
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    // 🔥 validate confirm password
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");

    register({
      username: form.username,
      email: form.email,
      password: form.password
    })
      .then(() => {
        toast.success("Register successful 🎉");
        window.location.href = "/login";
      })
      .catch(err => {
        setError(err.response?.data?.error || "Registration failed");
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
                type="text"
                value={form.username}
                onChange={(e) =>
                setForm({ ...form, username: e.target.value })
                }
                required
            />
            </div>

            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                value={form.email}
                onChange={(e) =>
                setForm({ ...form, email: e.target.value })
                }
                required
            />
            </div>

            <div className="form-group">
            <label>Password</label>
            <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                setForm({ ...form, password: e.target.value })
                }
                required
            />
            <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "🙈" : "👁"}
            </span>
            </div>
             <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder=" "
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <span
                className="toggle-password"
                onClick={() => setShowConfirm(!showConfirm)}
            >
                {showConfirm ? "🙈" : "👁"}
            </span>
          </div>

          <button className="signup-btn" type="submit">
            Register
          </button>
        </form>
        <div className="auth-links">
            <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/login")}>
                Login
                </span>
            </p>
            </div>
         {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default SignupPage;