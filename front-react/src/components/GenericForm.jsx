export const GenericForm = ({
	data,      // Valores actuales del formulario
	fields,    // Definición de campos [{ key, label, type, options, ... }]
	onChange,  // Función para actualizar valores
	onBack,    // Función para volver atrás
	onSave,    // Función para guardar formulario
	isEditing, // Controla si los campos son editables
	onEdit     // Función para activar modo edición
}) => {

	const handleSubmit = (e) => {
		e.preventDefault() // Evitar recarga
		onSave()           // Llamar a guardar
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{fields.map((field) => {
					const { key, label, type = "text", options = [], optionValue = "", optionLabel = "" } = field
					return (
						<div key={key}>
							<label>{label} </label>

							{type === "select" ? (
								<select
									onChange={(e) => onChange(key, e.target.value)}
									required
									disabled={!isEditing}   // Editable solo si isEditing = true
									value={data[key] ? data[key][optionValue] : ""}
								>
									<option value="">-- Selecciona --</option>
									{options.map((o) => (
										<option key={o[optionValue]} value={o[optionValue]}>
											{o[optionLabel]}
										</option>
									))}
								</select>
							) : (
								<input
									type='text'
									value={data[key] || ""}
									onChange={(e) => onChange(key, e.target.value)}
									required
									readOnly={!isEditing}   // Solo editable si isEditing = true
								/>
							)}
						</div>
					)
				})}

				{isEditing && <button>Guardar</button>}
				{!isEditing && <button onClick={onEdit}>Editar</button>}
			</form>

			<button onClick={onBack}>Volver</button>
		</div>
	)
}
