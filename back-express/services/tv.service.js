const axios = require("axios")

const URL = process.env.URL_TV_MAZE

exports.getByName = async (nombre) => {
  try {
    const respuesta = await axios.get(URL + nombre)
    return respuesta.data
  } catch (error) {
    return { error: error.message }
  }
}


/*
//Opción 2 --> Manteniendo el THEN - CATCH

exports.getByName = (nombre) => {
  return axios.get(url + nombre)
    .then(respuesta => respuesta.data)
    .catch(error => ({ error: error.message }))
}

*/