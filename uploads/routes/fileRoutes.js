const express = require("express");
const router = express.Router();
const {
  uploadFile,
  getAllFiles,
  getFileByFilename,
} = require("../controllers/fileController");

// Route for file upload
router.post("/upload", uploadFile);
// Route to get all files
router.get("/files", getAllFiles);

// Route to get a specific file by filename
router.get("/files/:filename", getFileByFilename);

module.exports = router;
