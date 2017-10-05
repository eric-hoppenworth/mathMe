import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse row">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className = "navbar-brand">
          	<Link className = "navbar-brand" to= "/">MathMe</Link>
          </a>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to= "/about">About Us</Link>
              </li>
            </ul>
          </div>
        </nav>
	);
}

export default Navbar;