const bcrypt = require("bcryptjs") //npm i bcryptjs

exports.hashPassword = async (cadenaTextoPlano) => {
    return await bcrypt.hash(cadenaTextoPlano, 12)
}

exports.compareLogin = async (cadenaTextoPlano, cadenaCodificada) => {
    console.log("Bcrypt")
    console.log(cadenaCodificada)
    const result = await bcrypt.compare(cadenaTextoPlano, cadenaCodificada)
    if (result) {
        return true
    } else {
        return false
    }
}