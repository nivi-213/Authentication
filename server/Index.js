const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const EmployeeModal = require("./models/Employee");
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/employee");
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   EmployeeModal.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Success");
//       } else {
//         res.json("the password is incorrect");
//       }
//     } else {
//       res.json("No record exists");
//     }
//   });
// });
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json('Success');
      } else {
        res.json('The password is incorrect');
      }
    } else {
      res.json('No record exists');
    }
  } catch (error) {
    res.status(500).json('Error logging in: ' + error.message);
  }
});

app.post("/register", (req, res) => {
  EmployeeModal.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(4000, () => {
  console.log("Server is Running 4000");
});
