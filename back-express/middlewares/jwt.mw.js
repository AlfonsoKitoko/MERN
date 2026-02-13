require("dotenv").config()
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")

exports.protect = (req, res, next) => {
    let token = null

    // 1️⃣ Verificar header Authorization Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    // 2️⃣ Verificar cookie
    if (req.cookies.token) {
        token = req.cookies.token
    }

    // 3️⃣ Si no hay token → no autenticado
    if (!token) {
        return next(new AppError("No autenticado", 401))
    }

    try {
        // Validar token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // payload: {id, username, profile}
        next() // token válido → continuar
    } catch (error) {
        // Token inválido o expirado
        next(new AppError("Token inválido o expirado. Desc: " + error, 401))
    }
}

/*
✅ AAA:
- Authentication: verifica identidad
- Stateless → no usa sesiones en DB
- payload req.user → útil para Authorization middleware
- 401 si no autenticado o token inválido
*/
