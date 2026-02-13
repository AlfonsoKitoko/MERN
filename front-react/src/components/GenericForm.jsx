export const GenericForm = ({
	data,
	fields,
	onChange,
	onBack,
	onSave,
	isEditing,
	onEdit
}) => {
	/*
		data:
			[
				{

				}
			]
		fields:
		[
			{ key:"usuario",label:"Usuario",type:"", }
			{ key:"opinion",label:"Opinión:",type:"", }
			{ key:"categoria",label:"Categoría",type:"", }
			{ key:"valoracion",label:"Valoración",type:"", }
		]
	*/

	const handleSubmit = (e) => {
		e.preventDefault()
		onSave()
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{
					fields.map((field) => {
						const {
							key,
							label,
							type = "text",
							options = [],
							optionValue = "",
							optionLabel = ""
						} = field
						return (
							<div key={key}>
								<label>{label} </label>
								{type === "select" ?
									(
										<select
											onChange={(e) => onChange(key, e.target.value)}
											required
											disabled={!isEditing}
											value={
												data[key] ? data[key][optionValue] : ""
											}
										>
											<option value="">-- Selecciona --</option>
											{
												options.map((o) => (
													<option key={o[optionValue]} value={o[optionValue]}>
														{o[optionLabel]}
													</option>
												))
											}
										</select>
									) : (
										<input type='text'
											value={data[key] || ""}
											onChange={(e) => onChange(key, e.target.value)}
											required
											readOnly={!isEditing}
										/>
									)}
							</div>
						)
					})
				}
				{isEditing && (
					<button>Guardar</button>
				)}
				{!isEditing && (
					<button onClick={onEdit}>Editar</button>
				)}
			</form>
			<button onClick={onBack}>Volver</button>
		</div>

	)
}
