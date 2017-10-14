import React from "react";

class SIgnUpForm extends React.Component{
	
	render() {
		return (
			<div className = "row signInRow">
				<div className = "col"></div>
				<div className = "col text-center">
					<h1>Sign Up</h1>
					
					<form className = 'signInForm'>
						<div className="form-group">
							<label>Nickname</label>
							<input type="text" className="form-control" name ="username" value ={this.props.username} placeholder="MathPro9" onChange = {this.props.handleChange} />
						</div>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" name ="email" value ={this.props.email} placeholder="Enter email" onChange = {this.props.handleChange} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" name = "password" value = {this.props.password} placeholder="Password" onChange = {this.props.handleChange} />
						</div>

						<button name = "signup" onClick = {this.props.handleSubmit} className="btn btn-primary">Submit</button>
					</form>
					<p>Wait, I'm already signed up.</p>
					<button name = "SignIn" onClick = {this.props.modalTrigger} className = "btn btn-secondary">Back to SignIn</button>
				</div>
				<div className = "col"></div>
	         </div>
		);
	}
};


export default SIgnUpForm;