/**
 * @file Animation properties that all object in canvas should have,
 * ex |------------------------| represent total time
 *    |-----x------x------x-----| represent time to next frame.
 * @author bluepie <gopinath2nr@gmail.com>
 * */
class Timer {
  /**
   * @param {number} animationTime -if 0 timer wont run.
   * @param {number} MovementTime - if 0 timer wont run.
   */
  constructor(animationTime, MovementTime) {
    this.timeToChangeAnimation = animationTime;
    this.timeToChangeMotion = MovementTime;
    this.animationTimer = 0;
    this.motionTimer = 0;
  }

  /**
   * reset the animation timer,
   * @return {void}
   */
  _resetAnimationTimer() {
    this.animationTimer = 0;
  }


  /**
   * reset the animation timer,
   * @return {void}
   */
  _resetMotionTimer() {
    this.motionTimer = 0;
  }

  /**
   * @return {void}
   */
  stepTimer() {
    if (this.timeToChangeAnimation != 0) {
      this.animationTimer += 1;
    } if (this.timeToChangeMotion != 0) {
      this.motionTimer += 1;
    }
  }

  /**
   * @return {boolean}
   */
  isTimeToAnimate() {
    if (this.timeToChangeAnimation == 0) {
      return true;
    } if (this.animationTimer == this.timeToChangeAnimation) {
      this._resetAnimationTimer();
      return true;
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  isTimeToMove() {
    if (this.timeToChangeMotion == 0) {
      return true;
    } if (this.motionTimer == this.timeToChangeMotion) {
      this._resetMotionTimer();
      return true;
    } else {
      return false;
    }
  }
}
