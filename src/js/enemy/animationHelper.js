/** basic animation wrapper for making life simpler */
class animationHelper extends Timer {
  /**
   * @param {number} totalFrames
   * @param {number} fpsOfEnemy
   */
  constructor(totalFrames, fpsOfEnemy) {
    super(totalFrames);
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
   * override this method in child classe, for animation logic.
   * when it is time for next frame, this method will be called.
   */
  objectUpdate() {
  }

  /**
   * makes decisions whether to redraw,
   * based on the fps defined.
   */
  postObjectUpdate() {
    if (this.stepTimer()) {
      this.objectUpdate();
    }
    requestAnimationFrame(this.objectAnimation.bind(this));
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
    requestAnimationFrame(this.postObjectUpdate.bind(this));
  }
}
