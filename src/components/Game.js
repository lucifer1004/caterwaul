import Enemy from './Enemy.js';
import Info from './Info.js';
import Player from './Player.js';
import Scene from './Scene.js';
import Sound from './Sound.js';
import {Characters, KeyLevels} from '../constants.js';

const PlayerSpeed = 200;

/**
 * Main class of the game.
 * @constructor
 */
export default class Game {
  /** Constructor of the Game class. */
  constructor() {
    this.enemies = []; // Enemies
    this.info = new Info(); // Game information
    this.paused = false; // Whether the game is paused
    this.player = new Player(); // Player
    this.scene = new Scene(); // Scene
  }

  /** Check if the player is at the border */
  checkBorder() {
    this.player.checkX();
    this.player.checkY();
  }

  /** Check if any enemy hits the player. */
  checkCollision() {
    this.enemies.forEach((enemy) => {
      if (!enemy.visible) return;
      const dx = enemy.x - this.player.x;
      const dy = enemy.y - this.player.y;
      if (Math.abs(dx) <= 51 && Math.abs(dy) <= 51) {
        this.loseLife();
        enemy.makeInvisible();
      }
    });
  }

  /** Check if the player loses. */
  checkLose() {
    if (this.info.lives === 0) {
      console.log('You lose!');
      this.restartFromOne();
      this.pause();
    }
  }

  /** Check if the player wins. */
  checkWin() {
    if (this.player.y <= -19) {
      this.levelUp();
      this.unlockChar();
      this.restart();
    }
  }

  /** Check all states. */
  checkStates() {
    this.checkBorder();
    this.checkCollision();
    this.checkLose();
    this.checkWin();
  }

  /** Generate enemies. */
  generateEnemies() {
    this.enemies.length = 0;
    const enemyCount = 2 * this.info.level + Math.round(2 * Math.random());
    for (let i = 0; i < enemyCount; i++) {
      this.enemies.push(new Enemy(this.info.level));
    }
  }

  /**
   * Triggered when any arrow key is pressed.
   * @param {string} key The pressed key,
  */
  handleKeyDown(key) {
    switch (key) {
    case 'left':
      this.player.vx = -1 * PlayerSpeed;
      break;
    case 'right':
      this.player.vx = PlayerSpeed;
      break;
    case 'up':
      this.player.vy = -1 * PlayerSpeed;
      break;
    case 'down':
      this.player.vy = PlayerSpeed;
      break;
    case 'p':
      if (!this.paused) {
        this.pause();
        backgroundSound.stop();
      }
      break;
    default:
      if (this.paused) this.resume();
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
      this.player.vx = 0;
      break;
    case 'right':
      this.player.vx = 0;
      break;
    case 'up':
      this.player.vy = 0;
      break;
    case 'down':
      this.player.vy = 0;
      break;
    case 'c':
      this.player.changeChar();
      break;
    default:
    }
  }

  /** Triggered when current level is cleared. */
  levelUp() {
    levelUpSound.play();
    backgroundSound.changeRate(1 + 0.3 * this.info.level);
    this.info.levelUp();
  }

  /** Lose a life. */
  loseLife() {
    crashSound.play();
    this.info.loseLife();
  }

  /** Pause the game. */
  pause() {
    this.paused = true;
    this.info.pause();
    this.enemies.forEach((enemy) => enemy.save());
  }

  /** Resume the game. */
  resume() {
    this.paused = false;
    this.info.resume();
    this.enemies.forEach((enemy) => enemy.restore());
  }

  /** Restart the game from level 1. */
  restartFromOne() {
    backgroundSound.changeRate(1.0);
    this.enemies = [];
    this.info.reset();
    this.player.reset();
    this.generateEnemies();
  }

  /** Restart the game. */
  restart() {
    this.enemies = [];
    this.player.reset();
    this.generateEnemies();
  }

  /** Handle character unlock. */
  unlockChar() {
    if (KeyLevels.find((level) => {
      return level === this.info.best;
    }) !== undefined) {
      this.player.unlockChar();
    }
  }

  /**
   * Update the game scene.
   * @param {number} dt Time tick
   */
  update(dt) {
    this.checkStates();
    this.enemies.forEach((enemy) => enemy.update(dt));
    this.player.update(dt);
  }

  /** Render the game scene. */
  render() {
    this.scene.render();
    this.enemies.forEach((enemy) => enemy.render());
    this.player.render();
    this.info.render();
  }
}
