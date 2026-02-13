import { useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate

	// hooks
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async () => {
		/* try {
			const response = await axios.post("/users/login", {
				username: username,
				password: password
			})

			console.log(response.data)
			setComentarios(response.data)
		} catch (error) {
			console.log(error)
		} */
		const res = await sendRequest(
			'POST',
			'/users/login',
			{ username, password },
			'/comments'
		)
		/* if (res.success) {
			alert('Login correcto')
			navigate('/comments')
		}
		else alert(res.message) */
	}

	return (
		<div>
			<h1>Login</h1>
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
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default Login