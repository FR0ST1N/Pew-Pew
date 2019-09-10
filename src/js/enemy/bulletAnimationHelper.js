/**
 * handles bullet animation update, controls bullet's fps.
 */
class BulletAnimationHelper extends animationHelper   { 

  /**
   * 
   */
  constructor() {
    super(10); /* fps */
    this.explodeState = false;
  }

  /**
   * @override
   */
  wDraw() {
    if (this.context == undefined)
      return;
    this.context.drawImage(
        this.image,
        this.position.x,
        this.position.y
    );
  }

  /**
   * @override
   */
  objectUpdate() {
    this.straight();
  }
}