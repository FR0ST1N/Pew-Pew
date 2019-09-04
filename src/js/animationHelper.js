/** basic animation wrapper for making life simpler */
class animationHelper {
  /**
   * @param {context} context
   */
  wDraw() {
    this.context.drawImage(this.image, this.position.x, this.position.y);
  }

  /**
   * set context before using drawImage
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }
}
