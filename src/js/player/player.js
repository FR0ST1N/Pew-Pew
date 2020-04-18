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

/** @file Contains basic controls and other player functions. */
class Player {
  /**
   * @typedef {Object} spriteSheet
   * @property {HTMLImageElement} image Sprite sheet.
   * @property {number} spriteSize Size of each sprite(x = y).
   * @property {number} rows No. of rows in sprite sheet.
   * @property {number} columns No. of columns in sprite sheet.
   */

  /**
   * @typedef {Object} canvasSize
   * @property {number} width
   * @property {number} height
   */

  /**
   * @typedef {Object} playerKeys
   * @property {number} left Left movement.
   * @property {number} up Up movement.
   * @property {number} right Right movement.
   * @property {number} down Down movement.
   * @property {number} pew Fire.
   * @property {number} absorb Absorb incoming bullet.
   */

  /**
   * @param {spriteSheet} spriteSheet Player sprite sheet.
   * @param {string[]} spriteNames List of unique names for each sprite.
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {playerKeys} keys Keys for player control and action.
   * @param {HTMLImageElement[]} images Player images.
   * @param {number} [lives=3] Player's life count.
   * @param {number} [maxBulletSize=5] Max bullets player can hold.
   */
  constructor(
      spriteSheet,
      spriteNames,
      ctx,
      canvasSize,
      keys,
      images,
      lives = 3,
      maxBulletSize = 5
  ) {
    spriteSheet.image = images[0];
    this.spriteSheet = spriteSheet;
    this.spriteNames = spriteNames;
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.keys = keys;
    this.images = images;
    this.lives = lives;
    this.maxBulletSize = maxBulletSize;
    this.bulletCount = 5;
    this.absorbState = false;
    this.pressed = {
      left: false,
      up: false,
      right: false,
      down: false,
      pew: false,
      absorb: false,
    };
    this.scale = {
      player: 2,
      barrier: 3,
    };
    this.position = {
      x: 15,
      y: (canvasSize.height / 2) -
          (spriteSheet.spriteSize * this.scale.player) / 2,
    };
    this.playerSpriteSheet = new SpriteSheet(
        spriteSheet.image,
        spriteSheet.spriteSize
    );
    this.playerAnimator = new PlayerAnimator();
    this.bulletManager = new BulletManager();
    this.movement = {
      boundUp: -30,
      boundLeft: 10,
      boundRight: 70,
      boundDown: 45,
      move: 5,
    };
  }

  /** Player initialization. */
  init() {
    this.playerSpriteSheet.addSpriteBulk(
        this.spriteNames,
        this.spriteSheet.rows,
        this.spriteSheet.columns
    );
    this._startInputListeners();
  }

  /**
   * Handle player movement.
   * Called in render method.
   */
  playerMovement() {
    if (this.pressed.left &&
          this.position.x > this.movement.boundLeft) {
      this.position.x -= this.movement.move;
    } else if (this.pressed.right &&
          this.position.x <
          this.canvasSize.width - this.movement.boundRight) {
      this.position.x += this.movement.move;
    } else if (this.pressed.up &&
          this.position.y > this.movement.boundUp) {
      this.position.y -= this.movement.move;
    } else if (this.pressed.down &&
          this.position.y <
          this.canvasSize.height - this.movement.boundDown) {
      this.position.y += this.movement.move;
    }
  }

  /**
   * Draw a single player frame.
   * @param {Bullet[]} bullets
   * @param {number} lives
   * @param {number} bulletCount
   */
  _drawFrame(bullets, lives, bulletCount) {
    this.lives = lives;
    this.bulletCount = bulletCount;
    const STATE = this.playerAnimator.state;
    if (Util.exitFire(this.pressed.pew, STATE)) {
      this.pressed.pew = false;
    }
    if (this.pressed.absorb) {
      this.playerAnimator.absorbAnimation();
    } else if (this.pressed.pew) {
      this.playerAnimator.fireAnimation();
    } else if (Util.isIdleAnim(STATE)) {
      this.playerAnimator.idleAnimation();
    }
    /* Draw player in canvas */
    Util.imgDrawCall(
        this.ctx,
        this.playerSpriteSheet,
        this.spriteNames[STATE],
        this.spriteSheet.spriteSize,
        this.position.x,
        this.position.y,
        this.scale.player
    );
    if (this.pressed.absorb === true &&
        this.bulletCount >= this.maxBulletSize) {
      this._absorbKeyUp(new KeyboardEvent('keyup', {'code': this.keys.absorb}));
    }
    /* Draw barrier on absorb */
    if (this.pressed.absorb) {
      const CORRECTION = Util.getBarrierPosition(
          this.scale.player,
          this.scale.barrier,
          this.spriteSheet.spriteSize
      );
      const X = this.position.x - CORRECTION;
      const Y = this.position.y - CORRECTION;
      Util.imgDrawCall(
          this.ctx,
          this.playerSpriteSheet,
          this.spriteNames[6],
          this.spriteSheet.spriteSize,
          X,
          Y,
          this.scale.barrier
      );
    }
    /* Draw bullets */
    this.bulletManager.draw(bullets);
    /* Increment frame counter */
    this.playerAnimator.incrementFrame = 1;
  }

