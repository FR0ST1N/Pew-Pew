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
    super(0, 4); /* since bullet has no animation logic
                  animation timer is not necessary */
  }

  /**
   * @override
   * specific to bullet animation.
   * if bullet had fancy animaton and stuff, it goes inside here.
   */
  objectUpdate() {

  }
}
