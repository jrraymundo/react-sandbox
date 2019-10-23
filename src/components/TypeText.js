import React from 'react'

const TypeText = (props) => {
	return(
		<div>
			<h3>{props.greeting}</h3> {/* Hi this is a prop passed from app.js */}
			<input type="text" defaultValue={props.inputContent} onChange={props.textInputHandler} />
		</div>
	)
}

export default TypeText