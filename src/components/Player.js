const PlayerMaxX = 420;
const PlayerMinX = -15;
const PlayerMaxY = 450;
const PlayerMinY = -20;

const Characters = ['boy', 'cat-girl', 'horn-girl', 'pink-girl', 'princess-girl'];

/**
 * Our player
 * @constructor
 */
export default class Player {
  /** Constructor of the player class. */
  constructor() {
    this.x = 200;
    this.y = 450;
    this.vx = 0;
    this.vy = 0;
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
    this.currentChar = this.currentChar % this.unlockedChar + 1;
  }

  /** Check X-axis borders. */
  checkX() {
    if (this.x < PlayerMinX && this.vx < 0) this.vx = 0;
    if (this.x > PlayerMaxX && this.vx > 0) this.vx = 0;
  }

  /** Check Y-axis borders. */
  checkY() {
    if (this.y < PlayerMinY && this.vy < 0) this.vy = 0;
    if (this.y > PlayerMaxY && this.vy > 0) this.vy = 0;
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
  }

  /**
   * Draw the player on the screen.
   */
  render() {
    ctx.drawImage(res.get(this.sprite), this.x, this.y);
  }
}
