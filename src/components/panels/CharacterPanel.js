import {Characters, CharacterBackground} from '../../constants.js';

/**
 * Character panel.
 * @constructor
 */
export default class CharacterPanel {
  constructor() {
    this.visible = false;
    this.selector = 'images/Selector.png';
    this.sprite = null;
    this.char = Characters.map((char) =>
      'images/char-' + char + '.png'
    );
    this.currentChar = 0;
    this.unlockedChar = 0;
  }

  /**
   * Show the character panel.
   * @param {number} currentChar Image of current character.
   * @param {number} unlockedChar Number of unlocked characters.
   */
  show(currentChar, unlockedChar) {
    this.visible = true;
    this.sprite = this.char[currentChar];
    this.currentChar = currentChar;
    this.unlockedChar = unlockedChar;
  }

  hide() {
    this.visible = false;
    this.sprite = null;
  }

  last() {
    this.currentChar = this.currentChar > 0 ? this.currentChar - 1 : 4;
    this.sprite = this.currentChar < this.unlockedChar ? this.char[this.currentChar] :
      'images/char-' + Characters[this.currentChar] + '-gray.png';
  }

  next() {
    this.currentChar = this.currentChar < 4 ? this.currentChar + 1 : 0;
    this.sprite = this.currentChar < this.unlockedChar ? this.char[this.currentChar] :
      'images/char-' + Characters[this.currentChar] + '-gray.png';
  }

  render() {
    if (this.visible) {
      ctx.save();
      ctx.fillStyle='#AAA';
      ctx.fillRect(0, 0, 505, 404);
      ctx.restore();
      ctx.fillText(CharacterBackground[this.currentChar], 20, 50);
      ctx.fillText('Press [x] to close.', 20, 100);
      ctx.drawImage(res.get(this.selector), 201, 180);
      ctx.drawImage(res.get(this.sprite), 201, 180);
    }
  }
}
