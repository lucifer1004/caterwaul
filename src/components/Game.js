import CharacterPanel from './panels/CharacterPanel.js';
import Enemy from './Enemy.js';
import Info from './Info.js';
import Player from './Player.js';
import Scene from './Scene.js';
import {KeyLevels} from '../constants.js';

/**
 * Main class of the game.
 * @constructor
 */
export default class Game {
  /** Constructor of the Game class. */
  constructor() {
    this.charPanel = new CharacterPanel(); // Character panel
    this.enemies = []; // Enemies
    this.info = new Info(); // Game information
    this.paused = false; // Whether the game is paused
    this.player = new Player(); // Player
    this.scene = new Scene(); // Scene
    this.state = 'main'; // State of the game: main, char...
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
    switch (this.state) {
    case 'main':
      switch (key) {
      case 'left':
        this.player.startX(-1);
        break;
      case 'right':
        this.player.startX(1);
        break;
      case 'up':
        this.player.startY(-1);
        break;
      case 'down':
        this.player.startY(1);
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
      break;
    default:
    }
  }

  /**
    * Triggered when a key is released.
    * @param {string} key The released key.
  */
  handleKeyUp(key) {
    switch (this.state) {
    case 'main':
      switch (key) {
      case 'left':
        this.player.stopX();
        break;
      case 'right':
        this.player.stopX();
        break;
      case 'up':
        this.player.stopY();
        break;
      case 'down':
        this.player.stopY();
        break;
      case 'c':
        this.player.changeChar();
        break;
      case 'a':
        this.openCharPanel();
        break;
      default:
      }
      break;
    case 'char':
      switch (key) {
      case 'left':
        this.charPanel.last();
        break;
      case 'right':
        this.charPanel.next();
        break;
      case 'x':
        this.closeCharPanel();
        break;
      }
      break;
    default:
    }
  }

  /** Triggered when current level is cleared. */
  levelUp() {
    levelUpSound.play();
    backgroundSound.changeRate(1 + 0.2 * this.info.level);
    this.info.levelUp();
  }

  /** Lose a life. */
  loseLife() {
    crashSound.play();
    this.info.loseLife();
  }

  /** Open character panel. */
  openCharPanel() {
    this.charPanel.show(this.player.currentChar, this.player.unlockedChar);
    this.state = 'char';
    this.pause();
  }

  /** Close character panel. */
  closeCharPanel() {
    this.charPanel.hide();
    this.state = 'main';
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
    this.charPanel.render();
  }
}
