import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6000/register", { name, email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>

        <label for="name">
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <span>NAME</span>
        </label>

        <label for="">
          <input
            type="email"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label for="">
          <input
            type="password"
            name="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>PASSWORD</span>
        </label>

        {/* <div class="termofuse">
          <input type="checkbox" name="" id="" />
          <span>
            By submitting this form i agree to
            <a href="#">terms of use</a>
          </span>
        </div> */}

        <button
          type="submit"
          className="btn btn-primary border w-100 bg-primary"
        >
          Register
        </button>
      </form>
      <p className="text-center">Already Have an Account</p>
      <Link to="/login " className="btn btn-default border w-100 bg-light">
        Login
      </Link>
    </div>
  );
}

export default Signup;
