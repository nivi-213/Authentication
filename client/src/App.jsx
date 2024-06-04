import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./component/signup/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signup"} />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
