/**
 * Game information
 * @constructor
 */
export default class Info {
  constructor() {
    this.best = 0;
    this.level = 1;
    this.lives = 3;
  }

  /**
   * Handle level-up.
   */
  levelUp() {
    if (this.level > this.best) {
      this.best = this.level;
    }
    this.level += 1;
    if (this.lives < 5) this.lives += 1;
  }

  /** Handle life loss. */
  loseLife() {
    this.lives -= 1;
  }

  /** Reset game info. */
  reset() {
    this.level = 1;
    this.lives = 3;
  }

  /**
   * Render game status.
   */
  render() {
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(res.get('images/Heart.png'), 400 - 50 * i, 420);
    }
    ctx.fillText('Level: ' + this.level, 20, 550);
    ctx.fillText('Best:  ' + this.best, 20, 580);
  }
}
