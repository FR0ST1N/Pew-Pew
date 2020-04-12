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

/** @file Movement for enemies */
class EnemyMovement extends EnemyAnimationHelper {
  /**
   * @param {Sprite} sprite
   * @param {SpriteConfig} spriteConfig
   * @param {Position} position
   */
  constructor(sprite, spriteConfig, position) {
    super();
    this.sprite = sprite;
    this.spriteConfig = spriteConfig;
    this.position = position;
    this.playerPosition = null;
  }

  /**
   * enemy motion logic
   * @override
   */
  _Movement() {
    if (this.checkHealthAndDespawn()) {
      return; /* do not compute movement & trigger movement
              if enemy is despawned */
    }
    const self = this;
    let position = null;
    /* diff between player and given position */
    const getyAxisDiff = function(y) {
      let yaxisDiff = self.playerPosition.y - y;
      if (yaxisDiff < 0) {
        yaxisDiff = yaxisDiff * -1;
      } return yaxisDiff;
    };

    let frames = 0; /* frames to stop infinite loop*/
    while (frames < 100) {
      position = this._directionDecision();/** move more toward player. */
      if (getyAxisDiff(position.y) <= getyAxisDiff(this.position.y)) {
        break;
      } frames++;
    }
    this._enemyPositionUpdate(position);
  }


  /**
   * directionDescion and position Update.
   * @return {Position}
   */
  _directionDecision() {
    const width = 700;
    const height = 500;
    const middleBoundaryx = 300;
    const differenceStep = 4;
    const decisionX = parseFloat((Math.random() * differenceStep - 2));
    const decisionY = parseFloat((Math.random() * differenceStep - 2));
    const boundaryCheck = function(position) {
      if (width < position.x ) {
        position.x = position.x - 10; /* middle boundary line for enemy */
      } else if (height < position.y) {
        position.y = position.y - 10;
      } if (middleBoundaryx > position.x) {
        position.x = position.x + 10;
      } return position;
    };
    return boundaryCheck(new Position(this.position.x + decisionX,
        this.position.y + decisionY));
  }

  /**
   * enenmy changing position.
   * @param {Position} position
   */
  _enemyPositionUpdate(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  /**
   * @param {context} context
   */
  startAnimation(context) {
    this.setContext(context);
  }
}
