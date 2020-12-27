import * as React from "react";
import ReactDOM = require("react-dom");
import { Helmet } from "react-helmet";
import classNames from "classnames";
import yellow_favicon from "./../assets/yellow-favicon.png";
import purple_favicon from "./../assets/purple-favicon.png";
import blue_favicon from "./../assets/blue-favicon.png";
import green_favicon from "./../assets/green-favicon.png";

import project_metas from "./../assets/project_metas.json"


// this is called on a tick
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
      rand_color : Math.floor(Math.random() * 4)
    };

  }

  render() {
    const color_idx = this.state.rand_color;

    // default to yellow
    let bg_color = "yellow-bg";
    let favicon_path = yellow_favicon;
    if (color_idx == 0) {
      bg_color = "yellow-bg";
      favicon_path = yellow_favicon;
    } else if (color_idx == 1) {
      bg_color = "purple-bg";
      favicon_path = purple_favicon;
    } else if (color_idx == 2) {
      bg_color = "blue-bg";
      favicon_path = blue_favicon;
    } else if (color_idx == 3) {
      bg_color = "green-bg";
      favicon_path = green_favicon;
    }
    return (
      <div id="page" className={bg_color}>
	<Helmet>
	  <link rel="icon" type="image/x-icon" href={favicon_path}/>
	  
	</Helmet>
        <Header />
        <ProjectList color_idx={color_idx}/>
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
        <ProjectItem key={idx} project={project}
                     color_idx={this.props.color_idx} />
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
    const color_idx = this.props.color_idx;

    // default to yellow
    let link_color = "yellow-link";
    if (color_idx == 0) {
      link_color = "yellow-link";
    } else if (color_idx == 1) {
      link_color = "purple-link";
    } else if (color_idx == 2) {
      link_color = "blue-link";
    } else if (color_idx == 3) {
      link_color = "green-link";
    }
    return (
      <div 
        className="project-item"
      >
	      <a className={link_color} href={project.link}>
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
	      </a>
        <br></br>
	      <a className={link_color} href={project.link}>
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
	      </a>
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
