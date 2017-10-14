import React from 'react';
// import ReactDom from 'react-dom';
import MathJax from 'react-mathjax-preview';
class QuizSection extends React.Component {
	
	equation = String.raw`$$ \frac{\begin{array}[b]{r}\left. 54 \right. \\ + \left. 5 \right. \end{array} }{ \left.  \right.} $$`
	
	render(){
		const questionNumber = this.props.quiz.doc.currentQuestion + 1;
		const totalQuestions = this.props.quiz.latex.length;
		const equation = this.props.quiz.latex[questionNumber-1];
		return (
			<div className = "row light-row quiz-row text-center">
				<div className = "col-12">
					<h1>Question {questionNumber} of {totalQuestions} </h1>
				</div>
				<div className = "col mathItem">
					<MathJax math = {equation} />
				</div>
				<div className = "col infoItem">
					<form>
						<input onChange={this.props.handleChange} type = "number" name="response" value={this.props.inputs.response} />
						<button onClick = {this.props.handleSubmit} className = "btn btn-primary">Submit</button>
					</form>
				</div>
			</div> 
		);
	}
}

export default QuizSection;