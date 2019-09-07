/** basic animation wrapper for making life simpler */
class animationHelper extends AnimationTimer {
  /**
   * @param {number} totalFrames
   * @param {number} fpsOfEnemy
   */
  constructor(totalFrames, fpsOfEnemy) {
    super(totalFrames, fpsOfEnemy);
  }

  /**
   * wrapper Draw.
   */
  wDraw() {
    this.context.drawImage(
        this.sprite.image,
        this.sprite.individualSpriteX * this.currentFrame,
        this.sprite.individualSpriteY * this.currentFrame,
        this.sprite.individualSpriteSize,
        this.sprite.individualSpriteSize,
        this.position.x, this.position.y,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorX,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorY
    );
  }

  /**
   * override this method in child classe,
   * but should follow same behaviour
   * (i.e) call postObjectUpdate() after
   * everything is done
   */
  objectUpdate() {
    postObjectUpdate();
  }

  /**
   * makes decisions whether to redraw,
   * based on the fps defined.
   */
  postObjectUpdate() {
    if (this.stepTimer())
      this.wDraw();
    this.objectAnimation();
  }

  /**
   * set context before using drawImage
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }

  /**
   * object movement loop.
   */
  objectAnimation() {
    requestAnimationFrame(this.objectUpdate.bind(this));
  }
}
