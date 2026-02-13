require("dotenv").config()
const mongoose = require("mongoose") // npm i mongoose

exports.conectarMongoDB = async () => {
    // Conecta usando variable de entorno (Atlas)
    return mongoose.connect(process.env.MONGODB_ATLAS)
}

/*
✅ AAA:
- Seguridad: conexión desde variable de entorno, no hardcodeada
- Authentication → MongoDB usa usuario/clave en URI
- Si falla la conexión, el servidor se detiene en server.js
*/
