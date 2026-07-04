import "../styles/signup.css";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/auth";

function Signup() {

    const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const handleSignup = async () => {
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await API.post("/signup", {
      name,
      email,
      password,
    });

    alert(response.data.message);

    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed.");
  }
};
    return(

<div className="signup-container">

<div className="signup-left">

<Logo/>

<h1>Create Your Account</h1>

<p>

Join Local AI and experience private AI running on your computer.

</p>

</div>

<div className="signup-right">

<div className="signup-card">

<h2>Create Account</h2>

<p>Start your AI journey today.</p>

<label>Name</label>

<input
    type="text"
    placeholder="John Doe"
    value={name}
    onChange={(e)=>setName(e.target.value)}
/>

<label>Email</label>

<input
    type="email"
    placeholder="john@gmail.com"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
/>

<label>Password</label>

<div className="password-box">

<input
    type={showPassword ? "text":"password"}
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
/>

<button
type="button"
className="eye-btn"
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword ? <FaEyeSlash/>:<FaEye/>}

</button>

</div>

<label>Confirm Password</label>

<div className="password-box">

<input
    type={showConfirm ? "text":"password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button
type="button"
className="eye-btn"
onClick={()=>setShowConfirm(!showConfirm)}
>

{showConfirm ? <FaEyeSlash/>:<FaEye/>}

</button>

</div>

<button
className="signup-btn"
onClick={handleSignup}
>

Create Account

</button>

<p className="login-link">

Already have an account?

<Link to="/"> Login</Link>

</p>

</div>

</div>

</div>

)

}

export default Signup;