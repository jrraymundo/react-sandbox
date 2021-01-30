import React from 'react'

const AddNumber = (props) => {
	return(
		<div>
			<p id='theNumber'>{props.numberGiven}</p>
			<button onClick={props.numberHandler}>Click me to add 1 to the number</button>
		</div>
	)
}

export default AddNumber 