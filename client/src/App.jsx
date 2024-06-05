import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./component/signup/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Home from "./component/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signup"} />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
