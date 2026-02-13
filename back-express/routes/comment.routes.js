const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()

//Mostrar VISTA EJS index.ejs con listado de comentarios
router.get("/",commentController.findAllComments)

//Buscar Comentarios filtrados por Usuario
router.get("/usuario",commentController.findCommentByUser)

//Mostrar vista EJS new.ejs para crear un comentario
router.get("/new",commentController.showNewComment)
//POST - Crear comentario
router.post("/",commentController.createComment)

//Mostrar vista EJS show.ejs con detalles de un comentario
router.get("/:id",commentController.findCommentById)

//Mostrar vista EJS edit.ejs para editar un comentario
router.get("/:id/edit",commentController.showEditComment)
//PATCH - Updatear un comentario
router.patch("/:id",commentController.editComment)

//DELETE - Borrar un comentario
router.delete("/:id",commentController.deleteComment)



//Exportar rutas
module.exports = router