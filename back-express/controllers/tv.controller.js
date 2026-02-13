const TvService = require("../services/tv.service")

exports.findTvShowByName = async (req,res) => {
    const { nombre } = req.params
    try {
        const tvshows = await TvService.getByName(nombre)
        res.locals.tituloEJS = "Películas y Series"
        res.render("tvshows.ejs", { tvshows });        
        //res.json(tvShows)
    } catch (error) {
        res.status(500).json(error)
    }    
}


exports.showSearchTV = (req,res)=>{
    res.render("tvshowsSearch.ejs")
}