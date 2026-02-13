const userService = require("../services/user.service")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")

exports.getAllUsers = wrapAsync(async (req, res, next) => {
    let users = await userService.getAll()

    if (users.length > 0) {
        res.status(200).json(users)
    } else {
        next(new AppError("Sin usuarios", 404))
    }
})

exports.getUserById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const user = await userService.getById(id)
    if (user) {
        res.status(200).json(user)
    } else {
        next(new AppError("No hay información", 404))
    }
})


exports.registerUser = wrapAsync(async (req, res, next) => {
    const usuarioCreado = await userService.create(req.body)
    if (usuarioCreado) {
        res.status(200).json(usuarioCreado)
    } else {
        next(new AppError("Error al registrar el usuario", 400)) //BAD REQUEST
    }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
    const { username, password } = req.body
    const userLogued = await userService.login(username, password)
    if (userLogued) {
        res.cookie("token", userLogued.token, {
            httpOnly: true,     // No sean accesibles desde JS (document.cookie)
            secure: true,       // HTTPS
            sameSite: "none"    // Dominios distintos (frontend & backed)
        })
        res.status(200).json(userLogued)
    } else {
        next(new AppError("Usuario y/o contraseña incorrectos", 401))
    }
})