/**
 * handles bullet animation update, controls bullet's fps.
 */
class BulletAnimationHelper extends animationHelper   { 

  /**
   * 
   */
  constructor() {
    super(5); /* fps */
    this.explodeState = false;
  }

  /**
   * wrapper Draw.
   */
  wDraw() {
    if (this.context == undefined)
      return;
    this.context.drawImage(
        this.sprite.image,
        this.sprite.position.x,
        this.sprite.position.y,
        this.sprite.individualSpriteSize,
        this.sprite.individualSpriteSize,
        this.position.x, this.position.y,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorX,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorY
    );
  }


  /**
   * @override
   */
  _Movement() {
    this.straight();
  }

  /**
   * @override
   */
  objectUpdate() {
    this.straight();
  }
}