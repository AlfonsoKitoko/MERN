const AppError = require("../utils/AppError")

exports.uploadFiles = (req,res,next) => {
    if(!req.files || req.files.length == 0){
        next(new AppError("No se subió ningún archivo", 500))
    }
    res.status(200).json(req.files)
}