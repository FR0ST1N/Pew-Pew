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

/** Enemy animation healper */
class animationHelper extends Timer {
  /**
   * @param {number} animationTime
   * @param {number} MovementTime
   */
  constructor(animationTime, MovementTime) {
    super(animationTime, MovementTime);
    this.animationTimerId = null;
  }

  /**
   * wrapper Draw.
   */
  wDraw() {
    if (this.sprite == null) {
      return;
    }
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
    } this.objectAnimation();
  }

  /**
   * set context before using wDraw
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }

  /**
   * object movement loop
   */
  objectAnimation() {
    this.animationTimerId = setTimeout(() => {
      this.postObjectUpdate();
    }, 1);
  }
}
