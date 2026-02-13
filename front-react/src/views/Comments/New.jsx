import { useState } from "react"
import { GenericForm } from "../../components/GenericForm"
import { useNavigate } from "react-router-dom"
import { sendRequest } from "../../utils/functions"

const New = () => {
	const navigate = useNavigate()
	// Plantilla inicial de comentarios
	const [data, setData] = useState({
		usuario: "",
		opinion: "",
		categoria: "",
		valoracion: ""
	})
	const fields = [
		{ key: "usuario", label: "Usuario:" },
		{ key: "opinion", label: "Opinión:" },
		{
			key: "categoria",
			label: "Categoría:",
			type: "select",
			options: categorias,
			optionValue: "_id",
			optionLabel: "nombre"
		},
		{ key: "valoracion", label: "Valoración:" }
	]

	// Actualizar los campos en estado local
	const handleChange = (field, value) => {
		setData((prev) => ({
			...prev,
			[field]: value
		}))
	}

	const handleSave = async () => {
		// console.log(data)
		const res = await sendRequest(
			'POST',
			'/comments',
			data
		)
		if (res.success) navigate('/comments')
		else alert(res.message)
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
				isEditing={true}
			/>
		</div>
	)
}
export default New