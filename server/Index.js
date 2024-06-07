const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const EmployeeModal = require("./models/Employee");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

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

app.post("/register", (req, res) => {
  EmployeeModal.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(4000, () => {
  console.log("Server is Running 4000");
});
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// app.use("/files", express.static("files"));

// app.use(express.json());
// app.use(cors());

// const mongourl = "mongodb+srv://uploadfile:uploadfile@cluster0.qzfftdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(mongourl)
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.error("Error connecting to database: ", err);
//   });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// require("./pdfDetails");
// const PdfSchema = mongoose.model("PdfDetails");

// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);

//   const title = req.body.title;
//   const fileName = req.file.filename;

//   try {
//     await PdfSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.json({ status: "error", message: error.message });
//   }
// });

// app.put("/update-file/:id", upload.single("file"), async (req, res) => {
//   const { id } = req.params;
//   const title = req.body.title;

//   try {
//     const fileRecord = await PdfSchema.findById(id);

//     if (!fileRecord) {
//       return res.status(404).send({ status: "error", message: "File not found" });
//     }

//     const updateData = { title: title };

//     if (req.file) {
//       const newFileName = req.file.filename;
//       const oldFilePath = `./files/${fileRecord.pdf}`;

//       // Delete the old file
//       fs.unlink(oldFilePath, (err) => {
//         if (err) {
//           console.error("Error deleting old file: ", err);
//         }
//       });

//       updateData.pdf = newFileName;
//     }

//     await PdfSchema.findByIdAndUpdate(id, updateData);
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// app.get("/get-files", async (req, res) => {
//   try {
//     const data = await PdfSchema.find({});
//     res.send({ status: "ok", data: data });
//   } catch (error) {
//     res.json({ status: "error", message: error.message });
//   }
// });

// app.delete("/delete-file/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const file = await PdfSchema.findById(id);

//     if (!file) {
//       return res.status(404).send({ status: "error", message: "File not found" });
//     }

//     const filePath = `./files/${file.pdf}`;
//     fs.unlink(filePath, async (err) => {
//       if (err) {
//         return res.status(500).send({ status: "error", message: "File deletion error" });
//       }

//       await PdfSchema.findByIdAndDelete(id);
//       res.send({ status: "ok", message: "File deleted successfully" });
//     });
//   } catch (error) {
//     res.json({ status: "error", message: error.message });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Success!!!!");
// });

// app.listen(5000, () => {
//   console.log("Server Started");
// });
