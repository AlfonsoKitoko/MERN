const express = require("express")
const router = express.Router()
const catController = require("../controllers/categoria.controller")

// CRUD
router.get("/", catController.getAllCategorias)
router.get("/:id", catController.getByIdCategorias)
router.post("/", catController.createCategoria)
router.put("/:id", catController.updateCategoria)
router.delete("/:id", catController.deleteCategoria)

module.exports = router