import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { sendRequest } from '../../utils/functions'

const Index = () => {

	const [users, setUsers] = useState([])	// hook

	// JavaScript
	const getUsers = async () => {
		/* try {
			const response = await axios.get("/users")
			console.log(response.data)
			setUsers(response.data)
		} catch (error) {
			console.log(error)
		} */
		const res = await sendRequest('GET', '/users')

		if (res.success) setUsers(res.data)
		else alert(res.message)
	}

	useEffect(() => {
		getUsers()
	}, [])	// Ejecuta, una única vez [], cuando se renderiza el componente

	return (
		<div>
			<h1>Listado de Usuarios</h1>
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