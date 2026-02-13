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
	// Javascript
	// hooks
	const cargarCategorias = useCategoriaStore(state => state.cargarCategorias)

	useEffect(() => { cargarCategorias() }, [])
	// HTML "tuneado"
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/users' element={<IndexUsers />} />
				<Route path='/comments' element={<IndexComments />} />
				<Route path='/comments/new' element={<NewComment />} />
				<Route path='/comments/:id' element={<ShowComment />} />
				<Route path='*' element={<Login />} />
			</Routes>
		</BrowserRouter >
	)
}

export default App
