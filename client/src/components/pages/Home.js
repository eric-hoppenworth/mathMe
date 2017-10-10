import React from 'react';
import { Redirect } from "react-router-dom";
import CardHolder from "../CardHolder";
import CreateQuiz from "../CreateQuiz";

class Home extends React.Component {
	state = {
		activeQuiz: null,
		createQuiz: null
	}

	handleClick = (event) => {
		const opp = event.target.name;

		switch (opp) {
			case "Addition":
				
			case "Subtraction":

			case "Multiplication":

			case "Division":
				//show create quiz 'modal'
				this.setState({
					createQuiz: <CreateQuiz opp= {opp} />
				})
				break;
			case "Current":
				//get quiz marked current
				//show question marked current
				//display question
				//currentQuiz will be a JSX element
				//setState({
				//	activeQuiz: currentQuiz
				//})
				break;
		}
	}

	render(){
		if(this.props.auth.isAuthenticated){
			return (
				<div>
					<div className = "row light-row text-center">
			            <div className = "col infoItem">
			                <h1>Welcome back Mahjongg!</h1>
			                <p>We've missed you.</p>
			                <button className = "btn btn-primary" name= "Current" onClick = { this.handleClick }>Get back to where you left off</button>
			            </div>
			        </div>
			        {this.state.createQuiz}
			        {this.state.currentQuiz}
			       <CardHolder handleClick = {this.handleClick} />
				</div>
			);
		}else{
			return <Redirect to = "/" />
		}
	}
	
};

export default Home;