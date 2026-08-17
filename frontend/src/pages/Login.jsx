import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const loginData = {
        username: formData.username,
        password: formData.password,
      };

      const response = await loginUser(loginData);

      console.log("Login successful:", response);

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid username or password.");
        } else if (error.response.status === 400) {
          setError("Please check your login details.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">

        {/* Avatar */}
        <div className="login-avatar">
          <div className="avatar-icon">
            <span className="avatar-head"></span>
            <span className="avatar-body"></span>
          </div>
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>MEMBER LOGIN</h1>

          <p>
            Welcome back! Please sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="login-field">
            <label htmlFor="username">USERNAME</label>

            <div className="input-container">

              <span className="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.8-3.5 3.1-5.5 7-5.5s6.2 2 7 5.5" />
                </svg>
              </span>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="password">PASSWORD</label>

            <div className="input-container">

              <span className="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-icon"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 5 9 7s-3.5 7-9 7a9.8 9.8 0 0 1-4.6-1.1" />
                    <path d="M5.6 7.2C3.8 8.5 3 10.4 3 12c0 2 3.5 7 9 7" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "LOGIN"}
          </button>

          {/* Remember me */}
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
            />

            <span className="custom-checkbox"></span>

            <span>Remember me</span>
          </label>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span></span>
          <strong>OR</strong>
          <span></span>
        </div>

        {/* Register */}
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Login;