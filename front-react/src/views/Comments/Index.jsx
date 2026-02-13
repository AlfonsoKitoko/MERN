import { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const Index = () => {
	const navigate = useNavigate()
	const [comentarios, setComentarios] = useState([])	// hook para guardar la lista de comentarios

	// Función para obtener todos los comentarios desde el backend
	const getComentarios = async () => {
		const res = await sendRequest('GET', '/comments') // usa la función genérica sendRequest
		if (res.success) setComentarios(res.data)        // si éxito, guardar en el estado
		else alert(res.message)                          // si falla, alert con el error
	}

	// useEffect para ejecutar la petición al renderizar el componente
	useEffect(() => {
		getComentarios()
	}, [])	// [] -> solo se ejecuta una vez al montar el componente

	return (
		<div>
			<h1>Listado de comentarios</h1>
			{/* Botón para navegar a la creación de comentario */}
			<button onClick={() => navigate('/comments/new')}>
				Nuevo Comentario
			</button>

			{/* Tabla con todos los comentarios */}
			<table border="1px">
				<thead>
					<tr>
						<th>ID</th>
						<th>USUARIO</th>
						<th>OPINION</th>
						<th>CATEGORIA</th>
						<th>VALORACIÓN</th>
						<th>OPTIONS</th>
					</tr>
				</thead>
				<tbody>
					{comentarios.map((c) => (
						<tr key={c._id}>
							<td>{c._id}</td>
							<td>{c.usuario}</td>
							<td>{c.opinion}</td>
							<td>{c.categoria.nombre}</td>
							<td>{c.valoracion}</td>
							<td>
								{/* Botón para ir a detalles del comentario */}
								<button onClick={() => navigate(`/comments/${c._id}`)}>Detalles</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div >
	)
}

export default Index
