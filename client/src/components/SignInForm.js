import React from "react";


class SignInForm extends React.Component{
	
	render() {
		return (
			<div className = "row signInRow">
				<div className = "col"></div>
				<div className = "col text-center">
					<h1>Sign In</h1>
					<form className = 'signInForm'>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" name ="userName" value ={this.props.userName} placeholder="Enter email" onChange = {this.props.handleChange} />
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" name = "password" value = {this.props.password} placeholder="Password" onChange = {this.props.handleChange} />
					  </div>
					  <button onClick = {this.props.handleSubmit} className="btn btn-primary">Submit</button>
					</form>
					<p>Not a member?  No worries.</p>
					<button className = "btn btn-secondary">Sign Up Here.</button>
				</div>
				<div className = "col"></div>
	         </div>
		);
	}
};


export default SignInForm;