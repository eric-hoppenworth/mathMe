import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Splash from "./components/pages/Splash";
import Home from "./components/pages/Home";
import Features from "./components/pages/Features";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import About from "./components/pages/About";
import axios from 'axios';

class App extends React.Component {
	//this component asks the API to check for authentication before rendering
	state = {
		userName: "",
		password: "",
		userId: "",
		isAuthenticated: false
	};

	componentWillMount(){
	    axios.get("/auth/isAuthenticated").then((result)=>{
	    	const {userId, isAuthenticated} = result.data
	        this.setState({
	        	userId,
	        	isAuthenticated
	        })
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
		// alert(`userName : ${this.state.userName} password ${this.state.password}`);
		const newUser = {
			email: this.state.userName,
			password: this.state.password
		};
		const authPath = "/auth/" + event.target.name;
		axios.post(authPath, newUser).then((data) => {
			// console.log(data.data);
			if (data.data.isAuthenticated){
			  this.setState({
			  	userId: data.data.userId,
			  	isAuthenticated: true
			  })
			}
		});

		this.setState({
			userName: "",
			password: ""
		}); 
    }

	handleLogout = (event) => {
	    event.preventDefault();
	    axios.get("/auth/logout").then((result)=>{
	    	this.setState({
	    		userId: "",
	      		isAuthenticated: false
	      	});
	    })
	};

	render() {
		return (
			<Router>
				<div className = "container-fluid">
					<Navbar isAuthenticated = {this.state.isAuthenticated} handleLogout ={this.handleLogout} />
					<Switch>
						<Route exact path = "/" render = { () => 
							<Splash 
								auth = {{
									userId: this.state.userId, 
									isAuthenticated: this.state.isAuthenticated
								}}
								inputs = {{
									userName: this.state.userName,
									password: this.state.password
								}}
								handleChange = {this.handleChange}
								handleSubmit = {this.handleSubmit}
							/>} 
						/>
						<Route exact path = "/home" render = { () =>
							<Home
								auth = {{
									userId: this.state.userId, 
									isAuthenticated: this.state.isAuthenticated
								}}
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
