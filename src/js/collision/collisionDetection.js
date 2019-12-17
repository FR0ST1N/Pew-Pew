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

/** Collision detection class. */
class CollisionDetection {
  /**
   * @typedef {Object} colliderObject
   * @property {number} x
   * @property {number} y
   * @property {number} width
   * @property {number} height
   */

  /**
   * 2D box collider.
   * @param {colliderObject} colliderObject1
   * @param {colliderObject} colliderObject2
   * @return {boolean}
   */
  static detect(colliderObject1, colliderObject2) {
    let result = false;
    if (
      colliderObject1.x < colliderObject2.x + colliderObject2.width &&
      colliderObject1.x + colliderObject1.width > colliderObject2.x &&
      colliderObject1.y < colliderObject2.y + colliderObject2.height &&
      colliderObject1.y + colliderObject1.height > colliderObject2.y
    ) {
      result = true;
    }
    return result;
  }
}
