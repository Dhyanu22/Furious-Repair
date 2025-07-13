// components/SignUpLogin.jsx
import { useState } from "react";
import axios from "axios";
import "./signUP.css";

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isRepairer, setIsRepairer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "", expertise: [] });
    setError("");
  };

  const handleRepairerToggle = () => {
    setIsRepairer((prev) => !prev);
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleExpertiseChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData((prev) => ({
      ...prev,
      expertise: selected,
    }));
  };

  const checkRepairerAndRedirect = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/repairer/me", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isRepairer) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data, isRepairer: true })
          );
          window.location.href = "/repairer/repairs";
        }
      }
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }
    if (isSignUp && !formData.name) {
      setError("Name is required for sign up");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const endpoint = isSignUp
      ? isRepairer
        ? "/api/auth/repairer/signup"
        : "/api/auth/signup"
      : isRepairer
      ? "/api/auth/repairer/signin"
      : "/api/auth/signin";
    const dataToSend = isSignUp
      ? isRepairer
        ? { ...formData, expertise: formData.expertise }
        : formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(
        `http://localhost:3001${endpoint}`,
        dataToSend,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert(isSignUp ? "Sign up successful! 🎉" : "Sign in successful! 👋");
      setFormData({ name: "", email: "", password: "", expertise: [] });
      if (isRepairer) {
        await checkRepairerAndRedirect();
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const expertiseOptions = [
    "Mobile",
    "Laptop",
    "Tablet",
    "Desktop",
    "Smartwatch",
    "Home Appliances",
    "Car",
    "Bike",
    "Scooter",
    "Truck",
    "Electric Vehicle (EV)",
    "Other",
  ];

  return (
    <div className="signUpRoot flex justify-center items-center bg-[#fcf2e4] min-h-screen">
      <div
        className={`single-form-container ${
          isSignUp ? "show-signup" : "show-signin"
        }`}
      >
        <div className="flex justify-end mb-2">
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold transition z-51 ${
              isRepairer
                ? "bg-orange-700 text-white"
                : "bg-orange-100 text-orange-700"
            }`}
            onClick={handleRepairerToggle}
            disabled={loading}
          >
            {isRepairer ? "Switch to User" : "Sign in/up as Repairer"}
          </button>
        </div>
        <div className="form-animator">
          {isSignUp ? (
            <form onSubmit={handleSubmit} className="fade-in">
              <h1>Create Account 🚀</h1>
              {error && <div className="error-message">{error}</div>}
              <input
                type="text"
                name="name"
                placeholder="👤 Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="📧 Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="6"
              />
              {isRepairer && (
                <div className="mb-3">
                  <label className="block font-semibold text-orange-900 mb-1">
                    Area of Expertise
                  </label>
                  <div className="expertise-group">
                    {expertiseOptions.map((option) => (
                      <label key={option} className="expertise-option">
                        <input
                          type="checkbox"
                          name="expertise"
                          value={option}
                          checked={formData.expertise.includes(option)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData((prev) => ({
                              ...prev,
                              expertise: checked
                                ? [...prev.expertise, option]
                                : prev.expertise.filter(
                                    (exp) => exp !== option
                                  ),
                            }));
                          }}
                          disabled={loading}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <small className="text-gray-500">
                    Select all that apply.
                  </small>
                </div>
              )}
              <button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
              <p className="mt-4 text-sm">
                Already have an account?{" "}
                <span className="link" onClick={toggleForm}>
                  Sign In
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="fade-in">
              <h1>Sign In 👋</h1>
              {error && <div className="error-message">{error}</div>}
              <input
                type="email"
                name="email"
                placeholder="📧 Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot your password? 🤔
              </a>
              <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <p className="mt-4 text-sm">
                Don't have an account?{" "}
                <span className="link" onClick={toggleForm}>
                  Sign Up
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;
