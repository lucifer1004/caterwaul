import Game from './components/Game.js';
import Resources from './components/Resources.js';
import Sound from './components/Sound.js';
import {AllowedKeys} from './constants.js';

/* Pre-define the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const game = new Game();
const res = new Resources(init);

/** Make certain variables global for easy use. */
window.canvas = canvas;
window.ctx = ctx;
window.res = res;
window.crashSound = new Sound('../audio/crash.mp3', 8.0);
window.levelUpSound = new Sound('../audio/level-up.mp3', 5.0);
window.backgroundSound = new Sound('../audio/bgm.mp3', 1.0, true);

let lastTime;

canvas.width = 505;
canvas.height = 606;
document.body.appendChild(canvas);

/** Set font globally. */
ctx.font = '30px Consolas';

// Add listeners for key presses.
document.addEventListener('keydown', function(e) {
  game.handleKeyDown(AllowedKeys[e.code]);
});

document.addEventListener('keyup', function(e) {
  if (game.paused) {
    game.resume();
    lastTime = Date.now();
    window.requestAnimationFrame(main);
  }
  game.handleKeyUp(AllowedKeys[e.code]);
  backgroundSound.play();
});

function init() {
  lastTime = Date.now();
  game.generateEnemies();
  main();
}

function main() {
  const now = Date.now();
  const dt = (now - lastTime) / 1000.0;

  /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
  game.update(dt);
  game.render();

  /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
  lastTime = now;

  /* Use the browser's requestAnimationFrame function to call this
        * function again as soon as the browser is able to draw another frame.
        */
  if (!game.paused) window.requestAnimationFrame(main);
}
