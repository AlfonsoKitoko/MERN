const catService = require("../services/categoria.service")

exports.getAllCategorias = async(req,res)=>{
    try {
        const categorias = await catService.getAll()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getByIdCategorias = async(req,res)=>{
    try {
        const {id} = req.params
        const categoria = await catService.getById(id)
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.createCategoria = async(req,res)=>{
    try {        
        const categoriaCreada = await catService.create(req.body)
        res.status(200).json(categoriaCreada)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateCategoria = async(req,res)=>{
    try {                
        const categoriaActualizada = await catService.update(req.params.id,req.body)
        res.status(200).json(categoriaActualizada)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteCategoria = async(req,res)=>{
    try {                
        const categoriaEliminada = await catService.delete(req.params.id)
        res.status(200).json(categoriaEliminada)
    } catch (error) {
        res.status(500).json(error)
    }
}