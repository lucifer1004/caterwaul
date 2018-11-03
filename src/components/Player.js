import {MaxSpeed, OrigSpeed} from '../constants.js';

const PlayerMaxX = 420;
const PlayerMinX = -15;
const PlayerMaxY = 450;
const PlayerMinY = -20;
const PlayerAcc = 50;

const Characters = ['boy', 'cat-girl', 'horn-girl', 'pink-girl', 'princess-girl'];

/**
 * Our player
 * @constructor
 */
export default class Player {
  /** Constructor of the player class. */
  constructor() {
    // Position
    this.x = 200;
    this.y = 450;

    // Speed
    this.vx = 0;
    this.vy = 0;

    // Acceleration
    this.ax = 0;
    this.ay = 0;

    this.currentChar = 0;
    this.unlockedChar = 1;
    this.char = Characters.map((char) =>
      'images/char-' + char + '.png'
    );
    this.sprite = this.char[0];
  }

  /** Change character. */
  changeChar() {
    this.sprite = this.char[(this.currentChar + 1) % this.unlockedChar];
    this.currentChar = (this.currentChar + 1) % this.unlockedChar;
  }

  /** Check X-axis borders. */
  checkX() {
    if ((this.x < PlayerMinX && this.vx < 0) || (this.x > PlayerMaxX && this.vx > 0)) this.stopX();
  }

  /** Check Y-axis borders. */
  checkY() {
    if ((this.y < PlayerMinY && this.vy < 0) || (this.y > PlayerMaxY && this.vy > 0)) this.stopY();
  }

  /**
   * Start X-axis movement.
   * @param {number} direction The direction
   */
  startX(direction) {
    this.vx = OrigSpeed[this.currentChar] * direction;
    this.ax = PlayerAcc * direction;
  }

  /**
   * Start Y-axis movement.
   * @param {number} direction The direction
   */
  startY(direction) {
    this.vy = OrigSpeed[this.currentChar] * direction;
    this.ay = PlayerAcc * direction;
  }

  /** Stop X-axis movement. */
  stopX() {
    this.vx = 0;
    this.ax = 0;
  }

  /** Stop Y-axis movement. */
  stopY() {
    this.vy = 0;
    this.ay = 0;
  }

  /** Reset the player's position, regenerate enemies and restart the game. */
  reset() {
    this.x = 200;
    this.y = 450;
    this.vx = 0;
    this.vy = 0;
  }

  unlockChar() {
    if (this.unlockedChar < 5) {
      ctx.fillText(`New character unlocked: ${Characters[this.unlockedChar]}`, 20, 280);
      this.unlockedChar ++;
    }
  }

  /**
   * Update the player's position, required method for game.
   * @param {number} dt a time delta between ticks
   */
  update(dt) {
    this.x += dt * this.vx;
    this.y += dt * this.vy;
    this.vx += dt * this.ax;
    this.vy += dt * this.ay;
    if (Math.abs(this.vx) > MaxSpeed[this.currentChar]) this.ax = 0;
    if (Math.abs(this.vy) > MaxSpeed[this.currentChar]) this.ay = 0;
  }

  /**
   * Draw the player on the screen.
   */
  render() {
    ctx.drawImage(res.get(this.sprite), this.x, this.y);
  }
}
