//const categorias = require("../models/categorias.model.json")
const Categoria = require("../models/categoria.model")

exports.getAll = async () => await Categoria.find()

exports.getById = async (id) => await Categoria.findById(id)

exports.create = async (data) => {
    const cat = new Categoria({ nombre: data.nombre.toLowerCase()})
    //const cat = new Categoria(data)
    return await cat.save()
}

exports.update = async(id, data) => {
    return await Categoria.findByIdAndUpdate(id,data,{new:true})
}

exports.delete = async(id) => {
    return await Categoria.findByIdAndDelete(id)
}



