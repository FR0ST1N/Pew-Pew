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

/** All bullet movements are implemented here */
class BulletMovement extends BulletAnimationHelper {
  /** constructor*/
  constructor() {
    super();
    this.playerMode = false;
  }

  /** override this method in inherited class */
  fire() { }

  /**
   * Straight along the x axis.
   */
  straight() {
    this.position.x = this.position.x - this.speed;
  }

  /**
   * based on the defined pattern, that specific function is called.
   * @override
   */
  _Movement() {
    if (this.position != null) {
      if (this.playerMode) {/* Hack, no time :() */
        this._playerBulletMotion();
        return;
      }
      eval('this.' + this.pattern + '()');
    }
  }

  /**
   * follows enemie's position at the time of firing the bullet.
   * & despawns on reaching position if it didnt encounter player
   * till that time.
   * @return {void}
   */
  follow() {
    if (this.playerPositionSnap == null) {
      return this.straight();
    }
    let xAxis = this.playerPositionSnap.x - this.position.x;
    let yAxis = this.playerPositionSnap.y - this.position.y;
    const length = Math.sqrt((yAxis * yAxis) + (xAxis * xAxis));
    /*
     * despawn bullet after reaching its follow position
     * right to left, so sub works need to change this if more complex gameplay
     */
    if (xAxis > -10 && yAxis > -10 && !this.playerMode) {
      this.despawn();
    }
    xAxis = xAxis / length;
    yAxis = yAxis / length;
    if (this.position != null) {
      this.position.x += xAxis * this.speed;
      this.position.y += yAxis * this.speed;
    }
  }

  /**
   * player bullet movement
   * set the bullet mode to belong to player.
   */
  setPlayerMode() {
    this.playerMode = true;
  }

  /**
   * @return {boolean} - true if player mode
   */
  isPlayerMode() {
    return this.playerMode;
  }

  /**
   * player bullet moves from left to right
   */
  _playerBulletMotion() {
    this.position.x = this.position.x + this.speed;
  }
}
