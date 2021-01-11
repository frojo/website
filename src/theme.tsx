import * as React from "react";
import { Link } from 'react-router-dom';

const ThemeContext = React.createContext({});

// function initThemeContext(color, effect) {
//   return({
//     link_color : LINK_COLORS[color],
//     hover_style : this.hoverStyle(effect),
//     onLinkHover : this.onThemeHover;
//   });
// }

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

  render() {
    let style = this.context.link_color;
    if (this.state.hovered) {
      style = style + " " + this.context.hover_style;
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
class ThemeLink extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      hovered : false;
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
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

  mouseClick(e) {
    console.log("click!!!");
    this.setState((state, props) => ({
      hovered : false;
    }));
    this.context.onLinkHover(false);
  }

  render() {
    let style = this.context.link_color;
    if (this.state.hovered) {
      style = style + " " + this.context.hover_style;
    }
    return (
      <Link className={style} to={this.props.to}
                           onMouseEnter={this.mouseEnter}
                           onMouseLeave={this.mouseLeave}
                           onClick={this.mouseClick}>
        {this.props.children}
      </Link>
    );

  }
}


export { ThemeContext, A, ThemeLink };
