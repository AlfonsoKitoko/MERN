import axios from 'axios'
// import { useNavigate } from 'react-router-dom' // Se podría usar para redirecciones internas en React

/**
 * Función genérica para enviar requests al backend
 * @param {string} method - Método HTTP ('GET', 'POST', 'PATCH', 'DELETE')
 * @param {string} urlEndpoint - URL del endpoint (ej: '/comments')
 * @param {object|null} params - Datos a enviar en body (POST/PATCH)
 * @param {string} redir - URL a la que redirigir tras éxito
 * @returns {object} res - Resultado { success, status, data, message }
 */
export const sendRequest = async (method, urlEndpoint, params = null, redir = '') => {

	// Objeto resultado por defecto
	let res = {
		success: false,   // si la request fue exitosa
		status: null,     // código HTTP
		data: null,       // datos devueltos por backend
		message: ""       // mensaje de error o éxito
	}

	try {
		// Hacer la petición con axios
		const response = await axios({
			method: method,         // GET, POST, etc.
			url: urlEndpoint,       // ruta del backend
			data: params            // datos a enviar
		})

		console.log(response.data) // Log de depuración

		// Si todo OK
		res.success = true
		res.status = 200
		res.data = response.data
		res.message = "Operación exitosa"

		// Redirigir si se indicó una URL
		// if (redir != '') navigate(redir) // si se usa useNavigate en React Router
		if (redir != '') window.location.href = redir

	} catch (error) {
		// En caso de error
		console.log(error)
		res.status = error.response && error.response.status ? error.response.status : 500
		res.data = error.response && error.response.status ? error.response.status : null
		res.message = error.message ? error.message : "Error de servidor"
	}

	return res // devolver resultado estandarizado
}
