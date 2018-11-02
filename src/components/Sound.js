/**
   * Play sounds.
   * @constructor
   */
export default class Sound {
  /**
     * Constructor of the Sound class.
     * @param {string} src Source audio file.
     * @param {number} playbackRate Playback rate.
     * @param {boolean} loop Should the audio be played again and again.
     */
  constructor(src, playbackRate = 1.0, loop = false) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    if (loop) this.sound.setAttribute('loop', 'infinite');
    this.sound.playbackRate = playbackRate;
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
  }

  /**
   * Change playback rate.
   * @param {*} rate Playback rate.
   */
  changeRate(rate) {
    this.stop();
    this.sound.playbackRate = rate;
    this.play();
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}
