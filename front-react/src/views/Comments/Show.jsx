import { useEffect, useState } from "react"
import { GenericForm } from "../../components/GenericForm"
import { useNavigate, useParams } from "react-router-dom"
import { sendRequest } from "../../utils/functions"
import { useCategoriaStore } from "../../stores/CategoriaStore"

const Show = () => {

	const { id } = useParams()
	const navigate = useNavigate()
	const categorias = useCategoriaStore(state => state.categorias)
	const [isEditing, setIsEditing] = useState(false)

	// Plantilla inicial de comentarios
	const [data, setData] = useState({
		usuario: "",
		opinion: "",
		categoria: "",
		valoracion: ""
	})
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
			'PATCH',
			`/comments/${id}`,
			data
		)
		if (res.success) navigate('/comments')
		else alert(res.message)
	}

	const getComment = async () => {
		// console.log(data)
		const res = await sendRequest(
			'GET',
			`/comments/${id}`
		)
		if (res.success) setData(res.data)
		else alert(res.message)
	}

	useEffect(() => {
		getComment()
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
				isEditing={isEditing}
				onEdit={() => setIsEditing(true)}
			/>
		</div>
	)
}
export default Show