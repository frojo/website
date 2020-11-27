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
        <div className="header_item"> work</p>
        <div className="header_item"> about</p>
        <div className="header_item"> blog</p>
      </div>
    );}
}


export { render };
