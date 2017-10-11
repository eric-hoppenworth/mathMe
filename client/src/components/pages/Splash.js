import React from "react";
import SignInForm from "../SignInForm";
import InfoRow from "../InfoRow";
import { Redirect } from "react-router-dom";

class Splash extends React.Component {
	myInfo = [{
		alt: "Math Problem",
		image: "http://www.gmatfree.com/MR-2014/image004.png",
		text: "MathMe helps students by providing extra practice for basic arithmatic at varrying levels of complexity."
	},{
		alt: "Multiplication Table",
		image: "https://i.pinimg.com/736x/34/f8/c7/34f8c7a5b0e448bae971ef42f7eb442a--multiplication-tables-times-tables.jpg",
		text: "MathMe also provides tools to aid in basic rote memorization.  This includes not only basic addition and multiplication tables, but also their inverses: subtraction and division."
	}];

	render() {
		if(!this.props.auth.isAuthenticated){
			return (
				<div>
					<SignInForm 
						userName = {this.props.inputs.userName} 
						password = {this.props.inputs.password} 
						handleChange = {this.props.handleChange} 
						handleSubmit = {this.props.handleSubmit} />
					<InfoRow light = {true} info = {this.myInfo} />
				</div>
			)
		} else {
			return (
				<Redirect to = "/home" />
			)
		}

	}
	

}

export default Splash;