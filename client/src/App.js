import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Splash from "./components/pages/Splash";
import Home from "./components/pages/Home";
import Features from "./components/pages/Features";
import About from "./components/pages/About";
import Statistics from "./components/pages/Statistics";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import axios from 'axios';

class App extends React.Component {
	//this component asks the API to check for authentication before rendering
	state = {
		email: "",
		password: "",
		username: "",
		auth: {
			userId:"",
			username:"",
			isAuthenticated:false
		}
	};

	componentWillMount(){
	    axios.get("/auth/isAuthenticated").then((result)=>{
	    	const {userId, isAuthenticated,username} = result.data
	        this.setState({
	        	auth:{
	        		userId,
	        		isAuthenticated,
	        		username
	        	}
	        });
	    });
	}

	handleChange = (event) => {
	    const {name, value} = event.target;    
	      // Set the state for the appropriate input field
		this.setState({
	        [name]: value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		//call a sign In function
		const newUser = {
			email: this.state.email,
			password: this.state.password,
			username: this.state.username
		};
		const authPath = "/auth/" + event.target.name;
		axios.post(authPath, newUser).then((data) => {
			if (data.data.isAuthenticated){
		  		const {userId, isAuthenticated,username} = data.data
		        this.setState({
		        	auth:{
		        		userId,
		        		isAuthenticated,
		        		username
		        	}
		        });
			}
		});

		this.setState({
			email: "",
			password: "",
			username: ""
		}); 
    }

	handleLogout = (event) => {
	    event.preventDefault();
	    axios.get("/auth/logout").then((result)=>{
	    	this.setState({
	    		auth:{
	    			userId: "",
		    		username: "",
		      		isAuthenticated: false
	    		}
	      	});
	      	return <Redirect to = "/" />
	    })
	};

	render() {
		return (
			<Router>
				<div className = "container-fluid">
					<Navbar isAuthenticated = {this.state.auth.isAuthenticated} handleLogout ={this.handleLogout} />
					<Switch>
						<Route exact path = "/" render = { () => 
							<Splash 
								auth = {this.state.auth}
								inputs = {{
									email: this.state.email,
									password: this.state.password,
									username: this.state.username
								}}
								handleChange = {this.handleChange}
								handleSubmit = {this.handleSubmit}
							/>} 
						/>
						<Route exact path = "/home" render = { () =>
							<Home
								auth = {this.state.auth}
							/>} 
						/>
						<Route exact path = "/statistics" render ={ () =>
							<Statistics 
								auth = {this.state.auth}
							/>}
						/>
						<Route exact path = "/features" render = {()=><Features/>} />
						<Route exact path = "/about" render = {()=><About/>} />
					</Switch>
					<Footer />
				</div>	
			</Router>
		);
	}
}

export default App;
