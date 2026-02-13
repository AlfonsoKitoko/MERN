require("dotenv").config()
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: '3.0.0',  // versión OpenAPI
        info: {
            title: "Comments API",
            version: "1.0.0",
            description: "API for managing Comments",
            contact: { name: "Mike Sánchez" },
            servers: [
                {
                    url: "http://localhost:" + process.env.PUERTO, // servidor local
                    description: 'Local Server'
                }
            ]
        }
    },
    apis: ['./routes/*js'] // archivos donde se buscan comentarios para documentación
}

const specs = swaggerJsdoc(options)
module.exports = specs

/*
✅ AAA:
- No afecta autenticación directamente, pero permite auditar rutas y permisos.
- Útil para exámenes: saber cómo documentar una API REST
*/
