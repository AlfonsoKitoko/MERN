require("dotenv").config()
const log4js = require("log4js")
const ruta = process.env.LOGS_FOLDER       // Carpeta donde se guardan los logs
const logsActivos = process.env.LOGS_ACTIVOS
const express = require("express")
const app = express()

console.log(app.get("env")) // Muestra "development" o "production"

// Configuración de logs
if (logsActivos === "true" && app.get("env") === "development") {
    // Logs en archivos separados
    log4js.configure({
        appenders: {
            access: { type: "dateFile", filename: ruta + "access.log", pattern: "-yyyy-MM-dd" },
            error: { type: "dateFile", filename: ruta + "error.log", pattern: "-yyyy-MM-dd" }
        },
        categories: {
            default: { appenders: ["access"], level: "ALL" },
            access: { appenders: ["access"], level: "ALL" },
            error: { appenders: ["error"], level: "ALL" }
        }
    })
} else {
    // Logs en consola
    log4js.configure({
        appenders: { access: { type: "console" }, error: { type: "console" } },
        categories: {
            default: { appenders: ["access"], level: "ALL" },
            access: { appenders: ["access"], level: "ALL" },
            error: { appenders: ["error"], level: "ALL" }
        }
    })
}

// Obtenemos loggers
const acceso = log4js.getLogger("access")
const err = log4js.getLogger("error")

// Exportamos para usar en controladores
module.exports = {
    access: acceso,          // logging de accesos (Accounting)
    error: err,              // logging de errores
    express: log4js.connectLogger(acceso)  // middleware para express
}

/*
✅ AAA:
- Accounting → monitorización de accesos y errores
- Se puede usar en routes y middlewares
- Ejemplo examen: mostrar cómo registrar un error 401
*/
