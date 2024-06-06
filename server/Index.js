// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const EmployeeModal = require("./models/Employee");
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/employee");
// // app.post("/login", (req, res) => {
// //   const { email, password } = req.body;
// //   EmployeeModal.findOne({ email: email }).then((user) => {
// //     if (user) {
// //       if (user.password === password) {
// //         res.json("Success");
// //       } else {
// //         res.json("the password is incorrect");
// //       }
// //     } else {
// //       res.json("No record exists");
// //     }
// //   });
// // });
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Temporary email and password for testing
//   const tempEmail = "hello@gmail.com";
//   const tempPassword = "hello213";

//   if (email === tempEmail && password === tempPassword) {
//     res.json("Success");
//     return;
//   }

//   // Normal login logic
//   EmployeeModal.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Success");
//       } else {
//         res.json("The password is incorrect");
//       }
//     } else {
//       res.json("No record exists");
//     }
//   }).catch(err => {
//     console.error("Error during login:", err);
//     res.status(500).json("Internal Server Error");
//   });
// });

// app.post("/register", (req, res) => {
//   EmployeeModal.create(req.body)
//     .then((employees) => res.json(employees))
//     .catch((err) => res.json(err));
// });

// app.listen(4000, () => {
//   console.log("Server is Running 4000");
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" }); // Set destination folder for multer
const app = express();
const EmployeeModal = require("./models/Employee");
app.use(express.json());
app.use(cors());

const mongoUri =
  "mongodb+srv://auth:auth@cluster0.tm9n4m1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }); // Added options for mongoose connection

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Temporary email and password for testing
  const tempEmail = "hello@gmail.com";
  const tempPassword = "hello213";

  if (email === tempEmail && password === tempPassword) {
    res.json("Success");
    return;
  }

  // Normal login logic
  EmployeeModal.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record exists");
    }
  }).catch(err => {
    console.error("Error during login:", err);
    res.status(500).json("Internal Server Error");
  });
});

app.post("/upload-files", upload.single("file"), async (req, res) => {
  const { title } = req.body;
  const fileName = req.file.filename;
  try {
    await EmployeeModal.create({ title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.json({ status: "error", message: error.message });
  }
});

app.put("/update-file/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const fileRecord = await EmployeeModal.findById(id);
    if (!fileRecord) {
      return res
        .status(404)
        .send({ status: "error", message: "File not found" });
    }
    const updateData = { title };
    if (req.file) {
      const newFileName = req.file.filename;
      const oldFilePath = `./uploads/${fileRecord.pdf}`;
      // Delete the old file
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error("Error deleting old file: ", err);
        }
      });
      updateData.pdf = newFileName;
    }
    await EmployeeModal.findByIdAndUpdate(id, updateData);
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    const data = await EmployeeModal.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.json({ status: "error", message: error.message });
  }
});

app.delete("/delete-file/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const file = await EmployeeModal.findById(id);
    if (!file) {
      return res
        .status(404)
        .send({ status: "error", message: "File not found" });
    }
    const filePath = `./uploads/${file.pdf}`;
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res
          .status(500)
          .send({ status: "error", message: "File deletion error" });
      }
      await EmployeeModal.findByIdAndDelete(id);
      res.send({ status: "ok", message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.json({ status: "error", message: error.message });
  }
});

app.post("/register", (req, res) => {
  EmployeeModal.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 4000; // Use dynamic port or default to 4000
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
