import React from "react";
import QuizCard from "./QuizCard";

class CardHolder extends React.Component {
	render(){
		return (
			<div className = "quizCardContainer">
		        <div className= "row text-center">
		            <div className="col">
		               <h1>Practice a skill</h1> 
		            </div>
		        </div>
		        <div className = "row ">
		            <div className = "col">
		                <QuizCard 
		                	title = {"Addition"} 
		                	text = {"Practice your addition skills"} 
		                	image = {require("../images/add.png")} 
		                	handleClick = {()=>false} 
		                />
		            </div>
		            <div className = "col">
		            	<QuizCard 
		            		title = {"Subtraction"} 
		            		text = {"Practice your subtraction skills"} 
		            		image = {require("../images/minus.png")} 
		            		handleClick = {()=>false} 
		            	/>
		            </div>
		        </div>
		        <div className = "row text-center">
		           <div className = "col">
		                <QuizCard 
		                	title = {"Multiplication"} 
		                	text = {"Practice your multiplication skills"} 
		                	image = {require("../images/mult.png")} 
		                	handleClick = {()=>false} 
		                />
		            </div>
		            <div className = "col">
		                <QuizCard 
		                	title = {"Division"} 
		                	text = {"Practice your division skills"} 
		                	image = {require("../images/divide.png")} 
		                	handleClick = {()=>false} 
		                />
		            </div>
		        </div>
		    </div>
		);
	}
	
}

export default CardHolder;