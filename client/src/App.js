import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Splash from "./components/pages/Splash";
import Home from "./components/pages/Home";
import Features from "./components/pages/Features";
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
	      console.log(result.data)
	      if(result.data === true){
	        this.setState({isAuthenticated: true})
	      }else {
	        this.setState({isAuthenticated: false})
	      }
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
		axios.post("/auth/login", newUser).then((data) => {
			console.log(data.data);
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
	      this.setState({isAuthenticated: false});
	    })
	};

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path = "/" render = {()=><Splash auth = { {userId: this.state.userId, isAuthenticated: this.state.isAuthenticated} }/>} />
						<Route exact path = "/home" render = {()=><Home/>} />
						<Route exact path = "/features" render = {()=><Features/>} />
						<Route exact path = "/about" render = {()=><About/>} />
					</Switch>
				</div>	
			</Router>
		);
	}
}

export default App;
