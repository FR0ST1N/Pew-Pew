/** Contains basic controls and other player functions(life, bullet stack). */
class Player {
  /** @param {number=} lives player's life count. */
  constructor(lives = 1) {
    this.lives = lives;
  }

  /**
   * Reduces player's life by 1.
   * @return {number} Remaining life after decrement.
   */
  decrementLife() {
    if (this.lives > 0) {
      this.lives--;
    }
    return this.lives;
  }
}
