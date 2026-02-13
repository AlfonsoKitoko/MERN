const mongoose = require("mongoose")

const categoriaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    }
})

const Categoria = mongoose.model("categoria", categoriaSchema)
module.exports = Categoria