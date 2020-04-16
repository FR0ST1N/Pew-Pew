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

/** @file Collision Manager. */
class CollisionManager {
  /**
   * @param {number} playerScale
   * @param {number} shieldScale
   * @param {number} enemyScale
   */
  constructor(playerScale, shieldScale, enemyScale) {
    this.playerScale = playerScale;
    this.shieldScale = shieldScale;
    this.enemyScale = enemyScale;
  }
  /**
   * @typedef {Object} position
   * @property {number} x
   * @property {number} y
   */

  /**
   * Check for bullet collision with player/enemy.
   * @param {position} targetPosition
   * @param {boolean} [outline=false]
   * @return {boolean}
   */
  _isColliding(targetPosition, outline = false) {
    const SOURCE = {
      x: this.position.x,
      y: this.position.y,
      width: this.size * this.scale,
      height: this.size * this.scale,
    };
    const TARGET = {
      x: targetPosition.x,
      y: targetPosition.y,
      width: targetDimensions.width,
      height: targetDimensions.height,
    };
    if (outline) {
      this.ctx.beginPath();
      this.ctx.rect(SOURCE.x, SOURCE.y, SOURCE.width, SOURCE.height);
      this.ctx.stroke();
    }
    return CollisionDetection.detect(SOURCE, TARGET);
  }
}
