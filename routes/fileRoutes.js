const express = require("express");
const fileController = require("../controllers/fileController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/upload", verifyToken, fileController.uploadFile);
router.get("/download/:id", fileController.downloadFile);
router.get("/getAllFiles", fileController.getList);

module.exports = router;
