const fileController = require("../controllers/files.controller")
const upload = require("../middlewares/upload.middleware")
const express = require("express")
const router = express.Router()

// ===============================
// SUBIDA DE ARCHIVOS
// ===============================

// upload.array("files",10)
// → Middleware Multer
// → Permite subir hasta 10 archivos
// → Los archivos estarán en req.files

router.post("/", upload.array("files", 10), fileController.uploadFiles)

module.exports = router
