import React, {Component} from 'react';
import { Route } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import AnimatedSwitch from "./components/AnimatedSwitch";

import Home from "./components/Home";
import Projects from "./components/Projects";
import ProjectItem from "./components/ProjectItem";
import TopBar from "./components/TopBar";
import Missed from "./components/Missed";

import projectData from "./components/projects.json";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.setState({
      projects: projectData.slice(0, 8)
    });
  }

  render() {
    return (
      <div className="App">

      <TopBar />

      <Route
        render={({ location }) => (
          <TransitionGroup component="main">
            <AnimatedSwitch
              key={location.key}
              location={location}
            >
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/projects"
                render={props => (
                  <Projects {...props} projects={this.state.projects} />
                )}
              />
              <Route
                path="/projects/:id"
                render={props => (
                  <ProjectItem {...props} projects={this.state.projects} />
                )}
              />
              <Route path="/projects/test" component={ProjectItem} />

              <Route component={Missed} />
            </AnimatedSwitch>
          </TransitionGroup>
        )}
      />


      </div>
    );
  }
}
export default App;
