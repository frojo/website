import { render } from "./src/render";

let i = 0;

// this rendering framework is lovingly copied from 
// https://github.com/MaxBittker/walky
let lasttick = Date.now();
function tick() {
  i++;
  lasttick = Date.now();
  render();
  window.requestAnimationFrame(tick);
}






window.requestAnimationFrame(tick);
