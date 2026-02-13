const CommentService = require("../services/comment.service")
const CategoriasService = require("../services/categoria.service")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")

// =========================
// SSR (Stateful, EJS)
// =========================

// Listado comentarios
exports.findAllComments = async (req, res) => {
    const { cat } = req.query
    let comentarios = cat ? await CommentService.getByCat(cat) : await CommentService.getAll()

    if (comentarios.length > 0) {
        res.locals.tituloEJS = "Listado"
        res.render("index.ejs", { comentarios, categorias: await CategoriasService.getAll() })
    } else {
        res.status(404).json("Sin comentarios...")
    }
}

// Detalle comentario
exports.findCommentById = async (req, res) => {
    const { id } = req.params
    const comentario = await CommentService.getById(id)
    if (comentario) {
        res.locals.tituloEJS = "Detalles"
        res.render("show.ejs", { comentario })
    } else {
        res.status(404).json("Comentario no encontrado")
    }
}

// Formulario nuevo comentario
exports.showNewComment = async (req, res) => {
    res.locals.tituloEJS = "Nuevo"
    res.render("new.ejs", { categorias: await CategoriasService.getAll() })
}

// POST → Crear comentario
exports.createComment = async (req, res) => {
    await CommentService.create(req.body)
    res.redirect("/comentarios") // SSR → redirect
}

// Formulario editar comentario
exports.showEditComment = async (req, res) => {
    const { id } = req.params
    const comentario = await CommentService.getById(id)
    if (comentario) {
        res.locals.tituloEJS = "Editar"
        res.render("edit.ejs", { comentario, categorias: await CategoriasService.getAll() })
    } else {
        res.status(404).json("Comentario no encontrado")
    }
}

// PATCH → Editar comentario
exports.editComment = async (req, res) => {
    const { id } = req.params
    const commmentUpdated = await CommentService.update(id, req.body)
    if (commmentUpdated) res.redirect("/comentarios")
    else res.status(500).json("ERROR al actualizar")
}

// DELETE → Borrar comentario
exports.deleteComment = async (req, res) => {
    const { id } = req.params
    const commentDeleted = await CommentService.remove(id)
    if (commentDeleted) res.redirect("/comentarios")
    else res.status(500).json("ERROR al eliminar")
}

// Filtrar comentarios por usuario
exports.findCommentByUser = async (req, res) => {
    const { q } = req.query
    const comentario = await CommentService.getByUser(q)
    if (comentario) res.status(200).json(comentario)
    else res.status(404).json("Comentario no encontrado")
}

// =========================
// CSR (Stateless, JSON API)
// =========================
exports.getAllComments = wrapAsync(async (req, res, next) => {
    const { cat } = req.query
    let comentarios = cat ? await CommentService.getByCat(cat) : await CommentService.getAll()
    if (comentarios.length > 0) res.status(200).json(comentarios)
    else next(new AppError("Sin comentarios", 404))
})

exports.getCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const comentario = await CommentService.getById(id)
    if (comentario) res.status(200).json(comentario)
    else next(new AppError("Comentario no encontrado", 404))
})

exports.newComment = wrapAsync(async (req, res, next) => {
    const comentarioCreado = await CommentService.create(req.body)
    if (comentarioCreado) res.status(200).json(comentarioCreado)
    else next(new AppError("Error al crear el comentario", 404))
})

exports.editCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const commmentUpdated = await CommentService.update(id, req.body)
    if (commmentUpdated) res.status(200).json(commmentUpdated)
    else next(new AppError("ERROR al actualizar", 500))
})

exports.deleteCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const commentDeleted = await CommentService.remove(id)
    if (commentDeleted) res.status(200).json(commentDeleted)
    else next(new AppError("ERROR al eliminar", 500))
})

/*
✅ AAA:
- SSR: stateful con EJS y res.locals
- CSR: stateless JSON
- wrapAsync + AppError → Error Handling global
- Exam: distinguir SSR vs CSR
*/
