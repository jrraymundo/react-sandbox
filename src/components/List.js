import React from 'react';

const List = (props) => {

	console.log(props)
	const listContents = ['uno', 'dos', 'tres']
	let theNumberContents = []

	for(let key in props.numberContent) {
		theNumberContents.push(props.numberContent[key])
	}
	
	console.log(theNumberContents)

	return(
		<div>
			<p>UnoDosTres:</p>
			<ul>
				{
					// Using map to render contents of an array in JSX
					// Map can be done without the 'index' but it is recommended for the 'key'
					listContents.map((value, index) => {
						return <li key={index}>{value}</li>
					})
				}
			</ul>

			<p>numberContentProps:</p>
			<ul>
				{
					theNumberContents.map((value, index) => <li key={index}>{value}</li>)
				}
			</ul>

			{/* props.children brings a <p> element with a string that was sent from its parent */}
			{/* It is called here and renders the element or component that it holds */}
			{props.children}
		</div>
	)
}

export default List