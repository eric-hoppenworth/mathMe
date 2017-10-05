import React from "react";


class SignInForm extends React.Component{
	state ={
		userName: "",
		password: ""
	}

	handleChange = (event) => {
		const {name, value} = event.target;    
	    // Set the state for the appropriate input field
	    this.setState({
	      [name]: value
	    });
	};

	handleSubmit = (event) => {
	    event.preventDefault();
	    
	    //call a sign In function
	    alert(`userName : ${this.state.userName} password ${this.state.password}`)

	    this.setState({
	      userName: "",
	      password: ""
	    }); 
  	};

	render() {
		return (
			<div className = "row signInRow">
				<div className = "col"></div>
				<div className = "col text-center">
					<h1>Sign In</h1>
					<form className = 'signInForm'>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" name ="userName" value ={this.state.userName} placeholder="Enter email" onChange = {this.handleChange} />
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" name = "password" value = {this.state.password} placeholder="Password" onChange = {this.handleChange} />
					  </div>
					  <button onClick = {this.handleSubmit} className="btn btn-primary">Submit</button>
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