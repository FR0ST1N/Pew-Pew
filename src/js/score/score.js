/*
 * Pew-Pew
 * Copyright (C) 2019 Frostin
 *
 * This file is part of Pew-Pew.
 *
 * Pew-Pew is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pew-Pew is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pew-Pew.  If not, see <http://www.gnu.org/licenses/>.
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
