const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const EmployeeModal = require("./models/Employee");
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/register", (req, res) => {
  EmployeeModal.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(6000, () => {
  console.log("Server is Running");
});
