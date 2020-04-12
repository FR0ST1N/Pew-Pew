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
class Enemy extends EnemyMovement {
/**
 * @param {ui} ui
 * @param {Score} score instance of score
 * @param {Sprite} sprite
 * @param {SpriteConfig} spriteConfig
 * @param {Position} position
 * @param {number} health
 * @param {number} rateOfFire - intervel between each bullet fire,
 *            multiplier by 500ms
 */
  constructor(ui, score, sprite, spriteConfig, position = null,
      health = 1, rateOfFire = 500 ) {
    super(sprite, spriteConfig, position);
    this.UI = ui;
    this.health = health;
    this.level = health;
    this.rateOfFire = rateOfFire;
    this.bullet = [];
    this.score = score;
    this.bulletpattern = BulletPattern.DEFAULT;
    /* enable this to auto fire based on rateOfFire */
    this.autoshoot = false;
    /* store timeoutid to later remove on despawn */
    this.autoShootTimeOutId = null;
  }

  /**
   * enemy shoots new bullet.
   */
  shoot() {
    /* if enemy is already in fire animation, just return */
    if (this.getFireState()) {
      if (this.autoshoot) {
        this._autoshoot();
      }
      return;
    }
    if (this.position == null) {
      this.autoshoot = false; /* async call, thus checking for null */
      return;
    }
    /* if ui state gameover despawn */
    if (this.UI.currentState == this.UI.states.GAMEOVER) {
      this.health = null;
      this.checkHealthAndDespawn();
    }

    /* bullet sprite */
    const bulletSprite = new Sprite('enemy_bullet.png', 1, 5,
        5, 5, new Position(0, 0), 5, 5);
    /* bullet creation */
    const bullet = new Bullet(bulletSprite, new Position(this.position.x - 30,
        this.position.y + 20), this.bulletpattern, 5, 1);
    /* bullet set context from enemy context to draw */
    bullet.setContext(this.context);
    /**
     * set players position at the point of relasing the bullet, this
     * is only required if bulletPattern is set to follow.
     */
    bullet.setPlayerPositionSnap(this.playerPosition);
    /* set fire animation state for enemyObject, */
    this.triggerFireState();
    /* bullet object movement trigger, leaving enemy. */
    bullet.fire();
    /* push bullet to enemy's stack, used while EnemySpawner::draw */
    this.bullet.push(bullet);
    /* autoshoot */
    if (this.autoshoot) {
      this._autoshoot();
    }
  }

  /**
   * automatic enemy shooting.
   */
  _autoshoot() {
    this.autoShootTimeOutId = setTimeout( () => {
      this.shoot();
    }, this.rateOfFire);
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  setPlayerPosition(x, y) {
    this.playerPosition = new Position(x, y);
  }

  /**
   * @param {BulletPattern} bulletPattern
   */
  setBulletPattern(bulletPattern) {
    this.bulletpattern = bulletPattern;
  }

  /**
   * pass the bullet, detected during collision
   * @param {number} damage
   */
  takeDamage(damage) {
    if (this.health > 0) {
      this.health = this.health - damage;
      AudioEffects.playEnemyDamageSound();
    }
  }

  /**
   * collideDetect of enemyObject with given bullet
   * @param {Bullet} bullet
   * @return {boolean}
   */
  collideDetect(bullet) {
    if (this.position == null || bullet.position == null ) {
      return false;
    }
    const bulletObject = {'x': bullet.position.x,
      'y': bullet.position.y,
      'width': bullet.sprite.individualSpriteSize * bullet.sprite.scaleFactorX,
      'height': bullet.sprite.individualSpriteSize * bullet.sprite.scaleFactorY,
    };
    const EnemyObject = {
      'x': this.position.x,
      'y': this.position.y,
      'width': this.sprite.individualSpriteSize * this.sprite.scaleFactorX,
      'height': this.sprite.individualSpriteSize * this.sprite.scaleFactorY,
    };
    return CollisionDetection.detect(bulletObject, EnemyObject);
  }

  /**
   * checks health and despawns enenmy, if enemy health
   * not greater than 0
   * @return {boolean} - true for despawned enemy
   */
  checkHealthAndDespawn() {
    /* enemy instance needs player position at all times*/
    if (this.health == null || this.sprite == null ||
      this.playerPosition == null) {
      return true;
    }
    if (this.health < 1) {
      this.health = null;
      this.rateOfFire = null;
      this.bullet = [];
      this.bulletpattern = null;
      this.autoshoot = false;
      this.position = null;
      this.playerPosition = null;
      /* NOTE: Pass level as param. level(number) must start at 1. */
      /* Set score */
      this.score.setScore(this.level);
      return true;
    } return false;
  }
}
