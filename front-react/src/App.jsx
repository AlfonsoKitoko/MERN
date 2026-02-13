import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import IndexComments from './views/Comments/Index'
import IndexUsers from './views/Users/Index'
import Login from './views/Users/Login'
import NewComment from './views/Comments/New'
import ShowComment from './views/Comments/Show'
import useCategoriaStore from './stores/CategoriaStore'
import { useEffect } from 'react'

function App() {
	// Hook para cargar categorías al iniciar la app
	const cargarCategorias = useCategoriaStore(state => state.cargarCategorias)

	useEffect(() => { cargarCategorias() }, []) // Cargar categorías al montar la app

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />            {/* Página de login */}
				<Route path='/users' element={<IndexUsers />} />  {/* Listado de usuarios */}
				<Route path='/comments' element={<IndexComments />} /> {/* Listado de comentarios */}
				<Route path='/comments/new' element={<NewComment />} /> {/* Crear comentario */}
				<Route path='/comments/:id' element={<ShowComment />} /> {/* Mostrar comentario */}
				<Route path='*' element={<Login />} />            {/* Ruta fallback */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
