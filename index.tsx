import { render } from "./src/render";

let i = 0;

let lasttick = Date.now();
function tick() {
  console.log("tick uwu");
  i++;
  lasttick = Date.now();
  render();
  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
