const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());

mongoose
  .connect("mongo_Url")
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((err) => console.log("err"));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
