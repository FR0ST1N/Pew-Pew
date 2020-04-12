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

/** @file Enemy animation helper */
class animationHelper extends Timer {
  /**
   * @param {number} animationTime
   * @param {Function} callback
   */
  constructor(animationTime, callback = null) {
    super(animationTime);
    this.callback = callback;
  }

  /**
   * wrapper Draw.
   * @return {Object} this
   */
  wDraw() {
    if (this.sprite != null) {
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
    return this;
  }

  /**
   * makes decisions whether to redraw,
   * based on the fps defined.
   * @return {Object} this
   */
  incrementFrame() {
    this.stepTimer()._Movement();
    (this.callback && this.isTimeToAnimate()) && this.callback();
    return this;
  }

  /**
   * set context before using wDraw
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }
}
