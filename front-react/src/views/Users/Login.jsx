import { useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate() // Hook para navegar tras login

	// Hooks para guardar inputs de username y password
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	// Función para iniciar sesión
	const handleLogin = async () => {
		// POST a /users/login enviando username y password
		const res = await sendRequest(
			'POST',
			'/users/login',
			{ username, password },
			'/comments' // Redirige a /comments si login correcto
		)
		// Nota: sendRequest maneja redirección automática si res.success
	}

	return (
		<div>
			<h1>Login</h1>
			{/* Inputs de usuario */}
			<input
				type="text"
				placeholder='Username...'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder='Password...'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{/* Botón para enviar login */}
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default Login
