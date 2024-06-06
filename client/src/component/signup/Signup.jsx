import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setError(""); // Clear previous errors
    setIsLoading(true);

    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      isValid = false;
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    axios
      .post("http://localhost:4000/register", { name, email, password })
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>

        {error && <div className="error">{error}</div>}

        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>NAME</span>
          {nameError && (
            <div className="input-error text-danger mb-2">{nameError}</div>
          )}
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>EMAIL</span>
          {emailError && (
            <div className="input-error text-danger mb-2">{emailError}</div>
          )}
        </label>

        <label htmlFor="password">
          <div className="password-input-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>PASSWORD</span>
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="password-toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          {passwordError && (
            <div className="input-error text-danger mb-2">{passwordError}</div>
          )}
        </label>

        <div className="text-end mt-4">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          ) : (
            <button className="btn btn-primary border w-100" type="submit">
              Register
            </button>
          )}
        </div>
      </form>
      <p className="text-center">Already Have an Account?</p>
      <Link to="/login" className="btn btn-default border w-100 bg-light">
        Login
      </Link>
    </div>
  );
}

export default Signup;
