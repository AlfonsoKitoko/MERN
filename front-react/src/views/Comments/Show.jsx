import { useEffect, useState } from "react"
import { GenericForm } from "../../components/GenericForm"
import { useNavigate, useParams } from "react-router-dom"
import { sendRequest } from "../../utils/functions"
import { useCategoriaStore } from "../../stores/CategoriaStore"

const Show = () => {
	const { id } = useParams()                // Obtener ID de la URL
	const navigate = useNavigate()
	const categorias = useCategoriaStore(state => state.categorias) // store de categorías
	const [isEditing, setIsEditing] = useState(false)

	// Estado local para el formulario
	const [data, setData] = useState({
		usuario: "",
		opinion: "",
		categoria: "",
		valoracion: ""
	})

	// Campos que pasaremos a GenericForm
	const fields = [
		{ key: "usuario", label: "Usuario:", type: "text" },
		{ key: "opinion", label: "Opinión:", type: "text" },
		{
			key: "categoria",
			label: "Categoría:",
			type: "select",
			options: categorias,
			optionValue: "_id",
			optionLabel: "nombre"
		},
		{ key: "valoracion", label: "Valoración:", type: "number" }
	]

	// Actualizar estado al cambiar inputs
	const handleChange = (field, value) => {
		setData((prev) => ({ ...prev, [field]: value }))
	}

	// Guardar cambios -> PATCH al backend
	const handleSave = async () => {
		const res = await sendRequest('PATCH', `/comments/${id}`, data)
		if (res.success) navigate('/comments')
		else alert(res.message)
	}

	// Traer comentario desde el backend
	const getComment = async () => {
		const res = await sendRequest('GET', `/comments/${id}`)
		if (res.success) setData(res.data)
		else alert(res.message)
	}

	useEffect(() => {
		getComment() // obtener datos al montar componente
	}, [])

	return (
		<div>
			<h1>Detalles Comentario</h1>
			<h5>ID:({id})</h5>
			<GenericForm
				data={data}
				fields={fields}
				onBack={() => navigate("/comments")}
				onSave={handleSave}
				isEditing={isEditing}     // editable solo si clicas Editar
				onEdit={() => setIsEditing(true)} // activar edición
			/>
		</div>
	)
}
export default Show
