const bcrypt = require("bcryptjs") // npm i bcryptjs

// HASH DE PASSWORDS
exports.hashPassword = async (cadenaTextoPlano) => {
    // 12 rondas de sal → seguro y recomendado para exámenes
    return await bcrypt.hash(cadenaTextoPlano, 12)
}

// COMPARACIÓN PASSWORD LOGIN
exports.compareLogin = async (cadenaTextoPlano, cadenaCodificada) => {
    console.log("Bcrypt")
    console.log(cadenaCodificada)
    // bcrypt compara texto plano con hash guardado en DB
    const result = await bcrypt.compare(cadenaTextoPlano, cadenaCodificada)
    if (result) {
        return true
    } else {
        return false
    }
}

/*
✅ AAA:
- Authentication → comparar password en login
- Seguridad → nunca guardar texto plano en BD
*/
