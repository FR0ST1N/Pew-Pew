/** Animation properties that all object in canvas should have,
 * ex |------------------------| represent total time
 *    |-----x------x------x-----| represent time to next frame.
 * */
class Timer {
  /**
   * @param {*} totalTime 
   */
  constructor(totalTime) {
    this.totalTime = totalTime;
    this.timer = 0;
  }

  /**
   * reset the timer,
   */
  _resetTimer() {
    this.timer = 0;
  }

  /**
   * @return {boolean}
   */
  stepTimer() {
    this.timer += 1;
    if (this.timer == this.totalTime) {
      this._resetTimer();
      return true;
    } else {
      return false;
    }
  }

}
