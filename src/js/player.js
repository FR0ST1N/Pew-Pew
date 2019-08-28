/** Contains basic controls and other player functions(life, bullet stack). */
class Player {
  /**
   * @param {number} [lives=1] Player's life count.
   * @param {number} [maxStackSize=5] Max bullets stack can hold.
   */
  constructor(lives = 1, maxStackSize = 5) {
    this.lives = lives;
    this.maxStackSize = maxStackSize;
    this.bulletStack = [];
  }

  /**
   * Decrement player's life by 1.
   * @return {number} Remaining life after decrement.
   */
  decrementLife() {
    if (this.lives > 0) {
      this.lives--;
    }
    return this.lives;
  }

  /**
   * @typedef {Object} bulletStackResult
   * @property {number|undefined} value Bullet ID.
   * @property {boolean} success Operation result.
   */

  /**
   * Checks size and adds bullet to the stack.
   * @param {number|undefined} bulletId Bullet type.
   * @return {bulletStackResult}
   */
  pushBullet(bulletId) {
    let pushed = false;
    if (this.bulletStack.length < this.maxStackSize) {
      /*
       * Need condidion here to not push when no bullet contact.
       * Just perform action(animation).
       */
      this.bulletStack.push(bulletId);
      pushed = true;
    }
    return {value: bulletId, success: pushed};
  }

  /**
   * Removes the last added bullet from stack and returns it.
   * @return {bulletStackResult}
   */
  popBullet() {
    let popped = false;
    let bulletId;
    if (this.bulletStack.length > 0) {
      bulletId = this.bulletStack.pop();
      popped = true;
    }
    return {value: bulletId, success: popped};
  }
}
