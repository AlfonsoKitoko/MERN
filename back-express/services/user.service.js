const userModel = require("../models/user.model")
const bcrypt = require("../utils/bcrypt")
const jwt = require("jsonwebtoken") //npm i jsonwebtoken

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()
//Get User By Id
exports.getById = async (id) => await userModel.findById(id)

//Crear un nuevo usuario
exports.create = async(datos) => {     
    datos.password = await bcrypt.hashPassword(datos.password)
    const newUser = new userModel(datos)    
    return await newUser.save()
}

//exports.getByUsername = async (usernameParam) => await userModel.findOne({username:usernameParam})

exports.login = async(usernameParam, passwordParam) => {    
    const userFound = await userModel.findOne({username:usernameParam}).select("+password")//await this.getByUsername(usernameParam)
    if(userFound){
        console.log(userFound)
        const validado = await bcrypt.compareLogin(passwordParam,userFound.password)
        if(validado){
            //JWT: Crear token INI
            const token = jwt.sign(
                {
                    //Payload
                    id: userFound._id,
                    username: userFound.username,
                    profile: userFound.profile
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h" //3600
                    //expiresIn: 60 //1 min
                }
            )
            const user = userFound.toObject()
            delete user.password //Eliminar el password
            return { user, token }
            //JWT: Crear token FIN
        }else{
            return null
        }
    }else{
        return null
    }
}