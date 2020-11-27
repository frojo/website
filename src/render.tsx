import * as React from "react";
import ReactDOM = require("react-dom");

function render() {
  const { camera, entities, me, agents, center } = getState();
  const cameraPos = Vector.sub(center, camera);
  const element = (
    <React.Fragment>
    </React.Fragment>
  );
  ReactDOM.render(element, document.getElementById("window"));
  dragElement(document.getElementById("window"));
}
