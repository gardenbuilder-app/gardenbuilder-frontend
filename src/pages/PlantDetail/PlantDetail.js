function PlantDetail() {
	// show plant currently assigned
	// select type filter
	// select actual variety
	// graphql call to get varieties
	// graphql call to save variety
	// come up with way to denote a variety is saved
	const dropDownOptions = ['All', 'Vegetable', 'Fruit', 'Flower']
	const DropDown = <select>
		{dropDownOptions.map(type => 
			<option value={type}>{type}</option>
		)}
	</select> 
	
	return (
		<>
			<h2>Plant Details</h2>
			<DropDown/>
		</>
	)
}