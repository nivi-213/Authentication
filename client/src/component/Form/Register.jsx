

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "./register.css";

function Register() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [pdfId, setPdfId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.data) {
      const { data } = location.state;
      setTitle(data.title);
      setPdfId(data._id);
      setIsUpdate(true);
    } else {
      setTitle("");
      setPdfId(null);
      setIsUpdate(false);
    }
  }, [location]);
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (file) {
      formData.append("file", file);
    }
  
    try {
      let result;
      if (isUpdate) {
        if (!pdfId) {
          throw new Error("PDF ID is missing or invalid.");
        }
  
        result = await axios.put(
          `http://localhost:5000/update-file/${pdfId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        result = await axios.post("http://localhost:5000/upload-files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      if (result.data.status === "ok") {
        alert(isUpdate ? "Updated Successfully!!!" : "Uploaded Successfully!!!");
        navigate("/table");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error(`Error ${isUpdate ? "updating" : "uploading"} file:`, error);
      alert(`Error ${isUpdate ? "updating" : "uploading"} file: ${error.message}`);
    }
  };
  

  return (
    <div className="App container mt-5">
      <div className="d-flex justify-content-center mt-5">
        <form className="formStyle" onSubmit={submitImage}>
          <h1 id="header_1" className="form-header mb-3 text-center">
            {isUpdate ? "Update PDF in React" : "Upload PDF in React"}
          </h1>
          <div className="row justify-content-center">
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                type="text"
                className="form-control w-100"
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="" htmlFor="">Browse</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="text-center">
              <button className="btn submitbutton btn-primary" type="submit">
                {isUpdate ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
