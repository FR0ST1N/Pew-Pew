/**
 * @file all enemy animation related logic & methods
 * @author bluepie <gopinath2nr@gmail.com>
 */
class EnemyAnimationHelper extends animationHelper {
  /**
   * constructor
   */
  constructor() {
    super(120, 12);
    this.fireState = false;
    this._subAnimationState = false;
    this._workingState = null;
  }

  /**
   * objectUpdate.
   * @override
   */
  objectUpdate() {
    if (this.checkHealthAndDespawn()) {
      return;/* do not trigger animations if enemy is despawned */
    }
    this._Movement();
    if (this.fireState) {
      this._fireAnimation();
    } else {
      this._idleAnimation();
    }
  }

  /**
   *  if fire state is toggled, automatically performs
   *  configured animation through sprite config then
   *  toggles firemode back off.
   */
  _fireAnimation() {
    if (!this._subAnimationState) {
      this._workingState = this.spriteConfig.MOTION_2.slice(0);
    }
    if (Array.isArray(this._workingState) && this._workingState.length) {
      this.sprite.position = this.spriteConfig
          .spriteSheet.getSpritePosition(this._workingState.shift());
      this._subAnimationState = this.fireState = (
        Array.isArray(this._workingState) && this._workingState.length);
    }
  }

  /**
   *  performs the idle animation, configured through spriteconfig._
   */
  _idleAnimation() {
    if (!this._subAnimationState) {
      this._workingState = this.spriteConfig.MOTION_1.slice(0);
    }
    if (Array.isArray(this._workingState) && this._workingState.length) {
      this.sprite.position = this.spriteConfig
          .spriteSheet.getSpritePosition(this._workingState.shift());
      this._subAnimationState = (Array.isArray(this._workingState) &&
       this._workingState.length);
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
