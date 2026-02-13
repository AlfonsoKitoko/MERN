const userController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()

// ===============================
// JWT Middleware
// ===============================

// protect → verifica si el usuario está autenticado
const { protect } = require("../middlewares/jwt.mw")

// restrictTo → controla roles (AUTORIZACIÓN)
const { restrictTo } = require("../middlewares/profile.mw")

// ===============================
// RUTAS PROTEGIDAS
// ===============================

// GET todos los usuarios
// protect → solo usuarios autenticados pueden acceder
router.get("/", protect, userController.getAllUsers)

// GET usuario por ID
// protect → debe estar autenticado
// restrictTo("ADMIN") → solo ADMIN puede acceder
router.get("/:id", protect, restrictTo("ADMIN"), userController.getUserById)

// ===============================
// AUTENTICACIÓN
// ===============================

// Registro de usuario
// Aquí normalmente:
// - Se encripta password con bcrypt
// - Se guarda en MongoDB
router.post("/", userController.registerUser)

// Login
// Aquí normalmente:
// - Se compara password con bcrypt.compare()
// - Se genera JWT
// - Se devuelve token (o cookie HttpOnly)
router.post("/login", userController.loginUser)

module.exports = router
