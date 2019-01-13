import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

export default class TopBar extends Component {
	render() {
		return (
			<div className="top-bar">
				<img src={logo} alt="Brandon D'Adam's Logo"/>
				<nav>
          <NavLink exact to="/">Hi</NavLink>
          <NavLink to="/projects">Projects</NavLink>
				</nav>
			</div>
		)
	}
}
