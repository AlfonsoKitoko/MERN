//const categorias = require("../models/categorias.model.json") // Ejemplo JSON (desuso)
const Categoria = require("../models/categoria.model")

// GET → Todas las categorías
exports.getAll = async () => await Categoria.find()

// GET → Categoría por ID
exports.getById = async (id) => await Categoria.findById(id)

// POST → Crear categoría
exports.create = async (data) => {
    // Normalizamos el nombre en minúsculas
    const cat = new Categoria({ nombre: data.nombre.toLowerCase() })
    return await cat.save() // INSERT MongoDB
}

// PUT → Actualizar categoría por ID
exports.update = async (id, data) => {
    // {new:true} devuelve el documento actualizado
    return await Categoria.findByIdAndUpdate(id, data, { new: true })
}

// DELETE → Borrar categoría por ID
exports.delete = async (id) => {
    return await Categoria.findByIdAndDelete(id)
}

/*
✅ AAA / Examen:
- Servicio CRUD puro → desacopla lógica de controller
- MongoDB → uso de find(), findById(), save(), findByIdAndUpdate()
- Ideal para combinar con protección (JWT + ADMIN) en rutas
*/
