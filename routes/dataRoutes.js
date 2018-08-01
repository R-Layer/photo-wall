const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.single("pin"), (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  res.status(200).json({ message: "ok" });
});

module.exports = router;
