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

// special favicons for special effects
import black_favicon from "./../assets/black-favicon.png";
import waves_favicon from "./../assets/waves-icon.gif";

import project_metas from "./../assets/project_metas.json"


// colors
const BG_COLORS = ["yellow-bg", "purple-bg", 
                     "blue-bg", "green-bg"];

const FAVICONS = [yellow_favicon, purple_favicon, 
                  blue_favicon, green_favicon];

const LINK_COLORS = ["yellow-link", "purple-link", 
                     "blue-link", "green-link"];

const ThemeContext = React.createContext({});


// this is called on a tick
function render() {
  const element = <Page />;
  ReactDOM.render(element, document.getElementById("root"));
}


// the header at the top of the page throughout the website
class Page extends React.Component {
  constructor(props) {
    super(props);

    this.onThemeHover = this.onThemeHover.bind(this);

    const color = this.pickNewColor(-1);

    this.state = {
      // pick a random color for various page stylings
      color : color,

      // pick a random hover effect
      effect : Math.floor(Math.random() * 5),
      
      bg_color : BG_COLORS[color],
      favicon : FAVICONS[color],
    
      // are we showing the waves background?
      waves_bg: false
    };
  }
  
  themeContext(color, effect) {
    return({
      link_color : LINK_COLORS[color],
      hover_style : this.hoverStyle(effect),
      onLinkHover : this.onThemeHover;
    });
  }

  // picks a random color that isn't the supplied one
  pickNewColor(exclude_color) { 
    let new_color = Math.floor(Math.random() * 4);
    while (new_color == exclude_color) {
      new_color = Math.floor(Math.random() * 4);
    }
    return new_color;
  }

  // sets theme to a new color
  newDefaultColor(state, props) { 
    const new_color = this.pickNewColor(state.color);
    return ({
      color : new_color,
      bg_color : BG_COLORS[new_color],
      favicon : FAVICONS[new_color],
    });
  }

  // callback for hoverable project items
  onThemeHover(hover) {
    if (hover) {
      // 0: blackout link
      // 1: waves
      // 2: invisible link
      // 3: black background
      // 4: new color
      
      // waves background
      switch (this.state.effect) {
        case 1:
          this.setState((state, props) => ({
            bg_color : "waves-bg";
          }));
          break;
        case 3:
          this.setState((state, props) => ({
            bg_color : "black-bg";
          }));
          break;
        case 4:
          this.setState(this.newDefaultColor);
          break;
      }
    }

    // unhover- change things back
    else {
      switch (this.state.effect) {
        case 4:
          // /don't/ change back for the "new color" effect
          break;
        default:
          this.setState((state, props) => ({
            bg_color : BG_COLORS[this.color],
            favicon : FAVICONS[this.color],
          }));
          break;
      }
    }
  }

  // determine link hover style from effect number
  hoverStyle(effect) {
        // 0: blackout link
        // 1: waves
        // 2: invisible link
        // 3: black background
        // 4: new color
    switch (effect) {
      case 0:
        return "blacked-out";
        break;
      case 2:
        return "invisible";
        break;
    }
    return "";
  }

  render() {
    const theme = this.themeContext(this.state.color, this.state.effect);

    return (
      <React.Fragment>
	      <Helmet>
          {/* type is gif for the waves hover effect
              which only animates in firefox anyway
              because google thinks it's not worth it to implement.
              but what else would you expect from google
          */}
          <link rel="icon" type="image/gif" href={this.state.favicon} />
          <body className={this.state.bg_color} />
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
                  <ProjectList 
                               hover_effect_idx={this.state.effect}
                                />
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
  return (
    <ProjectListItem key={idx} project={project} />
  );
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
    this.context.onLinkHover(true);
  }


  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.context.onLinkHover(false);
  }


  // link_color should be in a context
  // this.mouseEnter and mouseLeave should be too? pass it a onLinkHover global function? and onLinkUnHover?
  // className={`project-title ${this.props.hovered_style}`}
 
  render() {
    let style = this.context.link_color;
    if (this.state.hovered) {
      style = this.context.link_color + " " + this.context.hover_style;
    }

    return (
      <a className={style} href={this.props.href}
                     onMouseEnter={this.mouseEnter}
                     onMouseLeave={this.mouseLeave}>
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
    this.context.onLinkHover(true);
  }

  mouseLeave(e) {
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.context.onLinkHover(false);
  }


   //        <Link to={"/work/" + project.id}>
   //          <div> test div :) </div>
   //        </Link>

  render() {
      // 0: blackout link
      // 1: waves
      // 2: invisible link
      // 3: black background
      // 4: new color
    const project = this.props.project;
    let title_style = "project-title";
    let sub_style = "project-subtitle";
    if (this.state.hovered) {
      title_style = "project-title " + this.context.hover_style;
      sub_style= "project-subtitle " + this.context.hover_style;
    }
    return (
      <div 
        className="project-item"
      >
        <a href={project.link}>
	        <div
                  className={title_style}
                  onMouseEnter={this.mouseEnter}
                  onMouseLeave={this.mouseLeave}
                >
                  {project.title}
                </div>
        </a>
        <br></br>
        <a href={project.link}>
	        <div 
                  className={sub_style}
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

// className={`project-title ${this.props.hovered_style}`}
// className={`project-subtitle ${this.props.hovered_style}`}

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
