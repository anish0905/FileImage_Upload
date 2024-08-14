const upload = require("../modules/fileModule");
const File = require("../models/fileModel");
const multer = require("multer");

const uploadFile = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    // Save file metadata to the database
    const fileData = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    try {
      await fileData.save();
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.json({ message: "Upload successful", file: req.file, url: fileUrl });
    } catch (error) {
      res.status(500).send("Error saving file data to the database.");
    }
  });
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).send("Error retrieving files from the database.");
  }
};

// Function to get a single file by filename
const getFileByFilename = async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await File.findOne({ filename });

    if (!file) {
      return res.status(404).send("File not found.");
    }

    res.json(file);
  } catch (error) {
    res.status(500).send("Error retrieving file.");
  }
};

module.exports = { uploadFile, getAllFiles, getFileByFilename };
