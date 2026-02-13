import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'

const Index = () => {
	const [users, setUsers] = useState([]) // Hook para guardar la lista de usuarios

	// Función para obtener todos los usuarios desde el backend
	const getUsers = async () => {
		const res = await sendRequest('GET', '/users') // Petición GET a /users
		if (res.success) setUsers(res.data)           // Si éxito, guardar en el estado
		else alert(res.message)                       // Si falla, mostrar alert
	}

	// useEffect para ejecutar la petición al montar el componente
	useEffect(() => {
		getUsers()
	}, []) // [] -> solo se ejecuta una vez al renderizar

	return (
		<div>
			<h1>Listado de Usuarios</h1>
			{/* Tabla con todos los usuarios */}
			<table border="1px">
				<thead>
					<tr>
						<th>ID</th>
						<th>USUARIO</th>
						<th>PERFIL</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((u) => (
							<tr key={u._id}>
								<td>{u._id}</td>
								<td>{u.username}</td>
								<td>{u.profile}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default Index
