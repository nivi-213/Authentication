
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./table.css";

function Table() {
  const [allImage, setAllImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const showPdf = (pdf) => {
    try {
      window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const deletePdf = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/delete-file/${id}`);
      if (result.data.status === "ok") {
        alert("Deleted Successfully!!!");
        getPdf();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const editPdf = (data) => {
    navigate("/edit", { state: {  data } });
  };

  return (
    <div className="container mt-3">
      <div className="uploaded mt-5">
        <h4 className="text-center uploadpdfs">Uploaded PDFs:</h4>
        <div className="table-responsive">
          <table className="table text-center table-striped">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allImage == null ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No PDFs uploaded yet.
                  </td>
                </tr>
              ) : (
                allImage.map((data) => (
                  <tr key={data._id}>
                    <td>{data.title}</td>
                    <td>
                      <button className="btn btn-primary mr-2" onClick={() => showPdf(data.pdf)}>Show PDF</button>
                      <button className="btn btn-danger mr-2" onClick={() => deletePdf(data._id)}>Delete PDF</button>
                      <button className="btn btn-success ms-2" onClick={() => editPdf(data)}>Edit PDF</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
