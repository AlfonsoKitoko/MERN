const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: ID único del comentario, generado automáticamente
 *         usuario:
 *           type: string
 *           description: Nombre del usuario que deja el comentario
 *           example: "Juan Pérez"
 *         opinion:
 *           type: string
 *           description: Opinión del usuario
 *           example: "Muy buen producto"
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         valoracion:
 *           type: number
 *           description: Valoración del comentario (0-5)
 *           minimum: 0
 *           maximum: 5
 *           example: 4
 *       required:
 *         - usuario
 *         - opinion
 *         - categoria
 *         - valoracion
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: "Comentario no encontrado"
 *         details:
 *           type: string
 *           nullable: true
 *           example: "El ID proporcionado no existe en la base de datos"
 * 
 *     Categoria:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: ID único de la categoría
 *           example: "64d2f3b1f1e2c2a1b2c3d4e5"
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *           example: "tecnología"
 *       required:
 *         - nombre
 */


//Listar
/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Obtener todos los comentarios
 *     description: Devuelve un listado de todos los comentarios registrados en la base de datos, incluyendo la información de la categoría asociada.
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               example1:
 *                 summary: Lista de comentarios con populate de categoría
 *                 value:
 *                   - _id: "64f1a2b3c4d5e6f7890a1234"
 *                     usuario: "Juan Pérez"
 *                     opinion: "Excelente producto"
 *                     categoria:
 *                       _id: "64f1a2b3c4d5e6f7890b5678"
 *                       nombre: "tecnología"
 *                     valoracion: 5
 *                   - _id: "64f1a2b3c4d5e6f7890a5678"
 *                     usuario: "María López"
 *                     opinion: "Podría mejorar"
 *                     categoria:
 *                       _id: "64f1a2b3c4d5e6f7890b1234"
 *                       nombre: "hogar"
 *                     valoracion: 3
 *       404:
 *         description: No se encontraron comentarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: 404
 *               message: "Comentario no encontrado"
 *               details: "No hay comentarios registrados en la base de datos"
 */
router.get("/",commentController.getAllComments)


//Mostrar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Obtener un comentario por su ID
 *     description: Devuelve un comentario específico, incluyendo la información de su categoría.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Comentario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: 404
 *               message: "Comentario no encontrado"
 *               details: "El ID proporcionado no existe en la base de datos"
 */
router.get("/:id",commentController.getCommentById)


//Crear
/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     description: Permite crear un comentario. Se debe enviar la información de usuario, opinión, categoría y valoración.
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "Juan Pérez"
 *               opinion:
 *                 type: string
 *                 example: "Excelente producto"
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría
 *                 example: "64f1a2b3c4d5e6f7890b5678"
 *               valoracion:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 5
 *             required:
 *               - usuario
 *               - opinion
 *               - categoria
 *               - valoracion
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: 404
 *               message: "Categoría no encontrada"
 *               details: "El ID de categoría proporcionado no existe"
 */
router.post("/",commentController.newComment)


//Editar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   patch:
 *     summary: Editar un comentario existente
 *     description: Permite modificar un comentario existente. Se puede actualizar usuario, opinión, categoría o valoración.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a modificar
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "Juan Pérez"
 *               opinion:
 *                 type: string
 *                 example: "Producto actualizado"
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría
 *                 example: "64f1a2b3c4d5e6f7890b5678"
 *               valoracion:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario o categoría no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: 404
 *               message: "Comentario no encontrado"
 *               details: "El ID proporcionado no existe en la base de datos"
 */
router.patch("/:id",commentController.editCommentById)


//Eliminar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     description: Permite eliminar un comentario existente por su ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comentario eliminado correctamente"
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: 404
 *               message: "Comentario no encontrado"
 *               details: "El ID proporcionado no existe en la base de datos"
 */
router.delete("/:id",commentController.deleteCommentById)

//Exportar rutas
module.exports = router