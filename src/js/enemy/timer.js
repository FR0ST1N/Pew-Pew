/** 
 * @file Animation properties that all object in canvas should have,
 * ex |------------------------| represent total time
 *    |-----x------x------x-----| represent time to next frame.
 * @author bluepie <gopinath2nr@gmail.com>
 * */
class Timer {
  /**
   * @param {number} totalTime
   */
  constructor(totalTime) {
    this.timeToChangeAnimation = totalTime;
    this.motionTime = Number.parseInt(this.timeToChangeAnimation/2);
    this.timer = 0;
  }

  /**
   * reset the timer,
   * @return {void}
   */
  _resetTimer() {
    this.timer = 0;
  }

  /**
   * @return {void}
   */
  stepTimer() {
    this.timer += 1;
  }

  /**
   * @return {boolean}
   */
  isTimeToAnimate() {
    if (this.timer == this.timeToChangeAnimation) {
      this._resetTimer();
      return true;
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  isTimeToMove() {
    const fallBelow = Number.parseInt(this.timer/this.motionTime);
    if (this.motionTime == fallBelow || fallBelow == 1 ) {
      return true;
    } else {
      return false;
    }
  }
}
