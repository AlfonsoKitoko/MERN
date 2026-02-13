import { create } from 'zustand/react'
import { sendRequest } from '../utils/functions'

const useCategoriaStore = create((set) => ({
	categorias: [], // Estado global de categorías

	// Función para cargar categorías desde backend
	cargarCategorias: async () => {
		const res = await sendRequest('GET', '/categorias')
		console.log(`Categorías: ${res.data}`)
		if (res.success) set({ categorias: res.data }) // Guardar en store
	}
}))

export default useCategoriaStore
