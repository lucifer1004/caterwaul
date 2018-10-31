const myStorage = window.localStorage;
myStorage.setItem('winTimes', 0);
myStorage.setItem('loseTimes', 0);

const EnemyMaxX = 505;
const EnemyMinX = -101;
const PlayerMaxX = 420;
const PlayerMinX = -15;
const PlayerMaxY = 450;
const PlayerMinY = -20;
const allowedKeys = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
};

const allEnemies = [];

const times = (num) => {
  return num === 1 ? 'time' : 'times';
};

const generateEnemies = () => {
  allEnemies.length = 0;
  const enemyCount = 1 + Math.round(5 * Math.random());
  for (let i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
  }
};

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 500 * Math.random();
    this.y = 60 + 180 * Math.random();
    this.vx = 200 * (1 + Math.random()) * (Math.round(Math.random()) - 0.5);
    this.vy = 0;
  }

  handleCollision() {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    if (Math.abs(dx) <= 51 && Math.abs(dy) <= 51) {
      const loseTimes = parseInt(myStorage.getItem('loseTimes'), 10) + 1;
      myStorage.setItem('loseTimes', loseTimes);
      alert(`You have lost ${loseTimes} ${times(loseTimes)}!`);
      player.restart();
    }
  }

  turnX() {
    this.vx = -this.vx;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.handleCollision();
    this.x += dt * this.vx;
    if (this.x > EnemyMaxX) {
      this.turnX();
    }
    if (this.x < EnemyMinX) {
      this.turnX();
    }
    this.y += dt * this.vy;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.x = 200;
    this.y = 450;
    this.vx = 0;
    this.vy = 0;
    this.sprite = 'images/char-boy.png';
  }

  checkX() {
    if (this.x < PlayerMinX && this.vx < 0) this.vx = 0;
    if (this.x > PlayerMaxX && this.vx > 0) this.vx = 0;
  }

  checkY() {
    if (this.y < PlayerMinY && this.vy < 0) this.vy = 0;
    if (this.y > PlayerMaxY && this.vy > 0) this.vy = 0;
  }

  checkBorder() {
    this.checkX();
    this.checkY();
  }

  checkWin() {
    if (this.y <= -19) {
      const winTimes = parseInt(myStorage.getItem('winTimes'), 10) + 1;
      myStorage.setItem('winTimes', winTimes);
      alert(`You have won ${winTimes} ${times(winTimes)}!`);
      this.restart();
    }
  }

  // reset player's position to restart the game
  restart() {
    this.x = 200;
    this.y = 450;
    this.vx = 0;
    this.vy = 0;
    generateEnemies();
  }

  handleMoveStart(direction) {
    switch (direction) {
    case 'left':
      this.vx = -100;
      break;
    case 'right':
      this.vx = 100;
      break;
    case 'up':
      this.vy = -100;
      break;
    case 'down':
      this.vy = 100;
      break;
    default:
    }
    this.checkBorder();
  }

  handleMoveEnd() {
    this.vx = 0;
    this.vy = 0;
  }

  update(dt) {
    this.x += dt * this.vx;
    this.y += dt * this.vy;
    this.checkWin();
    this.checkBorder();
  }


  // Draw the player on the screen.
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
generateEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  player.handleMoveStart(allowedKeys[e.code]);
});

document.addEventListener('keyup', function(e) {
  player.handleMoveEnd(allowedKeys[e.code]);
});
