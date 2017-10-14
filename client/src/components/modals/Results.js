import React from 'react';
import MathJax from 'react-mathjax-preview';

class Results extends React.Component{

	render(){
		let percent;
		percent = parseInt((this.props.quiz.doc.numberCorrect/this.props.quiz.doc.questions.length) * 100,10)
		percent = percent + "%";

		const style = {
			width: percent
		};
		return(
			<div>
				<div className = "row light-row results-row text-center">
					<div className = "col-12">
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
					<div className = "col-12">
						<div className = "row infoItem">
							<div className = "col-2"></div>
							<div className = "col-8" >
								<div className = "row">
									<div className = "col-12 back-bar">
										<div className = "bar" style = {style}> </div>
									</div>
								</div>
								<div className = "row" >
									<div className = "col-12">
										{this.props.quiz.doc.numberCorrect} / {this.props.quiz.doc.questions.length}
									</div>
								</div>
							</div>
							<div className = "col-2"></div>

						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Results;