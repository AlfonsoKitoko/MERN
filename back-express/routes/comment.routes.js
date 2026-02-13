const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()

// ===============================
// CRUD API REST
// ===============================

// GET → Listar comentarios
router.get("/", commentController.getAllComments)

// GET → Obtener comentario por ID
router.get("/:id", commentController.getCommentById)

// POST → Crear comentario
router.post("/", commentController.newComment)

// PATCH → Actualizar parcialmente comentario
router.patch("/:id", commentController.editCommentById)

// DELETE → Eliminar comentario
router.delete("/:id", commentController.deleteCommentById)

module.exports = router
