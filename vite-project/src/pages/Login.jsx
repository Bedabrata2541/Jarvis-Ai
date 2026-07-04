import Logo from "../components/Logo";
import "./../styles/login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/auth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {

    const response = await API.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert(response.data.message);

    navigate("/chat");

  } catch (error) {

    alert(error.response?.data?.message || "Login Failed");

  }

};

  return (
    <div className="login-container">

      {/* Left Section */}
      <div className="login-left">

  <Logo />

  <h1>
    Experience AI
    <br />
    Completely Local
  </h1>

  <p>
    Your own AI assistant running entirely on your computer.
    <br />
    Fast, private and secure.
  </p>

</div>

      {/* Right Section */}
      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p>Sign in to continue</p>

          <label>Email</label>

          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <div className="login-options">

            <label>

              <input type="checkbox" />

              Remember me

            </label>

            <a href="#">Forgot Password?</a>

          </div>

          <button className="login-btn" onClick={handleLogin}>

            Sign In

          </button>

          
          <p className="signup">

            Don't have an account?

            <Link to="/signup"> Create Account</Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;