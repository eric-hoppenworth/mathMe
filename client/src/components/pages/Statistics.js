import React from "react";
import InfoStat from "../InfoStat";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Results from "../modals/Results.js";


class Statistics extends React.Component {
	state = {
		scores: {
			"+":{
				correct: 0,
				total: 0
			},
			"-":{
				correct: 0,
				total: 0
			},
			"*":{
				correct: 0,
				total: 0
			},
			"/":{
				correct: 0,
				total: 0
			}
		},
		previousQuizzes:[]
	};

	componentWillMount(){
		axios.post("/api/getScores").then((response)=>{
			this.setState({scores: response.data})
			console.log(this.state)
		});
	}

	fetchQuiz = (event) => {
		const opp = event.target.value;
		 if (opp === "all"){
		 	//get previous quizzes
		 	axios.get("/api/getPrevious").then((response)=>{
		 		const previousQuizzes = [];
		 		for(let i = 0 ; i < response.data.doc.length ; i++){
		 			previousQuizzes.push({
		 				doc: response.data.doc[i],
		 				latex: response.data.latex[i]
		 			})
		 		}
		 		this.setState({
		 			previousQuizzes
		 		});
		 	});
		 } else {
		 	//get quizzes
		 	axios.post("/api/getPreviousOpp",{opp}).then((response)=>{
		 		const previousQuizzes = [];
		 		for(let i = 0 ; i < response.data.doc.length ; i++){
		 			previousQuizzes.push({
		 				doc: response.data.doc[i],
		 				latex: response.data.latex[i]
		 			})
		 		}
		 		this.setState({
		 			previousQuizzes
		 		});
		 	});
		 }
	}

	render() {
		if(this.props.auth.isAuthenticated){
			return(
				<div>
					<div className = "row light-row text-center">
			            <div className = "col infoItem">
			                <h1>Looks like you're doing great, {this.props.auth.username}!</h1>
			            </div>
			        </div>
			        <div className = "row light-row text-center">
			        	<div className = "col">
				            <div className = "row">
			                	<InfoStat title={"Addition"} correct={this.state.scores["+"].correct} total = {this.state.scores["+"].total} />
			                	<InfoStat title={"Subtraction"} correct={this.state.scores["-"].correct} total = {this.state.scores["-"].total} />
			                </div>
			                <div className = "row">
			                	<InfoStat title={"Multiplication"} correct={this.state.scores["*"].correct} total = {this.state.scores["*"].total} />
			                	<InfoStat title={"Division"} correct={this.state.scores["/"].correct} total = {this.state.scores["/"].total} />
			                </div>
		                </div>
			        </div>
			        <div className = "row light-row text-center">
			            <div className = "col infoItem">
			        		<h2>Review your previous quizzes</h2>
			            </div>
			        </div>
			        <div className = "row text-center">
			            <div className = "col infoItem">
			        		<button className="btn btn-primary" value="all" onClick={this.fetchQuiz}>Last 5 </button>
			            </div>
			            <div className = "col infoItem">
			        		<button className="btn btn-primary" value="+" onClick={this.fetchQuiz}>Addition </button>
			            </div>
			            <div className = "col infoItem">
			        		<button className="btn btn-primary" value="-" onClick={this.fetchQuiz}>Subtraction </button>
			            </div>
			            <div className = "col infoItem">
			        		<button className="btn btn-primary" value="*" onClick={this.fetchQuiz}>Multiplication </button>
			            </div>
			            <div className = "col infoItem">
			        		<button className="btn btn-primary" value="/" onClick={this.fetchQuiz}>Division </button>
			            </div>
			        </div>
			        { this.state.previousQuizzes[0] ?
			        	this.state.previousQuizzes.map((item, index)=>{
			        		return <Results snap={false} quiz={item} />
			        	}) :
			        	null
			        }
				</div>
			);
		} else {
			return( <Redirect to="/" /> );
		}
		
	}
}

export default Statistics;