/**
 * @file handles bullet animation update, controls bullet's fps.
 * @author bluepie <gopinath2nr@gmail.com>
 */
class BulletAnimationHelper extends animationHelper {
  /**
   * both bullet animation and enemy animation use
   * the same method at core.
   */
  constructor() {
    super(5); /* bullet movement timer per 100ms */
    this.explodeState = false;
  }


  /**
   * specific to bullet animation.
   * if bullet had fancy animaton and stuff, it goes inside here.
   * @override
   */
  _Movement() {
  }

  /**
   * @override
   * based on the defined pattern, that specific function is called.
   */
  objectUpdate() {
    eval('this.'+this.pattern+'()');
  }
}
