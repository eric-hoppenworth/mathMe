import React from 'react';
import MathJax from 'react-mathjax-preview';

class Results extends React.Component{
	render(){
		return(
			<div className = "row light-row quiz-row text-center">
				<div className = "col">
					{this.props.quiz.doc.questions.map((item,index)=>{
						return (
							<div className= "row" key ={item._id}>
								<div className = "col-12 infoItem">
									<h2>Question {index + 1} of {this.props.quiz.latex.length}</h2>
								</div>
								<div className = "col-6 mathItem infoItem">
									<MathJax math = {this.props.quiz.latex[index]} />
								</div>
								<div className = "col-3 infoItem">
									<h4>Your Response</h4>
									<p>{item.response}</p>
								</div>
								<div className = "col-3 infoItem">
									<h4>Correct Answer</h4>
									<p>{item.solution}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Results;