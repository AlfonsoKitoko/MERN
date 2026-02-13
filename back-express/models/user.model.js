const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false //JWT: No seleccionar (no entran dentro de los find)
        },
        profile:{
            type:String,
            required:true,
            enum:["ADMIN","USER"],
            default:"USER"
        }
    },
    {
        versionKey: false, //eliminamos __v
        timestamps: true //createdAt y updatedAt automáticos
    }
)

const user = mongoose.model("user",userSchema)

module.exports = user