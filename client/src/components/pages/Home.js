import React from 'react';
import { Redirect } from "react-router-dom";
import CardHolder from "../CardHolder";
import CreateQuiz from "../modals/CreateQuiz";
import QuizSection from "../modals/QuizSection";
import Results from "../modals/Results";
import axios from 'axios';

class Home extends React.Component {
	state = {
		modal: null,
		number: 1,
		difficulty: 1,
		response: "",
		opp: "Addition",
		quiz: null
	}

	handleClick = (event) => {
		event.preventDefault();
		const opp = event.target.name;

		if ( opp === "Current"){
			//get quiz marked current
			//show question marked current
			//display question
			axios.get("/api/currentQuiz").then((response)=>{
				console.log(response);
				this.setState({
					modal: "Quiz",
					quiz: response.data
				});
			}).catch((err)=>console.log(err));
			
		} else {
			this.setState({
				opp: opp,
				modal: "Create"
			});
		}
	}

	handleChange = (event) =>{
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}

	handleCreateSubmit = (event) => {
		event.preventDefault();
		let opp = "";
		switch (this.state.opp){
			case "Addition":
				opp = "+";
				break;
			case "Subtraction":
				opp = "-";
				break;
			case "Multiplication":
				opp = "*";
				break;
			case "Division":
				opp = "/";
				break;
			default:
				opp = "+";
				break;
		}
		const quizData = {
			n: this.state.number ,
			d: this.state.difficulty,
			o: opp
		};
		//fetch a quiz from the API.
		axios.post("/api/getNewQuiz",quizData).then((response)=>{

			//render quiz.
			this.setState({
				modal: "Quiz",
				quiz: response.data
			});
		}).catch((err)=>{ return console.log(err)});
	}
	handleQuizSubmit = (event) =>{
		event.preventDefault();
		//if I am not on the last question, update
		const total = this.state.quiz.latex.length;
		const current = this.state.quiz.doc.currentQuestion + 1;
		
		if(this.state.response === "") return false;
		axios.post("/api/updateQuestion",{response: this.state.response, quizId:this.state.quiz.doc._id})
			.then((response)=>{
				if(current < total){
					this.setState({
						quiz: response.data,
						response: ""
					});
				} else{
					//if I am on the last question, complete the quiz
					axios.post("/api/completeQuiz",{quizId: this.state.quiz.doc._id})
						.then((response)=>{
							this.setState({
								quiz: response.data,
								modal: "Results",
								response: ""
							});
						})
						.catch((err)=> console.log(err));			
				}
			}).catch((err)=>console.log(err));
	}
	handleExit = () =>{
		this.setState({
			modal: null
		});
	}

	render(){
		if(this.props.auth.isAuthenticated){
			return (
				<div>
					<div className = "row light-row text-center">
			            <div className = "col infoItem">
			                <h1>Welcome back {this.props.auth.username}!</h1>
			                <p>We've missed you.</p>
			                <button className = "btn btn-primary" name= "Current" onClick = { this.handleClick }>Get back to where you left off</button>
			            </div>
			        </div>
			        {this.state.modal === "Quiz" ? 
			        	<QuizSection 
			        		handleSubmit={this.handleQuizSubmit} 
			        		handleChange = {this.handleChange} 
			        		inputs={{response:this.state.response}} 
			        		quiz={this.state.quiz} 
			        	/> :
			        	this.state.modal === "Create" ?
				        	<CreateQuiz 
				        		handleSubmit = {this.handleCreateSubmit} 
				        		handleChange = {this.handleChange} 
				        		inputs = {{number:this.state.number,difficulty:this.state.difficulty,opp:this.state.opp}} 
				        	/> : 
				        this.state.modal === "Results" ?
				        	<Results 
				        		quiz = {this.state.quiz}
				        		exit = {this.handleExit}
				        	/> :
				        null
			        }
			       <CardHolder  handleClick = {this.handleClick}  />
				</div>
			);
		}else{
			return <Redirect to = "/" />
		}
	}
	
};

export default Home;