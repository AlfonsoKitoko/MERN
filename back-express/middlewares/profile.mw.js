const AppError = require("../utils/AppError")

exports.restrictTo = (...profiles) => {
    return (req, res, next) => {
        // req.user.profile viene de JWT (payload)
        if (!profiles.includes(req.user.profile)) {
            return next(new AppError("No tienes permisos", 403))
        }
        next() // tiene permiso
    }
}

/*
✅ AAA:
- Authorization → restringe acceso según rol
- 403 si no tiene permisos
- Ejemplo examen:
router.get("/admin", protect, restrictTo("ADMIN"), controller.fn)
*/
