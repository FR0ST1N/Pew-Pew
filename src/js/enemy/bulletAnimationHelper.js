/**
 * handles bullet animation update, controls bullet's fps.
 */
class BulletAnimationHelper extends animationHelper   { 

  /**
   * 
   */
  constructor() {
    super(5); /* bullet movement timer */
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
   * specific to bullet animation.
   * if bullet has fancy animaton and stuff, it goes inside here.
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