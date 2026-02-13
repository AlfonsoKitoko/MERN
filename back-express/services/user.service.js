const userModel = require("../models/user.model")
const bcrypt = require("../utils/bcrypt")
const jwt = require("jsonwebtoken") // npm i jsonwebtoken

// GET → Todos los usuarios
exports.getAll = async () => await userModel.find()

// GET → Usuario por ID
exports.getById = async (id) => await userModel.findById(id)

// POST → Crear usuario con hash de password
exports.create = async (datos) => {
    datos.password = await bcrypt.hashPassword(datos.password) // 🔒 Encriptación
    const newUser = new userModel(datos)
    return await newUser.save()
}

// LOGIN → Comprobación usuario + contraseña
exports.login = async (usernameParam, passwordParam) => {
    // Buscar usuario y traer password aunque esté select: false
    const userFound = await userModel.findOne({ username: usernameParam }).select("+password")
    if (userFound) {
        const validado = await bcrypt.compareLogin(passwordParam, userFound.password)
        if (validado) {
            // ✅ AAA: Generar JWT
            const token = jwt.sign(
                {
                    id: userFound._id,
                    username: userFound.username,
                    profile: userFound.profile
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" } // Token válido 1 hora
            )
            // Eliminar password antes de devolver usuario
            const user = userFound.toObject()
            delete user.password
            return { user, token }
        } else {
            return null // Contraseña incorrecta
        }
    } else {
        return null // Usuario no existe
    }
}

/*
✅ AAA / Examen:
- Authentication: login + register con bcrypt
- Authorization: JWT con payload id, username, profile
- Accounting: wrapAsync + AppError en controller
- Seguridad: hash de password, JWT expirado, eliminar password en response
*/
