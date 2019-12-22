import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

class TopBar extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
      		hasScroll:false
    	}
	}
	
	componentDidMount() {
    	window.addEventListener('scroll', this.hasScroll)
  	}

  	hasScroll = (event) => {
		  console.log("Event trigger")
		const scrollTop = window.pageYOffset;

    	if (scrollTop > 50) {
			console.log("Scroll");
      		this.setState({
        		hasScroll: true
     		})
    	} else {
			console.log("Top");
      		this.setState({
        		hasScroll: false
      	})
    }
  }
	render() {
		return (
      		<div className={this.state.hasScroll ? 'scroll top-bar' : 'no-scroll top-bar'}>
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