  /** Listens for input from player. */
  _startInputListeners() {
    /* Movement */
    document.addEventListener('keydown', this._moveKey.bind(this), false);
    document.addEventListener('keyup', this._moveKey.bind(this), false);
    /* Fire */
    document.addEventListener('keydown', this._fireKeyDown.bind(this), false);
    /* Absorb */
    document.addEventListener('keydown', this._absorbKeyDown.bind(this), false);
    document.addEventListener('keyup', this._absorbKeyUp.bind(this), false);
  }

  /** Stop listening for inputs from player. */
  _stopInputListeners() {
    /* Movement */
    document.removeEventListener('keydown', this._moveKey.bind(this),
        false);
    document.removeEventListener('keyup', this._moveKey.bind(this), false);
    /* Fire */
    document.removeEventListener('keydown', this._fireKeyDown.bind(this),
        false);
    /* Absorb */
    document.removeEventListener('keydown', this._absorbKeyDown.bind(this),
        false);
    document.removeEventListener('keyup', this._absorbKeyUp.bind(this), false);
  }

  /**
   * Player movements on key up and down.
   * @param {KeyboardEvent} event
   */
  _moveKey(event) {
    let value;
    if (event.type == 'keydown') {
      value = true;
    } else if (event.type == 'keyup') {
      value = false;
    }
    switch (event.code) {
      case this.keys.left:
        this.pressed.left = value;
        break;
      case this.keys.right:
        this.pressed.right = value;
        break;
      case this.keys.up:
        this.pressed.up = value;
        break;
      case this.keys.down:
        this.pressed.down = value;
        break;
    }
  }

  /**
   * Fire on key down.
   * @param {KeyboardEvent} event
   */
  _fireKeyDown(event) {
    /* Block continuous fire and don't fire on absorbing bullets */
    if (event.repeat || this.pressed.absorb) {
      return;
    }
    /* Just for testing */
    /* if (event.code === this.keys.pew) {
      this.decrementLife();
    } */
    if (event.code === this.keys.pew && this.bulletCount > 0) {
      this.decrementBulletCount();
      this._fireBullet();
      /* Begin fire animation. */
      this.playerAnimator.resetFrameCounter();
      this.pressed.pew = true;
      this.playerAnimator.fireAnimation();
      AudioEffects.playPlayerPewSound();
    }
  }

  /**
   * Adds a bullet to bullet manager.
   */
  _fireBullet() {
    this.bulletManager.addBullet(new Bullet(
        {
          x: this.position.x + 35,
          y: this.position.y + 35,
        },
        this.images[1],
        1,
        this.ctx,
        this.canvasSize,
        1,
        true)
    );
  }

  /**
   * Absorb on key down.
   * @param {KeyboardEvent} event
   */
  _absorbKeyDown(event) {
    if (event.code === this.keys.absorb &&
        this.bulletCount < this.maxBulletSize) {
      this.pressed.absorb = true;
    }
  }

  /**
   * Absorb on key up.
   * @param {KeyboardEvent} event
   */
  _absorbKeyUp(event) {
    if (event.code === this.keys.absorb && this.pressed.absorb) {
      this.pressed.absorb = false;
      this.playerAnimator.resetFrameCounter();
      this.playerAnimator.returnToIdle(4, 5);
    }
  }

  /** Called when player is dead. */
  destroy() {
    this.position = null;
    this.bulletCount = 0;
    this._stopInputListeners();
  }

  /** Decrements bullet count if > 0 */
  decrementBulletCount() {
    if (this.bulletCount > 0) {
      this.bulletCount--;
    }
  }
}
