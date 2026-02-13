const multer = require("multer") //npm i multer
const path = require("path")
const fs = require("fs")

//Ruta de almacenamiento
const uploadPath = path.join(__dirname, "../uploads")

//Configurar multer
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, uploadPath)
    },
    filename:(req,file,cb)=>{        
        const timeStamp = Date.now()
        const random = Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        const baseName = path
            .basename(file.originalname, ext)
            .toLowerCase()
            .replace(/\s+/g, "-") //Reemplazar todos los espacios y tabulaciones por guión (g -> global)
            .replace(/[^a-z0-9\-]/g, "") //Reemplazar todos los caracteres que no sean letras minúsculas, números o guiones (eliminar acentos, tildes, caracteres especiales...)

        //1705498123456-a9f3c2f1-informe-fct-empresa-acme.pdf      
        const fileName = `${timeStamp}-${random}-${baseName}${ext}`

        cb(null,fileName)
    }   
})

const upload = multer({storage})

//Filtro opcional
//const fileFilter = ...
//const upload = multer({storage, fileFilter})

module.exports = upload

