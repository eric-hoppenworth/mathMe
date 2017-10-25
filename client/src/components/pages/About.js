import React from 'react';
import { Link } from "react-router-dom";

class About extends React.Component {

	render(){
		return (
			<div>
				<div className = "with-border">
					<div className = "row light-row ">
						<div style={{padding: '15px'}} className = "col-12">
							<h1> Eric Hoppenworth </h1>
						</div>
					</div>
					<div className = "row light-row ">
						<div className = "col">
							<img style={ { padding: '50px' } } className="img-fluid" src={require("../../images/profile.JPG")} alt="Eric Hoppenworth"/>
						</div>
						<div className = "col">
							<p>Eric is a private tutor in the Orlando area who saw a lack of basic math skills in many students.  Luckily, he is also a full-stack web developer.  He created MathMe as an easy-to-use tool for instructors or parents. </p>
							<p>Eric spends most of his time working in the garden or cooking delicious food.  He is always coding, and you can find his GitHub here:<Link to="https://github.com/eric-hoppenworth"> https://github.com/eric-hoppenworth</Link> </p>
						</div>
					</div>
				</div>
				<div className = "with-border">
					<div className = "row light-row ">
						<div style={{padding: '15px'}} className = "col-12">
							<h1> Djada Mahjongg </h1>
						</div>
					</div>
					<div className = "row light-row ">
						<div className = "col">
							<img style={ { padding: '50px' } } className="img-fluid" src={require("../../images/mult.png")} alt="Eric Hoppenworth"/>
						</div>
						<div className = "col">
							<p>Little is known about Djada Mahjongg.  Djada sometimes appears suddenly and writes amazing code.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default About;