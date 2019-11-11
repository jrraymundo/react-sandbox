import React from 'react'

// Components
import TypeText from './TypeText'
import AddNumber from './AddNumber'
import List from './List'

class Main extends React.Component {

	// States & Props 
		constructor(props) {

			// This 'super(props)' is required to be able to call 'this.props'
			// super() basically calls the parent constructor which is from 'React.Component'
			// If no props are to be used, just 'super()' can suffice
			super(props)

			// All states are together in one object, and props can already be called here
			this.state = {
				inputContent: 'hello',
				numberContent: {
					number1: 1,
					number2: 2,
					number3: props.numberGiven
				}
			}
		}
	//

	// Handlers
		// States are mutated/changed by using this.setState and selecting the property from 'this.state' to be changed

		textInputHandler = (e) => {
			this.setState({inputContent: e.target.value})
		}

		numberHandler = (e) => {
			let newNumber = parseInt(document.querySelector('#theNumber').innerHTML) + 1
			// let newNumber = this.state.numberContent.number3 + 1 // <- Alternative
			this.setState({
				numberContent: {
					...this.state.numberContent,
					number3: newNumber
				}
			})
			// NOTE:
			// Since we only want to reassign a value to number3 of numberContent state, we need to use spread operator for all its original contents FIRST
			// And then assign the new state so that we avoid overwriting all of the properties of that state which we don't intend to touch
		}
	//

	render() {
		return(
			<div>
				{/* Custom props are created to pass down handlers, states, and even props from another parent component */}
				<TypeText 
					greeting={this.props.greeting} 
					inputContent={this.state.inputContent} 
					textInputHandler={this.textInputHandler} 
				/>
				<AddNumber 
					numberHandler={this.numberHandler} 
					numberGiven={this.state.numberContent.number3} 
				/>

				{/* 
					If you dont self-close the component, anything that you put between the opening and closing tag of the component will be sent as props.children 
				*/}
				<List
					numberContent = {this.state.numberContent}
				>
					<p>This p element will be passed as a props.children</p>
				</List>
			</div>
		)
	}
}

export default Main