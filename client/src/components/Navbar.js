import React from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse row">
			<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<Link className = "navbar-brand" to= "/">MathMe</Link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					{props.isAuthenticated &&
						(<li className="nav-item">
							<Link className="nav-link" to="/home">Home </Link>
						</li>)
					}
					{props.isAuthenticated &&
						(<li className="nav-item">
							<Link className="nav-link" to="/statistics">Statistics</Link>
						</li>
						)
					}
					<li className="nav-item">
						<Link className="nav-link" to="/features">Features</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to= "/about">About Us</Link>
					</li>
				</ul>
				{props.isAuthenticated && 
					(<button className = '.navbar-text btn btn-primary' onClick = {props.handleLogout}>
						Logout
					</button>)
				}
				
			</div>
        </nav>
	);
}

export default Navbar;