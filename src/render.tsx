import * as React from "react";
import ReactDOM = require("react-dom");
import { BrowserRouter as Router, 
         Switch, Route, Link, 
         withRouter, useRouteMatch
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


// themes 
const LINK_COLORS = ["yellow-link", "purple-link", 
                     "blue-link", "green-link"];

const ThemeContext = React.createContext({});

function themeContext(color, effect) {
  return({
    link_color : LINK_COLORS[color]
  });
}

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
      color : Math.floor(Math.random() * 4),

      // pick a random hover effect
      effect : Math.floor(Math.random() * 5),
    
      // are we showing the waves background?
      waves_bg: false
    };
  }

  pickNewColor(state, props) {
    const curr_color = state.color;
    let new_color = Math.floor(Math.random() * 4);
    while (new_color == curr_color) {
      new_color = Math.floor(Math.random() * 4);
    }
    return ({
      color : new_color
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
    const color_idx = this.state.color;

    const theme = themeContext(this.state.color, this.state.effect);

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

        <ThemeContext.Provider value={theme}>
          <div id="page">
            <Router>
              <HeaderWithRouter/>
              <Switch>
                <Route exact path="/about">
                  <About/>
                </Route>
                <Route exact path="/">
                  <ProjectList color_idx={color_idx}
                               hover_effect_idx={this.state.effect}
                               onHover={this.handleBackgroundChange} />
                </Route>
                <Route path="/work">
                  <ProjectDocsWithRouter />
                </Route>
              </Switch>
            </Router>
          </div>
        </ThemeContext.Provider>
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
          <Name />
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

class Name extends React.Component {
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

    let name;
    if (!this.state.hovered) {
      name = "fran";
    } else {
      name = "Francisco \"Mo\" Osvaldo Rojo-Ilvento";
    }
    return (
      <div id="name"
           onMouseEnter={this.mouseEnter}
           onMouseLeave={this.mouseLeave}> 
        {name}
      </div>
    );}
}
/* <div className="header-menu-item">blog</div> */

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
                         onHover={this.props.onHover} />;
        break;
      case 1:
        project_item = <WavesBackgroundProjectItem 
                         key={idx} project={project}
                         onHover={this.props.onHover} />;
        break;
      case 2:
	    project_item = <InvisibleProjectItem
      	                 key={idx} project={project}
      	                 onHover={this.props.onHover} />;
	      break;
      case 3:
	      project_item = <BlackBackgroundProjectItem
      	                 key={idx} project={project}
      	                 onHover={this.props.onHover} />;
	      break;
      case 4:
	      project_item = <NewColorProjectItem
      	                 key={idx} project={project}
      	                 onHover={this.props.onHover} />;
	      break;
      default:
        project_item = <BlackOutProjectItem
                         key={idx} project={project}
                         onHover={this.props.onHover} />;
        break;

    }

    return project_item;

}

// the clickable project name/subtitle links
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.ordered_projects = this.sortReverseChrono(
                              project_metas.projects);
  }

  // THE TITAN CHRONOS
  sortReverseChrono(projects) {
    const sorted = projects.sort(function(a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    });
    return sorted
  }

  render() {
    return (
    <div id="project-list">
      {this.ordered_projects.map(renderProjectItem, this)}
    </div>
      
    );}

}


// my link :)
class A extends React.Component {
  static contextType = ThemeContext;

  // link_color should be in a context
  // this.mouseEnter and mouseLeave should be too? pass it a onLinkHover global function? and onLinkUnHover?

  render() {
    return (
     <a className={this.context.link_color} href={this.props.href}>
       {this.props.children}
     </a>
    );
  }
}

// <A className="class" href="https://some.link" />.

// the clickable project name/subtitle link
class ProjectListItem extends React.Component {
  static contextType = ThemeContext;

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
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.props.onHover("", "");
  }

  render() {
    const project = this.props.project;
    const { hovered } = this.state;

    if (!this.state.hovered) {
        return (
          <div 
          className="project-item"
        >
          <Link to={"/work/" + project.id}>
            <div> test div :) </div>
          </Link>
          <A href={project.link}>
            <div
                    className="project-title"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    {project.title}
                  </div>
          </A>
          <br></br>
          <A href={project.link}>
            <div 
                    className="project-subtitle"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    <i>{project.subtitle}</i>
                  </div>
          </A>
        </div>
      );
    // hovered case
    } else {
      return (
        <div 
          className="project-item"
        >
        <p></p>
          <A href={project.link}>
	          <div
                    className={`project-title ${this.props.hovered_style}`}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    {project.title}
                  </div>
          </A>
          <br></br>
          <A href={project.link}>
	          <div 
                    className={`project-subtitle ${this.props.hovered_style}`}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    <i>{project.subtitle}</i>
                  </div>
          </A>
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

// pages for project documentation
class ProjectDocumentations extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:project_id`}
               component={ProjectDocumentation} >
        </Route>
        <Route>
        </Route>
      </Switch>
    );
  );}
}
// https://reactrouter.com/web/api/withRouter
const ProjectDocsWithRouter = withRouter(ProjectDocumentations);

class ProjectDocumentation extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.project_id;
  }

  render() {
    return <div> this is documetation for a project {this.id} </div>
  );}
}

export { render };
