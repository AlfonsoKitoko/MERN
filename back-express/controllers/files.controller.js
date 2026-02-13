const AppError = require("../utils/AppError")

exports.uploadFiles = (req, res, next) => {
    // Validar que se suban archivos
    if (!req.files || req.files.length == 0) {
        next(new AppError("No se subió ningún archivo", 500))
    }
    res.status(200).json(req.files) // devolver info archivos
}

/*
✅ AAA:
- Accounting → log de subida
- Seguridad → validar que haya archivos antes de procesar
- Exam: ejemplo de middleware + controller + AppError
*/
