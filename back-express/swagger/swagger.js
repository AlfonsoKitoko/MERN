require("dotenv").config()
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title:"Comments API",
            version:"1.0.0",
            description:"API for managing Comments",
            contact: {
                name: "Mike Sánchez"
            },
            servers: [
                {
                    url: "http://localhost:" + process.env.PUERTO,
                    description: 'Local Server'
                }
            ]
        }
    },
    apis: ['./routes/*js']
}

const specs = swaggerJsdoc(options)
module.exports = specs