// Clase personalizada de error
// Permite crear errores con mensaje y código HTTP
class AppError extends Error {
    constructor(messageParam, statusParam) {
        super() // hereda de Error
        this.message = messageParam  // mensaje descriptivo del error
        this.status = statusParam    // código HTTP (404, 401, 403...)
    }
}

module.exports = AppError

/*
✅ Útil en AAA:
- Permite lanzar errores controlados desde cualquier controlador:
    throw new AppError("No autorizado", 403)
- Luego, el middleware de error global captura y devuelve la respuesta correcta.
*/
