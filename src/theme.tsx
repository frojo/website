import * as React from "react";

const ThemeContext = React.createContext({});

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
    let style = "underline-dashed " + this.context.link_color;
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
ThemeContext
export { A, ThemeContext };
