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
   * @param {Object} playerAbsorbDimensions
   * @param {Object} enemyDimensions
   */
  constructor(ctx, playerDimensions, playerAbsorbDimensions, enemyDimensions) {
    this.ctx = ctx;
    this.playerDimensions = playerDimensions;
    this.enemyDimensions = enemyDimensions;
    this.playerAbsorbDimensions = playerAbsorbDimensions;
    this.enemies = [];
    this.enemyBullets = [];
    this.playerBullets = [];
    this.playerBulletCount = 0;
    this.playerHealth = 0;
    this.playerPosition = {
      x: 0,
      y: 0,
    };
  }

  /**
   * @param {Bullet[]} playerBullets
   * @param {Bullet[]} enemyBullets
   * @param {position} playerPosition
   * @param {boolean} playerAbsorb
   * @param {Enemy[]} enemies
   * @param {number} playerHealth
   * @param {number} playerBulletCount
   * @param {Score} score
   * @param {number} level
   */
  checkCollision(playerBullets, enemyBullets, playerPosition, playerAbsorb,
      enemies, playerHealth, playerBulletCount, score, level) {
    /* Set values */
    this.playerBullets = playerBullets;
    this.enemyBullets = enemyBullets;
    this.playerPosition = playerPosition;
    this.playerAbsorb = playerAbsorb;
    this.enemies = enemies;
    this.playerHealth = playerHealth;
    this.playerBulletCount = playerBulletCount;
    this.score = score;
    this.level = level;
    /* Check collision */
    this._checkPlayerBulletsCollision();
    this._checkEnemiesBulletsCollision(playerAbsorb);
    /* Filter out stuff */
    this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
    if (this.playerBullets > 0) {
      this.playerBullets = this.playerBullets.filter(
          (bullet) => !bullet.destroy);
    }
    if (this.enemyBullets.length > 0) {
      this.enemyBullets = this.enemyBullets.filter(
          (bullet) => !bullet.destroy);
    }
  }

  /** Checks for collision with enemies. */
  _checkPlayerBulletsCollision() {
    for (let i = 0; i < this.playerBullets.length; i++) {
      if (!this.playerBullets[i].destroy) {
        for (let j = 0; j < this.enemies.length; j++) {
          if (this.enemies[j].health > 0 &&
              this._isColliding(
                  this.enemies[j].position,
                  this.enemyDimensions,
                  this.playerBullets[i])) {
            /* Reduce enemy health and remove bullet */
            this.enemies[j].health -= 1;
            this.playerBullets[i].destroy = true;
            /* If enemy dead then increment score */
            if (this.enemies[j].health <= 0) {
              this.score.setScore(this.level);
            }
            AudioEffects.playEnemyDamageSound();
          }
        }
      }
    }
  }

  /**
   * Checks for collision with player
   * @param {boolean} absorb
   */
  _checkEnemiesBulletsCollision(absorb) {
    for (let i = 0; i < this.enemyBullets.length; i++) {
      if (!this.enemyBullets[i].destroy) {
        /* Set dimension and position */
        let dimension = null;
        let position = null;
        if (!absorb) {
          dimension = this.playerDimensions;
          position = this.playerPosition;
        } else {
          dimension = this.playerAbsorbDimensions;
          position = this._getPlayerBarrierPosition();
        }
        /* Check collision */
        if (this._isColliding(
            position,
            dimension,
            this.enemyBullets[i])) {
          /* Reduce player health or absorb bullet */
          if (absorb) {
            this.playerBulletCount += 1;
            AudioEffects.playBarrierSound();
          } else {
            if (this.playerHealth > 0) {
              this.playerHealth -= 1;
              AudioEffects.playPlayerDamageSound();
            }
          }
          this.enemyBullets[i].destroy = true;
        }
      }
    }
  }

  /**
   * Calculate x and y and player absorb state.
   * @return {position}
   */
  _getPlayerBarrierPosition() {
    const CORRECTION = Util.getBarrierPosition(
        this.playerDimensions.scale,
        this.playerAbsorbDimensions.scale,
        32);
    return {
      x: this.playerPosition.x - CORRECTION,
      y: this.playerPosition.y - CORRECTION,
    };
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
      outline = false) {
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
