import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          toast.success("Login successful!");
          navigate("/home");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        console.error("Error logging in:", err);
        toast.error("Error logging in. Please try again.");
      });
  };

  return (
    <div>
      <ToastContainer />
      <form className="login" onSubmit={handleSubmit}>
        <h2 className="text-center">Welcome, User!</h2>
        <p className="text-center">Please log in</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary border w-100 h bg-primary"
        >
          Login
        </button>
        <div className="text-center">
          <a href="#">Forgot password</a>
          <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
