/**
 * @file Manage player score.
 * @author Frostin <iamfrostin@gmail.com>
 */

/** Score class. */
class Score {
  /** Creates _score variable and sets value to 0 */
  constructor() {
    this._score = 0;
  }

  /**
   * Get current Score.
   * @return {number} Current score.
   */
  getScore() {
    return this._score;
  }

  /**
   * Increment score based on current level.
   * @param {number} level Current level.
   */
  setScore(level) {
    this._score += level;
  }

  /** Reset score to 0. */
  resetScore() {
    this._score = 0;
  }
}
