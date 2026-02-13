//let comentarios = require("../models/comment.model.json") // ejemplo JSON
const commentModel = require("../models/comment.model")

// GET → Todos los comentarios con populate para traer info de la categoría
exports.getAll = async () => await commentModel.find().populate("categoria", "nombre")

// GET → Comentario por ID
exports.getById = async (id) => await commentModel.findById(id).populate("categoria", "nombre")

// GET → Comentarios por usuario
exports.getByUser = async (user) => await commentModel.find({ usuario: user }).populate("categoria", "nombre")

// GET → Comentarios por categoría
exports.getByCat = async (cat) => await commentModel.find({ categoria: cat }).populate("categoria", "nombre")

// POST → Crear comentario
exports.create = async (datos) => {
    const newComment = new commentModel(datos)
    return await newComment.save() // INSERT MongoDB
}

// PATCH → Actualizar comentario por ID
exports.update = async (id, datos) => {
    return await commentModel.findByIdAndUpdate(id, datos, { new: true })
}

// DELETE → Eliminar comentario por ID
exports.remove = async (id) => {
    return await commentModel.findByIdAndDelete(id)
}

/*
✅ AAA / Examen:
- Servicio desacoplado → los controllers no manejan la BD directamente
- MongoDB: find(), findById(), save(), findByIdAndUpdate(), findByIdAndDelete()
- Populate → join equivalente en MongoDB, útil para mostrar info relacionada
- SSR / CSR usan este service
*/
