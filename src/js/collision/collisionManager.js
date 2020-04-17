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
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} playerDimensions
   * @param {Object} enemyDimensions
   */
  constructor(ctx, playerDimensions, enemyDimensions) {
    this.ctx = ctx;
    this.playerDimensions = playerDimensions;
    this.enemyDimensions = enemyDimensions;
    this.enemies = [];
    this.enemyBullets = [];
    this.playerBullets = [];
  }

  /**
   * @param {Bullet[]} playerBullets
   * @param {Bullet[]} enemyBullets
   * @param {Enemy[]} enemies
   */
  checkCollision(playerBullets, enemyBullets, enemies) {
    this.playerBullets = playerBullets;
    this.enemyBullets = enemyBullets;
    this.enemies = enemies;
    this._checkPlayerBulletsCollision();
    /* Removes dead enemies from array */
    this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
    this.playerBullets = this.playerBullets.filter(
        (bullet) => !bullet.destroy);
  }

  /** Checks for collision with enemies. */
  _checkPlayerBulletsCollision() {
    for (let i = 0; i < this.playerBullets.length; i++) {
      if (!this.playerBullets[i].destroy) {
        for (let j = 0; j < this.enemies.length; j++) {
          if (this.enemies[j].health > 0 &&
              this._isColliding(
                  {
                    x: this.enemies[j].position.x,
                    y: this.enemies[j].position.y,
                  },
                  this.enemyDimensions,
                  this.playerBullets[i])) {
            this.enemies[j].health -= 1;
            this.playerBullets[i].destroy = true;
          }
        }
      }
    }
  }

  /**
   * Removes enemy from current array.
   * @param {number} index
   */
  _removeEnemy(index) {
    this.enemies.splice(index, 1);
  }

  /**
   * @typedef {Object} position
   * @property {number} x
   * @property {number} y
   */

  /**
   * Check for bullet collision with player/enemy.
   * Outline drawn is not accurate because position is updated after this call.
   * @param {position} targetPosition
   * @param {Object} targetDimensions
   * @param {Bullet} bullet
   * @param {boolean} [outline=false]
   * @return {boolean}
   */
  _isColliding(targetPosition, targetDimensions, bullet,
      outline = true) {
    const SOURCE = {
      x: bullet.position.x,
      y: bullet.position.y,
      width: bullet.size * bullet.scale,
      height: bullet.size,
    };
    const TARGET = {
      x: targetPosition.x,
      y: targetPosition.y,
      width: targetDimensions.width,
      height: targetDimensions.height,
    };
    if (outline) {
      this.ctx.save();
      this.ctx.strokeStyle = '#39FF14';
      this.ctx.beginPath();
      this.ctx.rect(TARGET.x, TARGET.y, TARGET.width, TARGET.height);
      this.ctx.rect(SOURCE.x, SOURCE.y, SOURCE.width, SOURCE.height);
      this.ctx.stroke();
      this.ctx.restore();
    }
    return CollisionDetection.detect(SOURCE, TARGET);
  }
}
