const CommentService = require("../services/comment.service")
const CategoriasService = require("../services/categoria.service")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")

exports.findAllComments = async (req, res) => {
    const { cat } = req.query
    let comentarios = []
    if (cat) {
        comentarios = await CommentService.getByCat(cat)
    } else {
        comentarios = await CommentService.getAll()
    }
    if (comentarios.length > 0) {
        res.locals.tituloEJS = "Listado"
        res.render("index.ejs", { comentarios, categorias: await CategoriasService.getAll() })
    } else {
        res.status(404).json("Sin comentarios...")
    }
}

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

exports.showNewComment = async (req, res) => {
    res.locals.tituloEJS = "Nuevo"
    res.render("new.ejs", { categorias: await CategoriasService.getAll() })
}

exports.createComment = async (req, res) => {
    //const { usuario, opinion } = req.body
    //const datosComentario = { usuario, opinion }
    await CommentService.create(req.body)
    res.redirect("/comentarios")
}

exports.showEditComment = async (req, res) => {
    const { id } = req.params
    const comentario = await CommentService.getById(id)
    console.log(comentario)
    if (comentario) {
        res.locals.tituloEJS = "Editar"
        res.render("edit.ejs", { comentario, categorias: await CategoriasService.getAll() })
    } else {
        res.status(404).json("Comentario no encontrado")
    }
}

exports.editComment = async (req, res) => {
    const { id } = req.params
    const commmentUpdated = await CommentService.update(id, req.body)
    if (commmentUpdated) {
        res.redirect("/comentarios")
    } else {
        res.status(500).json("ERROR al actualizar")
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params
    const commentDeleted = await CommentService.remove(id)
    if (commentDeleted) {
        res.redirect("/comentarios")
    } else {
        res.status(500).json("ERROR al eliminar")
    }
}

exports.findCommentByUser = async (req, res) => {
    const { q } = req.query
    const comentario = await CommentService.getByUser(q)
    if (comentario) {
        res.status(200).json(comentario)
    } else {
        res.status(404).json("Comentario no encontrado")
    }
}


//-------------------------------------------------------
//CSR
//-------------------------------------------------------
exports.getAllComments = wrapAsync(async (req, res, next) => {
    const { cat } = req.query
    let comentarios = []
    if (cat) {
        comentarios = await CommentService.getByCat(cat)
    } else {
        comentarios = await CommentService.getAll()
    }
    if (comentarios.length > 0) {
        res.status(200).json(comentarios)
    } else {
        //res.status(404).json("Sin comentarios...")
        next(new AppError("Sin comentarios", 404))
    }
})

exports.getCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const comentario = await CommentService.getById(id)
    if (comentario) {
        res.status(200).json(comentario)
    } else {
        //res.status(404).json("Comentario no encontrado")
        next(new AppError("Comentario no encontrado", 404))
    }
})

exports.newComment = wrapAsync(async (req, res, next) => {
    const comentarioCreado = await CommentService.create(req.body)
    if (comentarioCreado) {
        res.status(200).json(comentarioCreado)
    } else {
        //res.status(500).json("Error al crear el comentario")
        next(new AppError("Error al crear el comentario", 404))
    }
})

exports.editCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const commmentUpdated = await CommentService.update(id, req.body)
    if (commmentUpdated) {
        res.status(200).json(commmentUpdated)
    } else {
        //res.status(500).json("ERROR al actualizar")
        next(new AppError("ERROR al actualizar", 500))
    }
})

exports.deleteCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const commentDeleted = await CommentService.remove(id)
    if (commentDeleted) {
        res.status(200).json(commentDeleted)
    } else {
        //res.status(500).json("ERROR al eliminar")
        next(new AppError("ERROR al eliminar", 500))
    }
})
