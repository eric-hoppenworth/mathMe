import React from 'react';
import MathJax from 'react-mathjax-preview';
import ReactDom from 'react-dom';

class Results extends React.Component{

	componentDidMount = () => {
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	componentDidUpdate = () => { 
		ReactDom.findDOMNode(this).scrollIntoView(); 
	}

	render(){
		let percent;
		percent = parseInt((this.props.quiz.doc.numberCorrect/this.props.quiz.doc.questions.length) * 100,10)
		percent = percent + "%";

		const style = {
			width: percent
		};
		return(
			<div className = "row light-row results-row text-center">
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
				{this.props.quiz.doc.questions.map((item,index)=>{
					return (
						<div className= "col-6 resultItem" key ={item._id}>
							<div className = "row ">
								<div className = "col">
									<h2>Question {index + 1} of {this.props.quiz.latex.length}</h2>
								</div>
							</div>
							<div className = "row mathItem ">
								<div className = "col">
									<MathJax math = {this.props.quiz.latex[index]} />
								</div>
							</div>
							<div className = {"row " + (item.response === item.solution ? "correct" : "incorrect") } >	
								<div className = "col-6 ">
									<h6>Your Response</h6>
									<p>{item.response}</p>
								</div>
								<div className = "col-6 ">
									<h6>Correct Answer</h6>
									<p>{item.solution}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Results;