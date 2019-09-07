/** Animation properties that all object in canvas should have,
 * ex |------------------------| represent total time
 *    |-----x------x------x-----| represent time to next frame.
 *    |-----x------x---|
 * */
class AnimationTimer {
/**
 * @param {*} totalTime
 * @param {*} timeIntervalToUpdate
 */
  constructor(totalTime, timeIntervalToUpdate) {
    this.totalTime = totalTime;
    this.timeIntervalToUpdate = timeIntervalToUpdate;
    this.timer = 0;
  }

  /**
   * reset the timer, Object framesPersecond.
   */
  _resetTimer() {
    this.timer = 0;
  }

  /**
   * @return {boolean}
   */
  stepTimer() {
    this.timer += 1;
    if (this.timer == this.timeIntervalToUpdate || this.timer == 1)
      return true;
    else if (this.timer == this.totalTime)
      this._resetTimer();
    return false;
  }

  /**
   * check if frame initiated.
   */
  static get NOFRAME() {
    return 0;
  }
}
