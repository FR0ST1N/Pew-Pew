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

/** @file Main enemy class */
class Enemy {
  /**
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {spriteSheet} spriteSheet Enemy sprite sheet.
   * @param {position} position x and y.
   * @param {number} health Enemy health.
   * @param {number} movementSpeed Movement speed.
   * @param {number} bulletSpeed Speed of each bullet.
   * @param {number} interval Interval between each bullet fired.
   * @param {number} movementIndex To call enemy movement function.
   */
  constructor(
      ctx,
      canvasSize,
      spriteSheet,
      position,
      health,
      movementSpeed,
      bulletSpeed,
      interval,
      movementIndex
  ) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.spriteSheet = spriteSheet;
    this.position = position;
    this.health = health;
    this.movementSpeed = movementSpeed;
    this.bulletSpeed = bulletSpeed;
    this.interval = interval;
    this.movementIndex = movementIndex;
    this.enemyAnimator = new Animator();
    this.enemySpriteSheet = new SpriteSheet(
        spriteSheet.image,
        spriteSheet.spriteSize
    );
    this.spriteNames = ['idle1', 'idle2', 'fire1', 'fire2'];
    this.enemySpriteSheet.addSpriteBulk(
        this.spriteNames,
        spriteSheet.rows,
        spriteSheet.columns
    );
    this.fire = false;
    this.scale = 1.5;
    this.up = true;
  }

  /** Draw method for the enemy */
  draw() {
    const STATE = this.enemyAnimator.state;
    if (Util.exitFire(this.fire, STATE)) {
      this.fire = false;
    }
    if (!this.fire) {
      this.enemyAnimator.idleAnimation();
    } else if (this.fire) {
      this.enemyAnimator.fireAnimation();
    }
    this._updatePosition();
    Util.imgDrawCall(
        this.ctx,
        this.enemySpriteSheet,
        this.spriteNames[STATE],
        this.spriteSheet.spriteSize,
        this.position.x,
        this.position.y,
        this.scale
    );
    this.enemyAnimator.incrementFrame = 1;
  }

  /**
   * Tells ememy to move up or down.
   * @param {number} minPos
   * @param {number} maxPos
   */
  _setUpDownTriggers(minPos, maxPos) {
    if (this.position.y == minPos) {
      this.up = true;
    } else if (this.position.y == maxPos) {
      this.up = false;
    }
  }

  /** Enemy Movement. Update position fo the enemy. */
  _updatePosition() {
    switch (this.movementIndex) {
      case 0:
        this.position = EnemyMovement.default(this.position.x,
            this.position.y);
        break;
      case 1:
        this._setUpDownTriggers(0, this.canvasSize.height - 50);
        this.position = EnemyMovement.upDown(this.position, this.up,
            this.movementSpeed);
        /* if (this.up) {
          this.position = EnemyMovement.up(this.position.x,
              this.position.y, this.movementSpeed);
        } else {
          this.position = EnemyMovement.down(this.position.x,
              this.position.y, this.movementSpeed);
        } */
        break;
    }
  }

  /** Fire method for enemy */
  pew() {
    this.enemyAnimator.resetFrameCounter();
    this.fire = true;
    this.enemyAnimator.fireAnimation();
    AudioEffects.playEnemyPewSound();
  }
}
