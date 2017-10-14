import React from "react";
import InfoStat from "../InfoStat";
import axios from "axios";
import { Redirect } from "react-router-dom";


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
		}
	};

	componentWillMount(){
		axios.post("/api/getScores").then((response)=>{
			this.setState({scores: response.data})
			console.log(this.state)
		});
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
				</div>
			);
		} else {
			return( <Redirect to="/" /> );
		}
		
	}
}

export default Statistics;