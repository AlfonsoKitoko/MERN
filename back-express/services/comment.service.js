//let comentarios = require("../models/comment.model.json")
const commentModel = require("../models/comment.model")

//Devolver todos los comentarios
exports.getAll = async () => await commentModel.find().populate("categoria","nombre") //SELECT * FROM Comments

//Devolver un comentario por ID
//SELECT * from Comments WHERE _id = id
exports.getById = async (id) => await commentModel.findById(id).populate("categoria","nombre")


exports.getByUser = async (user) => await commentModel.find({usuario:user}).populate("categoria","nombre")


//exports.getByCat = async (cat) => await commentModel.findOne({categoria:cat}) //Obtiene un registro (un objeto de la primera ocurrencia encontrada)
exports.getByCat = async (cat) => await commentModel.find({categoria:cat}).populate("categoria","nombre") //Obtiene un array con todas las ocurrencias

//Crear un nuevo comentario
exports.create = async(datos) => {
    /*datos.id = comentarios.length + 1
    comentarios.push(datos)
    return datos*/    
    const newComment = new commentModel(datos)
    return await newComment.save() //INSERT(SQL) - InsertOne (MongoDB alternativa)
    //.then((datos) => {})
    //.catch((err) => {})
}

//Edita un comentario existente
exports.update = async (id,datos) => {
    /*const comentario = comentarios.find(c => c.id == id)
    if(!comentario){
        return null
    }else{
        comentario.usuario = datos.usuario
        comentario.opinion = datos.opinion        
        return comentario
    }*/
   //UPDATE Comments SET ... WHERE _id = id
   return await commentModel.findByIdAndUpdate(id,datos,{new:true})
}

//Elimina un comentario
exports.remove = async(id) => {
    /*comentarios = comentarios.filter(c => c.id != id)
    return comentarios*/
    //DELETE FROM Comments WHER _id = id
    return await commentModel.findByIdAndDelete(id)
}
