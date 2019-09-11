/** basic animation wrapper for making life simpler */
class animationHelper extends Timer {
  /**
   * @param {number} totalFrames
   * @param {number} fpsOfEnemy
   */
  constructor(totalFrames) {
    super(totalFrames);
  }

  /**
   * wrapper Draw.
   */
  wDraw() {
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
    this.stepTimer();
    if (this.isTimeToMove()) {
      this._Movement();
    } if (this.isTimeToAnimate()) {
      this.objectUpdate();
    } 
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
   * object movement loop,
   * increased settimeout loop & decreased timer counter
   */
  objectAnimation() {
    setTimeout(() => {
      this.postObjectUpdate();
    }, 100);
  }
}