import React from 'react';

const List = (props) => {

	const listContents = ['uno', 'dos', 'tres']
	
	return(
		<div>
			<ul>
				{
					// Using map to render contents of an array in JSX
					// Map can be done without the 'index' but it is recommended for the 'key'
					listContents.map((value, index) => {
						return <li key={index}>{value}</li>
					})
				}
			</ul>

			{/* props.children brings a <p> element with a string that was sent from its parent */}
			{/* It is called here and renders the element or component that it holds */}
			{props.children}
		</div>
	)
}

export default List