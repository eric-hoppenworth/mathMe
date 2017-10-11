import React from 'react';
import { Redirect } from "react-router-dom";
import CardHolder from "../CardHolder";
import CreateQuiz from "../CreateQuiz";
import QuizSection from "../QuizSection";

class Home extends React.Component {
	state = {
		activeModal: null
	}

	handleClick = (event) => {
		const opp = event.target.name;

		if ( opp === "Current"){
			//get quiz marked current
			//show question marked current
			//display question
			//currentQuiz will be a JSX element
			this.setState({
				activeModal: <QuizSection />
			});
		} else {
			this.setState({
				activeModal: <CreateQuiz opp= {opp} />
			});
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
			        {this.state.activeModal}
			       <CardHolder handleClick = {this.handleClick} />
				</div>
			);
		}else{
			return <Redirect to = "/" />
		}
	}
	
};

export default Home;