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

/** @file Utility methods for player. */
class Util {
  /**
   * @param {number} playerScale Player Scale.
   * @param {number} barrierScale Barrier Scale.
   * @param {number} size Sprite Size.
   * @return {number} Size difference between barrier and player.
   */
  static getBarrierPosition(playerScale, barrierScale, size) {
    const DIFF = barrierScale - playerScale;
    return (size * DIFF) / 2;
  }

  /**
   * Checks if idle animation is playing.
   * @param {number} state Animation state.
   * @return {boolean}
   */
  static isIdleAnim(state) {
    if (state === 0 || state === 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Decides when to go back to idle anim form fire.
   * @param {boolean} fire
   * @param {number} state
   * @return {boolean}
   */
  static exitFire(fire, state) {
    if (fire && this.isIdleAnim(state)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * drawImage() Helper.
   * @param {CanvasRenderingContext2D} ctx
   * @param {SpriteSheet} spriteSheet
   * @param {string} spriteName
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {number} scale
   */
  static imgDrawCall(ctx, spriteSheet, spriteName, size, x, y, scale) {
    const SPRITE = spriteSheet.getSprite(spriteName);
    if (SPRITE != undefined) {
      ctx.drawImage(
          spriteSheet.image,
          SPRITE.x,
          SPRITE.y,
          size,
          size,
          x,
          y,
          size * scale,
          size * scale
      );
    }
  }
}
