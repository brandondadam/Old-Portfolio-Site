import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import * as Animated from "animated/lib/targets/react-dom";
import Carousel from 'react-bootstrap/lib/Carousel';
import Modal from 'react-bootstrap/lib/Modal';

import "../styles/Carousel.css";
import "../styles/Modal.css";

class Modal1 extends React.Component {
  render() {
    return (
      <Modal {...this.props} dialogClassName="custom-modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="modal-img" alt="Project 1" src={this.props.image} />
        </Modal.Body>
      </Modal>
    );
  }
}

class Modal2 extends React.Component {
  render() {
    return (
      <Modal {...this.props} dialogClassName="custom-modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="modal-img" alt="Project 2" src={this.props.image} />
        </Modal.Body>
      </Modal>
    );
  }
}

class Modal3 extends React.Component {
  render() {
    return (
      <Modal {...this.props} dialogClassName="custom-modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="modal-img" alt="Project 3" src={this.props.image} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default class ProjectItem extends Component {
  constructor(props,context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      project: {},
      animate: new Animated.Value(0),
      index: 0,
      direction: null,
      m1Show: false,
      m2Show: false,
      m3Show: false
    };
  }

  componentDidMount() {
    if (this.props.projects.length) {
      this._renderProject(this.props.projects);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.projects.length && nextProps.projects.length) {
      this._renderProject(nextProps.projects);
    }
  }

  _renderProject(projects) {
    let project = projects.filter(p => {
      return (this.props.match.params.id);
    });
    if (project.length) {
      this.setState({
        project: project[(this.props.match.params.id) - 1]
      }); //change the zero to be whatever id is selected
      setTimeout(() => Animated.spring(this.state.animate, {toValue: 1}).start(), 375);
    }
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const {
      project: {
        title,
        body1,
        body2,
        image1,
        image2,
        image3,
        subtitle1,
        desc1,
        subtitle2,
        desc2,
        subtitle3,
        desc3,
        videoLink,
        projectLink,
        index,
        direction
      }
    } = this.state;

    let m1Close = () => this.setState({ m1Show: false });
    let m2Close = () => this.setState({ m2Show: false });
    let m3Close = () => this.setState({ m3Show: false });

    const goBackStyle = {
      transform: Animated.template `
				translate3d(${this.state.animate.interpolate({
        inputRange: [
          0, 1
        ],
        outputRange: ["-24px", "0px"]})},0,0)
			`,
        opacity: Animated.template `${this.state.animate}`
      };

      return (<div className="page project-item">
        <Animated.span style={goBackStyle} className="goBack">
          <NavLink to="/projects" className="goBack">&#x2190;</NavLink>
        </Animated.span>
        <h1>{title && title}</h1>
        <p>{body1 && body1}</p>
        <p>{body2 && body2}</p>

        <Carousel activeIndex={index} direction={direction} onSelect={this.handleSelect} interval={null}>
          <Carousel.Item>
            <img onClick={() => this.setState({ m1Show: true })} width={900} height={500} alt="Project 1" src={image1 && image1} />
            <Carousel.Caption>
              <h3>{subtitle1 && subtitle1}</h3>
              <p>{desc1 && desc1}</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img onClick={() => this.setState({ m2Show: true })} width={900} height={500} alt="Project 2" src={image2 && image2} />
            <Carousel.Caption>
              <h3>{subtitle2 && subtitle2}</h3>
              <p>{desc2 && desc2}</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            {image3 && <img onClick={() => this.setState({ m3Show: true })} width={900} height={500} alt="Project 3" src={image3 && image3} />}
            {videoLink &&
              <div className="wistia_responsive_padding">
                <div className="wistia_responsive_wrapper">
                  <div className="wistia_embed wistia_async_kvdrb93p6n videoFoam=true">
                    <div className="wistia_swatch">
                      <img src={videoLink && videoLink} className="video-img" alt="Project Video" onload="this.parentNode.style.opacity=1;" />
                    </div>
                  </div>
                </div>
              </div>
            }
            <Carousel.Caption>
              <h3>{subtitle3 && subtitle3}</h3>
              <p>{desc3 && desc3}</p>
            </Carousel.Caption>
          </Carousel.Item>

      </Carousel>

      {projectLink && <a className="project-link" href={projectLink && projectLink} target="_blank">project link</a>}

      <div className="project-btm-spacing"><span></span></div>

      <Modal1 show={this.state.m1Show} onHide={m1Close} image={image1 && image1} />
      <Modal2 show={this.state.m2Show} onHide={m2Close} image={image2 && image2} />
      <Modal3 show={this.state.m3Show} onHide={m3Close} image={image3 && image3} />

      </div>);
    }
  }
