import * as React from "react";
import ReactDOM = require("react-dom");
import classNames from "classnames";

function render() {
  const element = (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
  ReactDOM.render(element, document.getElementById("page"));
}


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


export { render };
