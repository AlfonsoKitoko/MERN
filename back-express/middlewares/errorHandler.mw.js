const logger = require("../utils/logger")

exports.errorHandler = (err, req, res, next) => {
    let { status = 500, message = "ERROR DEL SERVIDOR" } = err

    console.log("Dentro de Error Handler")
    console.log(err)
    console.log(err.name)
    console.log(err.code)

    // Validaciones de Mongoose
    if (err.name == "ValidationError") {
        status = 400
    }

    // Errores de MongoDB
    if (err.name == "MongoServerError") {
        status = 400
        if (err.code == 11000) {
            // Clave duplicada
            status = 406 // Not Acceptable
        }
    }

    // Logging del error
    logger.error.error(`Error Handler(${status}): ${err}`)

    // Respuesta JSON con status y mensaje
    res.status(status).json({ err: message })
}

/*
✅ AAA:
- Accounting: log de errores (Log4js)
- Control global de errores → evita filtración de info sensible
- Diferencia de status 400, 401, 403, 406 para examen
*/
