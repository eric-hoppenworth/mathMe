import React from "react";

class Features extends React.Component {

	render () {
		return (
			<div className = "">
				<div className= "row light-row text-center with-border" >
					<div className = "col-12 margins">
						<h1> We have a public API! </h1>
						<h4>MathMe has a public api that can be used to retrieve math problems. </h4>
						<h4>There are three options that can be used when a request is made: </h4>
					</div>
				</div>
				<div className= "row light-row text-center with-border" >
					<div className = "col-6">
						<h3> Number of problems-</h3>
						<p><code> n: Integer </code></p>
						<p>Specify the number of problems you want in your set.  The maximum is 50.</p>
					</div>
					<div className = "col-6">
						<h3> Difficulty level-</h3>
						<p><code> d: Integer </code></p>
						<p>Specify the number of digits of the opperands.  Maximum for addition and subtraction is 15.  Maximum for multiplication and division is 8.</p>
					</div>
					<div className = "col-6">
						<h3> Opperation-</h3>
						<p><code> o: String </code></p>
						<p>Specify the opperation you want for your problems.  There are four options: add, subtract, multiply, divide.</p>
					</div>
				</div>
				<div className="row light-row text-center with-border">
					<div className="col-12 margins">
						<p>The requests can be made to the public API endpoint: </p>
						<code> https://fierce-headland-61952.herokuapp.com/public/api/quiz?</code>
						<br/>
						<br />
						<p>The following example request would fetch 10 2-digit addition problems:</p>
						<p>Request:</p>
						<code> https://fierce-headland-61952.herokuapp.com/public/api/quiz?n=10&d=2&o=add</code>
					</div>

				</div>
			</div>
		);	
	}
	
};

export default Features;