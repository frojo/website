import * as React from "react";
import ReactDOM = require("react-dom");
import classNames from "classnames";

import project_metas from "./../assets/project_metas.json"


function render() {
  const element = (
    <React.Fragment>
      <Header />
      <ProjectList />
    </React.Fragment>
  );
  ReactDOM.render(element, document.getElementById("page"));
}

// pretty sure i want to use JSON.parse() somewhere

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
  }

  mouseEnter(e) {
    console.log("hovering!");
  }

  mouseLeave(e) {
    console.log("stopped hovering!");
  }

  render() {
    const project = this.props.project;
    const { hovered } = this.state;

    return (
      <div className="project-item"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}> 
        <div className="project-title">{project.title}</div>
        <div className="project-subtitle"><i>{project.subtitle}</i></div>
      </div>
    );}

}


export { render };
