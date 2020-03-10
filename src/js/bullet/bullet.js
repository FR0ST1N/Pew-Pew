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
class Bullet extends BulletMovement {
  /**
   * @param {Sprite} sprite
   * @param {Position|null} startposition - where the bullet originates
   * @param {BulletPattern|string} pattern
   * @param {number} speed - 1 is the slowest bullet possible
   * @param {number} damage
   */
  constructor(sprite = null,
      startposition = null,
      pattern = BulletPattern.FOLLOW,
      speed = 1,
      damage = 1) {
    super();
    this.sprite = sprite;
    this.position = startposition;
    this.pattern = pattern;
    this.speed = speed;
    this.damage = damage;
    this.playerPositionSnap = null;
  }

  /**
   * returns default bullet, which is straight
   */
  static get DEFAULT() {
    return new Bullet();
  }

  /**
     * the postion that the bullet should travel towards,
     * bullet explodes at end?(inrelation with bulletPattern)
     *  or just goes offscreen
     * @param {Position} position
     * @return {Position}
     */
  setBulletTarget(position) {
    this.targetPosition = position;
    return this.targetPosition;
  }

  /**
     * if you are insane, and teleport a bullet for some reason.
     * @param {Position} position,
     * @return {Position}
     */
  setBulletPostition(position) {
    this.position = position;
    return this.position;
  }

  /**
   * player Position at the time of generating bullet.
   * @param {Position} position
   */
  setPlayerPositionSnap(position) {
    this.playerPositionSnap = position;
  }

  /**
   * getbulletPosition
   * @return {Position}
   */
  getBulletPosition() {
    return this.position;
  }

  /**
   * @override
   */
  fire() {
    AudioEffects.playEnemyPewSound();
    this.objectAnimation(this.context);
  }

  /**
   * remove bullet
   */
  despawn() {
    this.position = null;
    this.sprite = null;
    this.position = null;
    this.pattern = null;
    this.speed = null;
    this.damage = null;
    this.playerPositionSnap = null;
    /* clear motion animation for bullet */
    clearTimeout(this.animationTimerId);
  }

  /**
   * detects collision with the given player coordinates
  * @param {Position} playerPosition
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
