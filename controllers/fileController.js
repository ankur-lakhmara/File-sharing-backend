const File = require("../models/fileModel");
const multer = require("multer");
const path = require("path");
const mime = require("mime");
const sendEmail = require("../controllers/sendEmail");
const nodemailer = require("nodemailer");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Define the upload middleware
const uploadMiddleware = upload.single("file");

// Define the async function to handle the file upload
const uploadFile = async (req, res, next) => {
  try {
    const file = new File({
      fileName: req.file.originalname,
      path: req.file.path,
      url: `http://localhost:3000/uploads/${req.file.filename}`,
      // Add any other fields you need
    });

    await file.save();

    res.json({ message: "File uploaded successfully", file });
  } catch (error) {
    next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const file = await File.findOne({ _id: fileId });
    if (!file) {
      res.json({ message: "File not found" });
    }
    const mimeType = mime.getType(path.extname(file.fileName));
    //set the MIME type on headers to het the exact extejion of uploaded file
    res.setHeader("Content-Type", mimeType);
    // res.json({ message: "file downloaded sucessfully", file });
    const downloadUrl = `http://localhost:3000/api/files/download/${fileId}`;
    await sendEmail("nilef85691@trazeco.com", downloadUrl);
    res.sendFile(path.join(__dirname, "..", file.path));

    // res.json({ message: "File downloaded successfully", file, downloadUrl });
  } catch (error) {
    next(error);
  }
};

//api for getting the list for all files
exports.getList = async (req, res, next) => {
  try {
    const files = await File.find();
    res.json({ message: "file retrived successfully", files });
  } catch (error) {
    next(error);
  }
};
// Export the upload middleware and the async function together
exports.uploadFile = [uploadMiddleware, uploadFile];

// Other controller functions (e.g., generate link, send email) go here
