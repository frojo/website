import * as React from "react";
import ReactDOM = require("react-dom");
import { BrowserRouter as Router, 
         Switch, Route, Link, 
         withRouter 
       } from 'react-router-dom';

/* we love libraries */
import { Helmet } from "react-helmet";
import classNames from "classnames";

import yellow_favicon from "./../assets/yellow-favicon.png";
import purple_favicon from "./../assets/purple-favicon.png";
import blue_favicon from "./../assets/blue-favicon.png";
import green_favicon from "./../assets/green-favicon.png";
import waves_icon from "./../assets/waves-icon.gif";

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

    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);

    this.state = {
      // pick a random color for various page stylings
      rand_color : Math.floor(Math.random() * 4),

      // pick a random hover effect
      rand_effect : Math.floor(Math.random() * 3),
    
      // are we showing the waves background?
      waves_bg: false
    };
  }

  // callback for hoverable project items
  handleBackgroundChange(waves) {
    this.setState((state, props) => ({
      waves_bg : waves;
    }));
  }

  render() {
    const color_idx = this.state.rand_color;

    // default to yellow
    let bg_color = "yellow-bg";
    let favicon_path = yellow_favicon;
    if (this.state.waves_bg) {
      bg_color = "waves-bg";
      favicon_path = waves_icon;
    } else if (color_idx == 0) {
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
    // console.log(favicon_path);
    return (
      <React.Fragment>
	      <Helmet>
          {/* type is gif for the waves hover effect
              which only animates in firefox anyway
              because google thinks it's not worth it to implement.
              what else to do expect from a monopoly 
          */}
          <link rel="icon" type="image/gif" href={favicon_path} />
          {/* <body className="waves-bg" /> */}
          <body className={bg_color} />
	      </Helmet>

        <div id="page">
          <Router>
            <HeaderWithRouter/>
            <Switch>
              <Route exact path="/about">
                <About/>
              </Route>
              <Route exact path="/">
                <ProjectList color_idx={color_idx}
                             hover_effect_idx={this.state.rand_effect}
                             onHover={this.handleBackgroundChange} />
              </Route>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );}
}

// the header at the top of the page throughout the website
class Header extends React.Component {
  render() {
    const path = this.props.location.pathname;
    return (
      <div id="header">
        <Link to="/">
          <div id="name"> fran</div>
        </Link>
        <div id="header-menu-wrapper">
          <Link to="/">
            <div className={classNames({
                            "header-menu-item": true,
                            "underline-dashed": path == "/",
                           })}
            >work</div>
          </Link>
          <Link to="/about">
            <div className={classNames({
                            "header-menu-item": true,
                            "underline-dashed": path == "/about",
                           })}
            >about</div>
          </Link>
        </div>
      </div>
    );}
}
/* <div className="header-menu-item">blog</div> */

// https://reactrouter.com/web/api/withRouter
const HeaderWithRouter = withRouter(Header);

class About extends React.Component {
  render() {
    return (
      <div>
        i am fran
      </div>
    );}
}

// todo: make a ProjectLayout type like how max does?
// https://github.com/MaxBittker/walky/blob/master/src/render.tsx
function renderProjectItem(project, idx: number) {
    let project_item;
    
    switch (this.props.hover_effect_idx) {
      case 0:
        project_item = <BlackOutProjectItem
                         key={idx} project={project}
                         color_idx={this.props.color_idx} 
                         onHover={this.props.onHover} />;
        break;
      case 1:
        project_item = <WavesBackgroundProjectItem 
                         key={idx} project={project}
                         color_idx={this.props.color_idx} 
                         onHover={this.props.onHover} />;
        break;
      case 2:
	project_item = <InvisibleProjectItem
      	                 key={idx} project={project}
      	                 color_idx={this.props.color_idx} 
      	                 onHover={this.props.onHover} />;
	break;
      default:
        project_item = <BlackOutProjectItem
                         key={idx} project={project}
                         color_idx={this.props.color_idx} 
                         onHover={this.props.onHover} />;
        break;

    }

    return project_item;

}

// the clickable project name/subtitle links
class ProjectList extends React.Component {
  render() {
    // maybe move this stuff into a constructor
    const projects = project_metas.projects;

    return (
    <div id="project-list">
      {projects.map(renderProjectItem, this)}
    </div>
      
    );}

}

// the clickable project name/subtitle link
class BlackOutProjectItem extends React.Component {
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

// the clickable project name/subtitle link
class WavesBackgroundProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered : false;
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter(e) {
    this.props.onHover(true);
  }

  mouseLeave(e) {
    this.props.onHover(false);
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

// the clickable project name/subtitle link
class InvisibleProjectItem extends React.Component {
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
      hovered : true,
    }));
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
  }

  renderInvisibleProjectItem() {
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

    let s = {};
    if (this.state.hovered) {
      // using "visibility" makes hover effects not work anymore
      s = { opacity: 0 };
    } 

    return(
      <div 
        className="project-item"
        style={s}
      >
	      <a ref={this.ref_orig} className={link_color} href={project.link}>
	        <div
                  className="project-title"
                  onMouseEnter={this.mouseEnter}
                  onMouseLeave={this.mouseLeave}
                >
                  {project.title}
                </div>
	      </a>
        <br></br>
	      <a className={link_color} href={project.link}>
	        <div 
                  className="project-subtitle"
                  onMouseEnter={this.mouseEnter}
                  onMouseLeave={this.mouseLeave}
                >
                  <i>{project.subtitle}</i>
                </div>
	      </a>
      </div>
    );
  }

  render() {
    return this.renderInvisibleProjectItem();
  }
}


export { render };
