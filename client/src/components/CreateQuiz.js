import React from "react";
import ReactDom from 'react-dom';

class CreateQuiz extends React.Component {
	state = {
		number: 1,
		difficulty: 1,
		opp: this.props.opp
	}

	componentDidMount = () => {
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	componentDidUpdate = () => { 
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	handleChange = (event) =>{
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		//fetch a quiz from the API.

		//render quiz.

		//this might belong up the chain on the "home" component
	}

	render(){
		return(
			<div className = "row light-row text-center create-quiz" >
				<div className = "col infoItem">
					<label> How many Questions? </label> <br />
					<input name = "number" onChange = {this.handleChange} value ={this.state.number} />
				</div>
				<div className = "col infoItem">
					<label> What Difficulty? (Higher level means more digits) </label> <br />
					<input name = "difficulty" onChange = {this.handleChange} value ={this.state.difficulty} />
				</div>
				<div className = "col infoItem">
					<label> What Type of Questions?</label> <br />
					<select name = "opp" onChange = {this.handleChange} value ={this.state.opp}>
						<option value="Addition">Addition</option>
						<option value="Subtraction">Subtraction</option>
						<option value="Multipication">Multipication</option>
						<option value="Division">Division</option>
					</select>
				</div>
				<div className = "col infoItem">
					<button className = "btn btn-primary" onClick = {this.handleSubmit}> Get Quiz </button>
				</div>
			</div>
		);
		
	}
}

export default CreateQuiz;