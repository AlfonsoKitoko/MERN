const categorias = require("./categorias.model.json")
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    //_id --> ID UUID (como la PK) - NO es un String. Se genera automáticamente
    usuario:{
        type:String,
        required:true //NOT NULL SQL
    },
    opinion:{
        type:String,
        required:true //NOT NULL SQL        
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoria", //FK - necesario para populate
        required:true        
    },
    valoracion:{
        type:Number,
        required:true,
        min:0,
        max:5
    }
})

//Creamos el MODELO a partir del ESQUEM MONGOOSE
const comment = mongoose.model("comment", commentSchema)

//Exportamos para poderlo usar en el SERVICE
module.exports = comment
