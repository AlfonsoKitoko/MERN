require("dotenv").config() //Acceder a .env (variables de entorno)
const mongoose = require("mongoose") //npm i

exports.conectarMongoDB = async() => {
    //return mongoose.connect(process.env.MONGODB_CONSTRING)
    return mongoose.connect(process.env.MONGODB_ATLAS)
}
