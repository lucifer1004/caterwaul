const myStorage = window.localStorage;
myStorage.setItem('winTimes', 0);
myStorage.setItem('loseTimes', 0);

const EnemyMaxX = 505;
const EnemyMinX = -101;
const PlayerMaxX = 420;
const PlayerMinX = -15;
const PlayerMaxY = 450;
const PlayerMinY = -20;
const PlayerSpeed = 100;
const AllowedKeys = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  KeyC: 'c',
};
const KeyLevels = [1, 2, 3, 5];
const Characters = ['boy', 'cat-girl', 'horn-girl', 'pink-girl', 'princess-girl'];

const allEnemies = [];

const times = (num) => {
  return num === 1 ? 'once' : num === 2 ? 'twice' : num + ' times';
};

const generateEnemies = () => {
  allEnemies.length = 0;
  const enemyCount = 2 * status.level + Math.round(2 * Math.random());
  for (let i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
  }
};

/**
 * Enemies our player must avoid.
 * @constructor
 */
class Enemy {
  /** Constructor of the enemy class. */
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 500 * Math.random();
    this.y = 60 + 180 * Math.random();
    this.vx = 200 * (1 + 0.2 * status.level) * (1 + Math.random()) * (Math.round(Math.random()) - 0.5);
    this.vy = 0;
    this.visible = true;
  }

  makeInvisible() {
    this.visible = false;
  }

  /** Check if current enemy hits the player. */
  checkCollision() {
    if (!this.visible) return;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    if (Math.abs(dx) <= 51 && Math.abs(dy) <= 51) {
      status.loseLife();
      this.makeInvisible();
    }
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
    // Check if there is a collision.
    this.checkCollision();
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
    if (this.visible) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * The player we control.
 * @constructor
 */
class Player {
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

  /** Check borders. */
  checkBorder() {
    this.checkX();
    this.checkY();
  }

  /** Check if the player wins. */
  checkWin() {
    if (this.y <= -19) {
      status.levelUp();
      this.restart();
      generateEnemies();
    }
  }

  /** Reset the player's position, regenerate enemies and restart the game. */
  restart() {
    this.x = 200;
    this.y = 450;
    this.vx = 0;
    this.vy = 0;
    generateEnemies();
  }

  /**
   * Triggered when any arrow key is pressed.
   * @param {string} key The pressed key,
  */
  handleKeyDown(key) {
    switch (key) {
    case 'left':
      this.vx = -1 * PlayerSpeed;
      break;
    case 'right':
      this.vx = PlayerSpeed;
      break;
    case 'up':
      this.vy = -1 * PlayerSpeed;
      break;
    case 'down':
      this.vy = PlayerSpeed;
      break;
    default:
    }
    this.checkBorder();
  }

  /**
   * Triggered when a key is released.
   * @param {string} key The released key.
  */
  handleKeyUp(key) {
    switch (key) {
    case 'left':
      this.vx = 0;
      break;
    case 'right':
      this.vx = 0;
      break;
    case 'up':
      this.vy = 0;
      break;
    case 'down':
      this.vy = 0;
      break;
    case 'c':
      this.sprite = this.char[(this.currentChar + 1) % this.unlockedChar];
      this.currentChar ++;
      break;
    default:
    }
  }

  /**
   * Update the player's position, required method for game.
   * @param {number} dt a time delta between ticks
   */
  update(dt) {
    this.x += dt * this.vx;
    this.y += dt * this.vy;
    this.checkWin();
    this.checkBorder();
  }

  /** Draw the player on the screen. */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * Current status of the game.
 * @constructor
 */
class Status {
  /** Constructor of the status class. */
  constructor() {
    this.level = 1;
    this.best = 0;
    this.lives = 3;
  }

  /** Reset game status. */
  restart() {
    this.level = 1;
    this.lives = 3;
  }

  /** Handle character unlock. */
  unlockChar() {
    if (KeyLevels.find((level) => {
      return level === this.best;
    }) !== undefined) {
      if (player.unlockedChar < 5) {
        alert(`New character unlocked: ${Characters[player.unlockedChar]}`);
        player.unlockedChar ++;
      }
    }
  }

  /** Handle level-up. */
  levelUp() {
    if (this.level > this.best) {
      this.best = this.level;
      this.unlockChar();
    }
    this.level += 1;
    if (this.lives < 5) this.lives += 1;
  }

  /** Handle life loss. */
  loseLife() {
    this.lives -= 1;
    if (this.lives === 0) {
      const loseTimes = parseInt(myStorage.getItem('loseTimes'), 10) + 1;
      myStorage.setItem('loseTimes', loseTimes);
      alert(`You have lost ${times(loseTimes)}! Please try again!`);
      player.restart();
      status.restart();
      generateEnemies();
    }
  }

  /** Render game status. */
  render() {
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(Resources.get('images/Heart.png'), 400 - 50 * i, 420);
    }
    ctx.fillText('Level: ' + this.level, 20, 550);
    ctx.fillText('Best:  ' + this.best, 20, 580);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies.
// Place the player object in a variable called player.
// Place all game information in a variable called status.

const player = new Player();
const status = new Status();
generateEnemies();

// Add listeners for key presses.
document.addEventListener('keydown', function(e) {
  player.handleKeyDown(AllowedKeys[e.code]);
});

document.addEventListener('keyup', function(e) {
  player.handleKeyUp(AllowedKeys[e.code]);
});
