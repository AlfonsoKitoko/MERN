const fileController = require("../controllers/files.controller")
const upload = require("../middlewares/upload.middleware")
const express = require("express")
const router = express.Router()

// Subida múltiple de archivos (10 archivos máx en el req.files)
router.post("/",upload.array("files",10),fileController.uploadFiles)

module.exports = router