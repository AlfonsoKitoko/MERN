const tvController = require("../controllers/tv.controller")
const express = require("express")
const router = express.Router()

router.get("/",tvController.showSearchTV)
router.get("/:nombre",tvController.findTvShowByName)

//Exportar rutas
module.exports = router