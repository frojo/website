import * as React from "react";
import ReactDOM = require("react-dom");
import { BrowserRouter as Router, 
         Switch, Route, Link, NavLink, Redirect
         withRouter, useRouteMatch, 
       } from 'react-router-dom';
import { browserHistory } from 'react-router';

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

import { ProjectList } from "./project_list";
import { ProjectDocumentation } from "./documentation";
import { ThemeContext, ThemeLink, A } from "./theme";
import { FourOhFour } from "./fourohfour"


// colors
const BG_COLORS = ["yellow-bg", "purple-bg", 
                     "blue-bg", "green-bg"];

const FAVICONS = [yellow_favicon, purple_favicon, 
                  blue_favicon, green_favicon];

const LINK_COLORS = ["yellow-link", "purple-link", 
                     "blue-link", "green-link"];



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
            bg_color : "waves-bg",
            favicon : waves_favicon, 
          }));
          break;
        case 3:
          this.setState((state, props) => ({
            bg_color : "black-bg",
            favicon : black_favicon,
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
            bg_color : BG_COLORS[state.color],
            favicon : FAVICONS[state.color],
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
              <HeaderWithRouter />
	            <BodyWithRouter />
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
          <NavLink to="/work" 
		   activeClassName="underline-dashed">
            <div className="header-menu-item">
	      work
	    </div>
          </NavLink>
          <NavLink to="/about"
		   activeClassName="underline-dashed">
            <div className="header-menu-item">
	      about
	    </div>
          </NavLink>
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
      <div className="about">
        <p>Interested in words and space.</p>
        <p>My <A href="https://twitter.com/franmorojo">twitter</A> where i mostly retweet good things.</p>
      </div>
    );}
}


class Body extends React.Component {
  static contextType = ThemeContext;

  componentDidMount() {
    // new page (like when someone clicks on in-website link)
    this.historyChange = this.props.history.listen( location =>  {
	this.context.onLinkHover(false);
    });

  }

  componentWillUnmount() {
    this.historyChange();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
	  <Redirect to="/work" />
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/work"
	       component={ProjectList}>
        </Route>
        <Route path="/work/:project_id"
	       component={ProjectDocumentation}>
        </Route>
        <Route>
	  <FourOhFour />
        </Route>
      </Switch>
    );}
}
const BodyWithRouter = withRouter(Body);


export { render };
