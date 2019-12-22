import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

class TopBar extends React.Component {
	render() {
		return (
      		<div className='top-bar'>
        		<img src={logo} alt="Brandon D'Adam's Logo" />
        		<nav>
          			<NavLink exact to="/">Hi</NavLink>
          			<NavLink to="/projects">Projects</NavLink>
        		</nav>
      		</div>
    	);
	}
}

export default TopBar;