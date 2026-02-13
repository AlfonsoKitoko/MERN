const userController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()
//JWT: Proteger rutas
const { protect } = require("../middlewares/jwt.mw") //Opción A
//const jwtMW = require("../middlewares/jwt.mw") //Opción B
const { restrictTo } = require("../middlewares/profile.mw")

//Listar todos los usuarios
router.get("/",protect,userController.getAllUsers) //Opción A
//router.get("/",jwtMW.protect,userController.getAllUsers) //Opción B
router.get("/:id",protect,restrictTo("ADMIN"),userController.getUserById)

//Crear/Registrar un nuevo usuario
router.post("/",userController.registerUser)
//Login
router.post("/login",userController.loginUser)

//Exportar rutas
module.exports = router