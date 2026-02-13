// Middleware para capturar errores asíncronos
// Evita try/catch en cada controlador
exports.wrapAsync = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => {
            next(e) // pasa error al middleware global de errores
        })
    }
}

/*
✅ AAA:
- Control de errores centralizado
- Se usa mucho con async/await
- Ejemplo:
router.get("/", wrapAsync(controller.getAll))
*/
