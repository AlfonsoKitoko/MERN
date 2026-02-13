const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()

// ===============================
// RUTAS SSR (STATEFUL)
// ===============================

// Mostrar vista index.ejs con todos los comentarios
router.get("/", commentController.findAllComments)

// Filtrar comentarios por usuario
router.get("/usuario", commentController.findCommentByUser)

// Mostrar formulario para nuevo comentario
router.get("/new", commentController.showNewComment)

// POST → Crear comentario
router.post("/", commentController.createComment)

// Mostrar detalle comentario
router.get("/:id", commentController.findCommentById)

// Mostrar formulario editar
router.get("/:id/edit", commentController.showEditComment)

// PATCH → Editar comentario
router.patch("/:id", commentController.editComment)

// DELETE → Eliminar comentario
router.delete("/:id", commentController.deleteComment)

module.exports = router
