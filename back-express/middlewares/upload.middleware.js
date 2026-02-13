const multer = require("multer") // npm i multer
const path = require("path")
const fs = require("fs")

// Carpeta de almacenamiento de archivos
const uploadPath = path.join(__dirname, "../uploads")

// Configuración de Multer
const storage = multer.diskStorage({
    // Carpeta donde se guardan los archivos
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    // Formato del nombre del archivo
    filename: (req, file, cb) => {
        const timeStamp = Date.now() // timestamp actual
        const random = Math.round(Math.random() * 1e9) // random para evitar colisiones
        const ext = path.extname(file.originalname) // extensión original
        const baseName = path
            .basename(file.originalname, ext)
            .toLowerCase()
            .replace(/\s+/g, "-") // reemplaza espacios por guiones
            .replace(/[^a-z0-9\-]/g, "") // solo letras/números/guiones

        const fileName = `${timeStamp}-${random}-${baseName}${ext}` // ejemplo: 1705498123456-a9f3c2f1-informe.pdf
        cb(null, fileName)
    }
})

const upload = multer({ storage })

// Se puede agregar un fileFilter opcional para limitar tipos de archivo
// const upload = multer({storage, fileFilter})

module.exports = upload

/*
✅ Ejemplo examen:
- Control de subida segura
- Evitar sobrescribir archivos
- Preparado para 10 archivos max en routes/files.routes.js
*/
