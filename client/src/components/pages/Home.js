import React from 'react';
import { Redirect } from "react-router-dom";
import CardHolder from "../CardHolder";

class Home extends React.Component {

	render(){
		if(this.props.auth.isAuthenticated){
			return (
				<div>
					<div className = "row light-row text-center">
			            <div className = "col infoItem">
			                <h1>Welcome back Mahjongg!</h1>
			                <p>We've missed you.</p>
			                <button className = "btn btn-primary"data-toggle="modal" data-target="#myQuiz">Get back to where you left off</button>
			            </div>
			        </div>
			        
			       <CardHolder />
				</div>
			);
		}else{
			return <Redirect to = "/" />
		}
	}
	
};

export default Home;