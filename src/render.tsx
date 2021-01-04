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

import black_favicon from "./../assets/black-favicon.png";
import waves_favicon from "./../assets/waves-icon.gif";

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
      rand_effect : Math.floor(Math.random() * 5),
    
      // are we showing the waves background?
      waves_bg: false
    };
  }

  pickNewColor(state, props) {
    const curr_color = state.rand_color;
    let new_color = Math.floor(Math.random() * 4);
    while (new_color == curr_color) {
      new_color = Math.floor(Math.random() * 4);
    }
    return ({
      rand_color : new_color
    });
  }

  // callback for hoverable project items
  handleBackgroundChange(bg, favicon) {
    // special case
    if (bg == "new") {
      this.setState(this.pickNewColor);
    } else {
      this.setState((state, props) => ({
        hover_bg : bg;
        hover_favicon : favicon;
      }));
    }
  }

  render() {
    const color_idx = this.state.rand_color;

    // default to yellow
    let bg_color = "yellow-bg";
    let favicon_path = yellow_favicon;
    if (this.state.hover_bg) {
      bg_color = this.state.hover_bg;
      favicon_path = this.state.hover_favicon;
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
              but what else would you expect from google
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
      case 3:
	      project_item = <BlackBackgroundProjectItem
      	                 key={idx} project={project}
      	                 color_idx={this.props.color_idx} 
      	                 onHover={this.props.onHover} />;
	      break;
      case 4:
	      project_item = <NewColorProjectItem
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
class ProjectListItem extends React.Component {
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
    this.props.onHover(this.props.hovered_bg, 
                       this.props.hovered_favicon);
    console.log("mouse entered");
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.props.onHover("", "");
    console.log("mouse left");
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


    if (!this.state.hovered) {
        return (
          <div 
          className="project-item"
        >
          <a className={link_color} href={project.link}>
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
    // hovered case
    } else {
      return (
        <div 
          className="project-item"
        >
        <p></p>
	        <a className={link_color} href={project.link}>
	          <div
                    className={`project-title ${this.props.hovered_style}`}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    {project.title}
                  </div>
	        </a>
          <br></br>
	        <a className={link_color} href={project.link}>
	          <div 
                    className={`project-subtitle ${this.props.hovered_style}`}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    <i>{project.subtitle}</i>
                  </div>
	        </a>
        </div>
      );
    }
  }
}

// censored
class BlackOutProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProjectListItem {...this.props}
			    hovered_style="blacked-out" />;
  );}
}

class WavesBackgroundProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ProjectListItem {...this.props}
			    hovered_style=""
          hovered_bg="waves-bg" hovered_favicon={waves_favicon} />;
  );}
}

class InvisibleProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProjectListItem {...this.props}
			    hovered_style="invisible" />;
  );}
}

class BlackBackgroundProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProjectListItem {...this.props}
			    hovered_style=""
          hovered_bg="black-bg" hovered_favicon={black_favicon} />;
  );}
}

class NewColorProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProjectListItem {...this.props}
			    hovered_style=""
          hovered_bg="new" hovered_favicon="" />;
  );}
}

export { render };
