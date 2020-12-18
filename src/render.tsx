import * as React from "react";
import ReactDOM = require("react-dom");
import classNames from "classnames";

import project_metas from "./../assets/project_metas.json"


// this runs on a tick
function render() {
  const element = <Page />;

  ReactDOM.render(element, document.getElementById("root"));
}

// the header at the top of the page throughout the website
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pick one of 3 colors at random (do once per page load)
      rand_color : Math.floor(Math.random() * 3)
    };

  }

  render() {
    const color_idx = this.state.rand_color;

    // default to yellow
    let bg_color = "yellow-bg";
    if (color_idx == 0) {
      bg_color = "yellow-bg";
    } else if (color_idx == 1) {
      bg_color = "purple-bg";
    } else if (color_idx == 2) {
      bg_color = "blue-bg";
    }
    // DEBUG
    // bg_color = "yellow-bg";
    return (
      <div id="page" className={bg_color}>
        <Header />
        <ProjectList />
      </div>
    );}
}

// the header at the top of the page throughout the website
class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div id="name"> fran</div>
        <div id="header-menu-wrapper">
          <div className="header-menu-item"> work</div>
          <div className="header-menu-item"> about</div>
          <div className="header-menu-item"> blog</div>
        </div>
      </div>
    );}
}

// the clickable project name/subtitle link
class ProjectList extends React.Component {
  render() {
    // maybe move this stuff into a constructor
    const projects = project_metas.projects;

    return (
    <div id="project-list">
      {projects.map((project, idx) =>
        <ProjectItem key={idx} project={project} />
    </div>
      
    );}

}

// the clickable project name/subtitle link
class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered : false;
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter(e) {
    this.setState((state, props) => ({
      hovered : true;
    }));
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
  }

  render() {
    const project = this.props.project;
    const { hovered } = this.state;

    return (
      <div 
        className="project-item"
      >
        <div
          className={classNames({
            "project-title": true,
            "blacked-out": hovered,
          })}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          {project.title}
        </div>
        <br></br>
        <div 
          className={classNames({
            "project-subtitle": true,
            "blacked-out": hovered,
          })}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <i>{project.subtitle}</i>
        </div>
      </div>
    );}

}
/* 
        className="project-item"
        className={classNames({"project-item": true})}
        className={classNames({
          project-item: true,
          blacked-out: true,
        })}
*/


export { render };
