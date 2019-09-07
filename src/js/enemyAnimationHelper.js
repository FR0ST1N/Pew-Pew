/**
 * base on the stare of the enemy object,
 * performs the correct animation.
 */
class EnemyAnimationHelper extends animationHelper {
  /**
   * 
   * @param {*} totalFrames
   * @param {*} framesForNextAnimation
   */
  constructor(totalFrames, framesForNextAnimation) {
    super(totalFrames, framesForNextAnimation);
    this.fireState = false;
    this._subAnimationState =false;
    this._workingState = null;
  }

  /**
   * objectUpdate.
   * @override
   */
  objectUpdate() {
    if (AnimationTimer.NOFRAME) 
      this.currentFrame = 0;
    else if (this.fireState) 
      this._fireAnimation();
    else
      this._idleAnimation();
    this.postObjectUpdate();
  }

  /**  
   *  if fire state is toggled, automatically performs
   *  configured animation through sprite config then
   *  toggles firemode back off.
   */
  _fireAnimation() {
    if (!this._subAnimationState) {
      this._subAnimationState = true;
      this._workingState = this.spriteConfig.motion_2.slice(0);
    }
    if (Array.isArray(this._workingState) && this._workingState.length) {
      this.currentFrame = this._workingState.shift();
    }
    else {
      this._subAnimationState = false;
      this.fireState = false;
    }
  }

  /**
   *  performs the idle animation, configured through spriteconfig._
   */
  _idleAnimation() {
    if (!this._subAnimationState) {
      this._subAnimationState = true;
      this._workingState = this.spriteConfig.motion_1.slice(0);
    }
    if (Array.isArray(this._workingState) && this._workingState.length) {
      this.currentFrame = this._workingState.shift();
    }
    else {
      this._subAnimationState = false;
    }
  }


  /**
   * @return {boolean}
   */
  triggerFireState() {
    this.fireState = true;
    return this.fireState;
  }

  /**
   * @return {boolean}
   */
  getFireState() {
    return this.fireState;
  }
}
