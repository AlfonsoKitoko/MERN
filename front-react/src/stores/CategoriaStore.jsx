import { create } from 'zustand/react'
import { sendRequest } from '../utils/functions'


const useCategoriaStore = create((set) => ({
	categorias: [],
	cargarCategorias: async () => {
		const res = await sendRequest('GET', '/categorias')
		console.log(`Categorías: ${res.data}`)
		if (res.success) set({ categorias: res.data })
	}
}))

export default useCategoriaStore