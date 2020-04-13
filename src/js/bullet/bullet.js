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

/** @file Main bullet class */
class Bullet {
  /**
   * @param {Object} position x and y.
   * @param {HTMLImageElement} image Image for bullet.
   * @param {number} speed Bullet speed.
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {number} [damage=1] Bullet damage to collided object.
   * @param {boolean} [isPlayer=false] Does the bullet belong to player?
   */
  constructor(
      position,
      image,
      speed,
      ctx,
      canvasSize,
      damage = 1,
      isPlayer = false
  ) {
    this.position = position;
    this.image = image;
    this.speed = speed;
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.damage = damage;
    this.isPlayer = isPlayer;
    this.destroy = false;
    this.size = 5;
    this.scale = 5;
  }

  /** Draw function for bullets. */
  draw() {
    if (!this.destroy && this._isInsideCanvas()) {
      if (!this.isPlayer) {
        this.position.x -= this.speed;
      } else {
        this.position.x += this.speed;
      }
      this.ctx.drawImage(
          this.image,
          0,
          0,
          this.size,
          this.size,
          this.position.x,
          this.position.y,
          this.size * this.scale,
          this.size * this.scale
      );
    } else if (!this.destroy) {
      this._destroy();
    }
  }

  /**
   * Check if player is inside canvas.
   * @return {boolean}
   */
  _isInsideCanvas() {
    const EXTRA = 20;
    const B = {
      x1: 0 - EXTRA,
      y1: 0 - EXTRA,
      x2: this.canvasSize.width + EXTRA,
      y2: this.canvasSize.height + EXTRA,
    };
    const P = {
      x: this.position.x,
      y: this.position.y,
    };
    if (P.x > B.x1 && P.y > B.y1 && P.x < B.x2 && P.y < B.y2) {
      return true;
    } else {
      return false;
    }
  }

  /** Called when bullet is out of canvas. */
  _destroy() {
    console.log('bullet destroyed');
    this.position = null;
    this.image = null;
    this.speed = null;
    this.isPlayer = null;
    this.ctx = null;
    this.destroy = true;
  }

  /**
   * @typedef {Object} position
   * @property {number} x
   * @property {number} y
   */

  /**
   * detects collision with the given player coordinates
   * @param {position} playerPosition
   * @return {boolean}
   */
  collideDetect(playerPosition) {
    if (playerPosition.x == null || this.position.x == null) {
      return false; /* dont proceed, if despawned */
    }
    const bulletObject = {'x': this.position.x,
      'y': this.position.y,
      'width': this.sprite.individualSpriteSize * this.sprite.scaleFactorX,
      'height': this.sprite.individualSpriteSize * this.sprite.scaleFactorY,
    };
    const playerObject = {
      'x': playerPosition.x,
      'y': playerPosition.y,
      'width': 32 * 2,
      'height': 32 * 2,
    };
    return CollisionDetection.detect(bulletObject, playerObject);
  }
}
