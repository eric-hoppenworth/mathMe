import React from "react";
import ReactDom from 'react-dom';

class CreateQuiz extends React.Component {

	componentDidMount = () => {
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	componentDidUpdate = () => { 
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	render(){
		return(
			<div className = "row signInRow" >
				<div className = "col"> </div>
				<div className = "col text-center">
					<form className = "signInForm">
						<div className = "form-group">
							<label> How many Questions? </label> <br />
							<input className = "form-control" name = "number" onChange = {this.props.handleChange} value ={this.props.inputs.number} />
						</div>
						<div className = "form-group">
							<label> What Difficulty? (Higher level means more digits) </label> <br />
							<input className = "form-control" name = "difficulty" onChange = {this.props.handleChange} value ={this.props.inputs.difficulty} />
						</div>
						<div className = "form-group">
							<label> What Type of Questions?</label> <br />
							<select name = "opp" onChange = {this.props.handleChange} value ={this.props.inputs.opp}>
								<option value="Addition">Addition</option>
								<option value="Subtraction">Subtraction</option>
								<option value="Multiplication">Multiplication</option>
								<option value="Division">Division</option>
							</select>
						</div>
						<button className = "btn btn-primary" onClick = {this.props.handleSubmit}> Get Quiz </button>

					</form>
				</div>
				<div className = "col"> </div>
			</div>
		);
		
	}
}

export default CreateQuiz;
