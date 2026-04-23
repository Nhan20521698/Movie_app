import "./LoginPage.css";
import { useState } from "react";
import { login } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");       

    const handleSubmit = (e) => {   
    e.preventDefault();

    login({ username, password })
        .then(res => {  
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            toast.success("Login successful 🎉");
            window.location.href = "/";
        })
        .catch(err => {
            setError(err.response?.data?.error || "Login failed");
            console.error(err);
        });
    };

    return (    
        <div className="login-page">
            <div className="login-overlay">

                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">

                        <label>Username</label>
                        <input 
                            className="login-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}   
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className="login-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}    
                            onChange={(e) => setPassword(e.target.value)}   
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </span>
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
                <div className="auth-links">
                    <p>
                        Don't have an account?{" "}
                        <span onClick={() => navigate("/signup")}>
                        Sign Up
                        </span>
                    </p>

                    <p
                        className="forgot"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </p>
                    </div>
                {error && <p className="error">{error}</p>}     
            </div>
        </div>
    );
}

export default LoginPage;