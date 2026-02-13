const express = require("express")
const router = express.Router()

// Importamos controlador (lógica separada → buena práctica MVC)
const catController = require("../controllers/categoria.controller")

// ===============================
// CRUD REST
// ===============================

// GET → Listar todas las categorías
router.get("/", catController.getAllCategorias)

// GET → Obtener categoría por ID
router.get("/:id", catController.getByIdCategorias)

// POST → Crear nueva categoría
router.post("/", catController.createCategoria)

// PUT → Actualizar categoría completa
router.put("/:id", catController.updateCategoria)

// DELETE → Eliminar categoría
router.delete("/:id", catController.deleteCategoria)

module.exports = router
