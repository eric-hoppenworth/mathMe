import React from 'react';
import ReactDom from 'react-dom';
import MathJax from 'react-mathjax-preview';
class QuizSection extends React.Component {
	
	equation = String.raw`$$ \frac{\begin{array}[b]{r}\left. 54 \right. \\ + \left. 5 \right. \end{array} }{ \left.  \right.} $$`

	render(){
		return (
			<div className = "row light-row quiz-row text-center">
				<div className = "col-12">
					<h1>Question 1 of 10 </h1>
				</div>
				<div className = "col mathItem">
					<MathJax math = {this.equation} />
				</div>
				<div className = "col infoItem">
					<input type = "number" />
					<br />
					<br />
					<button className = "btn btn-primary">Submit</button>
				</div>
			</div> 
		);
	}
}

export default QuizSection;