const mongodbConfig = require("../utils/mongodb.config")
const categoriaModel = require("../models/categoria.model")

const ejecutar = async () => {
    try {
        //Una vez levantado el servidor, intentamos conectar con MongoDB
        await mongodbConfig.conectarMongoDB()
        .then(()=>{
            console.log("Conectado con MongoDB!!!")
        })
        .catch((err) => {
            //Si no conectamos con MongoDB, debemos tumbar el server
            console.log(`Error al conectar con MongoDB. Desc: ${err}`)
            //Tumbar el server
            process.exit(0)
        })

    } catch (error) {
            //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar con MongoDB. Desc: ${error}`)
        //Tumbar el server
        process.exit(0)
    }

    const categorias = [
        { nombre: "deportes" },
        { nombre: "moda" },
        { nombre: "política" },
        { nombre: "tecnología" },
        { nombre: "cine" },
    ]

    await categoriaModel.insertMany(categorias)
    .then((res)=>{
        console.log("Categorias insertadas correctamente")
    })
    .catch((err)=>{
        console.log("Error insertando categorias. Desc: " + err)
    })
    .finally(()=>{
        process.exit(0)
    })

}

ejecutar()
