import { useState } from "react"
import { GenericForm } from "../../components/GenericForm"
import { useNavigate } from "react-router-dom"
import { sendRequest } from "../../utils/functions"

const New = () => {
	const navigate = useNavigate()

	// Estado local para el formulario
	const [data, setData] = useState({
		usuario: "",
		opinion: "",
		categoria: "",
		valoracion: ""
	})

	// Campos que pasaremos a GenericForm
	const fields = [
		{ key: "usuario", label: "Usuario:" },
		{ key: "opinion", label: "Opinión:" },
		{
			key: "categoria",
			label: "Categoría:",
			type: "select",
			options: categorias,      // viene del store de categorías
			optionValue: "_id",
			optionLabel: "nombre"
		},
		{ key: "valoracion", label: "Valoración:" }
	]

	// Actualizar estado al cambiar inputs
	const handleChange = (field, value) => {
		setData((prev) => ({ ...prev, [field]: value }))
	}

	// Guardar el comentario -> POST al backend
	const handleSave = async () => {
		const res = await sendRequest('POST', '/comments', data)
		if (res.success) navigate('/comments') // volver al listado
		else alert(res.message)               // mostrar error si falla
	}

	return (
		<div>
			<h1>Nuevo Comentario</h1>
			<GenericForm
				data={data}
				fields={fields}
				onChange={handleChange}
				onBack={() => navigate("/comments")}
				onSave={handleSave}
				isEditing={true} // formulario editable
			/>
		</div>
	)
}
export default New
