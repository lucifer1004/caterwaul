/**
 * Enemies our player must avoid.
 * @constructor
 */
export default class Enemy {
  /**
   * Constructor of the enemy class.
   * @param {number} level Current level.
   */
  constructor(level) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 500 * Math.random();
    this.y = 60 + 180 * Math.random();
    this.vx = 200 * (1 + 0.2 * level) * (1 + Math.random()) * (Math.round(Math.random()) - 0.5);
    this.vy = 0;
    this.store = {};
    this.visible = true;
  }

  makeInvisible() {
    this.visible = false;
  }

  save() {
    this.store.vx = this.vx;
    this.store.vy = this.vy;
    this.vx = 0;
    this.vy = 0;
  }

  restore() {
    this.vx = this.store.vx;
    this.vy = this.store.vy;
  }

  /** Change current enemy's direction */
  turnX() {
    this.vx = -this.vx;
  }

  /**
   * Update the enemy's position, required method for game.
   * @param {number} dt a time delta between ticks
  */
  update(dt) {
    const EnemyMaxX = 505;
    const EnemyMinX = -101;

    this.x += dt * this.vx;
    if (this.x > EnemyMaxX) {
      this.turnX();
    }
    if (this.x < EnemyMinX) {
      this.turnX();
    }
    this.y += dt * this.vy;
  }

  /** Draw the enemy on the screen, required method for game. */
  render() {
    if (this.visible) ctx.drawImage(res.get(this.sprite), this.x, this.y);
  }
}
