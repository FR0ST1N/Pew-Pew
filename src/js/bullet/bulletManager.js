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

/** @file Bullet Manager Class. */
class BulletManager {
  /** Bullet Manager constructor. */
  constructor() {
    this.bullets = [];
  }

  /** Draws all bullets. */
  draw() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].destroy) {
        this.bullets[i].draw();
      } else {
        this._removeBullet(i);
      }
    }
  }

  /**
   * Add bullet to array.
   * @param {Bullet} bullet Bullet class instance.
   */
  addBullet(bullet) {
    this.bullets[this.bullets.length] = bullet;
  }

  /**
   * Remove a bullet from array.
   * @param {number} index Index of the bullet.
   */
  _removeBullet(index) {
    this.bullets.splice(index, 1);
  }
}
