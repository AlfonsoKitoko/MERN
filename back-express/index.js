// ===============================
// CONFIGURACIÓN INICIAL
// ===============================

// Carga variables de entorno desde .env
// IMPORTANTE en seguridad: nunca hardcodear claves ni secretos
require("dotenv").config()

// ===============================
// HTTPS (COMUNICACIÓN SEGURA)
// ===============================

// Módulo nativo de Node para crear servidor HTTPS
const https = require("https")

// Permite leer archivos del sistema (certificados SSL)
const fs = require("fs")

// ===============================
// DOCUMENTACIÓN API (Swagger)
// ===============================
const swaggerUI = require("swagger-ui-express")
const specs = require("./swagger/swagger")

// Puerto seguro desde variables de entorno
const port = process.env.PORT || process.env.PUERTO

// ===============================
// EXPRESS (FRAMEWORK BASADO EN MIDDLEWARES)
// ===============================
const express = require("express")
const app = express()

const path = require("path")
const { v4: uuid } = require("uuid")

// Permite usar PUT y DELETE desde formularios HTML
const methodOverride = require("method-override")

// CORS → Control de acceso entre dominios
const cors = require("cors")

// ===============================
// RUTAS DEL PROYECTO
// ===============================
const commentRoutes = require("./routes/comment.routes")
const userRoutes = require("./routes/user.routes")
const commentRoutesCSR = require("./routes/comment.csr.routes")
const tvRoutes = require("./routes/tv.routes")
const catRoutes = require("./routes/categoria.routes")
const filesRoutes = require("./routes/files.routes")

// Versionado de API (buena práctica profesional)
const baseUrlComentarios = `/api/${process.env.API_VERSION}/comentarios`
const baseUrlComentariosCSR = `/api/${process.env.API_VERSION}/comments`
const baseUrlUsers = `/api/${process.env.API_VERSION}/users`
const baseUrlTV = `/api/${process.env.API_VERSION}/tv`
const baseUrlCategorias = `/api/${process.env.API_VERSION}/categorias`
const baseUrlFiles = `/api/${process.env.API_VERSION}/files`

// ===============================
// UTILIDADES DE SEGURIDAD
// ===============================

// Configuración conexión MongoDB
const mongodbConfig = require("./utils/mongodb.config")

// Logger personalizado (log4js)
const logger = require("./utils/logger")

// Middleware Morgan → Accounting (monitorización)
const morganMW = require("./middlewares/morgan.mw")

// Middleware global de control de errores
const errorHandlerMW = require("./middlewares/errorHandler.mw")

// Clase personalizada de errores
const AppError = require("./utils/AppError")

// Permite leer cookies (JWT o SID)
const cookieParser = require("cookie-parser")

// ======================================================
// CONFIGURACIÓN CORS (AAA – AUTORIZACIÓN DE ORIGEN)
// ======================================================

// Lista blanca de dominios permitidos
const whiteList = [
	"https://localhost:5202",
	"https://127.0.0.1:5202",
	"https://localhost:5173",
	"https://127.0.0.1:5173"
]

// Configuración avanzada de CORS
const corsOptions = {
	origin: (origin, callback) => {

		// Si el origen está en whitelist o es petición interna → permitido
		if (whiteList.includes(origin) || !origin) {
			callback(null, true)
		} else {
			// Si no está permitido → error 403
			callback(new AppError("No pasarás!", 403))
		}
	},
	credentials: true // Permite enviar cookies entre backend y frontend
}

// ===============================
// MIDDLEWARES GLOBALES
// ===============================

// Leer cookies del cliente
app.use(cookieParser())

// Aplicar CORS con whitelist
app.use(cors(corsOptions))

// Configuración vistas EJS (SSR)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Archivos estáticos públicos
app.use(express.static(path.join(__dirname, "public")))

// Permitir lectura de datos POST (form)
app.use(express.urlencoded({ extended: true }))

// Permitir lectura JSON
app.use(express.json())

// Permite usar ?_method=PUT o DELETE
app.use(methodOverride("_method"))

// Variables globales accesibles en vistas EJS
// Muy típico de examen: res.locals
app.use((req, res, next) => {
	res.locals.tituloEJS = "API REST"
	res.locals.baseUrlComentarios = baseUrlComentarios
	res.locals.baseUrlTV = baseUrlTV
	next()
})

// ======================================================
// HTTPS – CIFRADO SSL (AAA)
// ======================================================

// Cargar certificado y clave privada
const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, "certs/localhost-2daw-2526.key")),
	cert: fs.readFileSync(path.join(__dirname, "certs/localhost-2daw-2526.crt"))
}

// ======================================================
// ACCOUNTING – MONITORIZACIÓN CON MORGAN
// ======================================================

// Registra cada petición HTTP (método, URL, estado, tiempo)
app.use(morganMW.usingMorgan())

// ======================================================
// DEFINICIÓN DE RUTAS
// ======================================================

// Documentación Swagger
app.use(process.env.SWAGGER_DOCS, swaggerUI.serve, swaggerUI.setup(specs))

// Redirige raíz a comentarios
app.get("/", (req, res) => res.redirect(baseUrlComentarios))

// Rutas REST principales
app.use(baseUrlComentarios, commentRoutes)
app.use(baseUrlComentariosCSR, commentRoutesCSR)
app.use(baseUrlTV, tvRoutes)
app.use(baseUrlCategorias, catRoutes)
app.use(baseUrlUsers, userRoutes)
app.use(baseUrlFiles, filesRoutes)

// ======================================================
// RUTA POR DEFECTO (404)
// ======================================================

// Si ninguna ruta coincide → error personalizado
app.get(/.*/, (req, res) => {
	throw new AppError("Ruta no existente: " + req.originalUrl, 404)
})

// ======================================================
// CONTROL GLOBAL DE ERRORES (AAA)
// ======================================================

// Captura todos los errores síncronos y asíncronos
app.use(errorHandlerMW.errorHandler)

// ======================================================
// LEVANTAR SERVIDOR HTTPS
// ======================================================

// Crear servidor seguro HTTPS
https.createServer(httpsOptions, app).listen(port, async () => {

	console.log(`https://localhost:${port}`)
	logger.access.info(`Servidor Express levantado en https://localhost:${port}`)

	try {

		// Intentar conectar a MongoDB
		await mongodbConfig.conectarMongoDB()
			.then(() => {
				console.log("Conectado con MongoDB!!!")
			})
			.catch((err) => {
				// Si falla conexión → cerrar servidor
				console.log(`Error al conectar con MongoDB. Desc: ${err}`)
				process.exit(0)
			})

	} catch (error) {

		// Si hay error crítico → tumbar servidor
		console.log(`Error al conectar con MongoDB. Desc: ${error}`)
		process.exit(0)
	}
})
