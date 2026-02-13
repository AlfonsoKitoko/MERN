import { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const Index = () => {

	const navigate = useNavigate()
	const [comentarios, setComentarios] = useState([])	// hook

	// JavaScript
	const getComentarios = async () => {
		/* try {
			const response = await axios.get("/comments")
			console.log(response.data)
			setComentarios(response.data)
		} catch (error) {
			console.log(error)
		} */
		const res = await sendRequest('GET', '/comments')

		if (res.success) setComentarios(res.data)
		else alert(res.message)
	}

	useEffect(() => {
		getComentarios()
	}, [])	// Ejecuta, una única vez [], cuando se renderiza el componente

	return (
		<div>
			<h1>Listado de comentarios</h1>
			<button onClick={() => navigate('/comments/new')}>
				Nuevo Comentario
			</button>
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
					{
						comentarios.map((c) => (
							<tr key={c._id}>
								<td>{c._id}</td>
								<td>{c.usuario}</td>
								<td>{c.opinion}</td>
								<td>{c.categoria.nombre}</td>
								<td>{c.valoracion}</td>
								<td>
									<button onClick={() => navigate(`/comments/${c._id}`)}>Detalles</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div >
	)
}

export default Index