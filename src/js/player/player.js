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

/** Contains basic controls and other player functions. */
class Player {
  /**
   * @typedef {Object} spriteSheet
   * @property {string} image Sprite sheet path.
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
   * @param {number} [lives=3] Player's life count.
   * @param {number} [maxBulletSize=5] Max bullets player can hold.
   */
  constructor(
      spriteSheet,
      spriteNames,
      ctx,
      canvasSize,
      keys,
      lives = 3,
      maxBulletSize = 5
  ) {
    this.spriteSheet = spriteSheet;
    this.spriteNames = spriteNames;
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.keys = keys;
    this.lives = lives;
    this.maxBulletSize = maxBulletSize;
    this.bulletCount = 0;
    this.firedBulletStack = [];
    this.level = null;
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
      player: 3,
      barrier: 3.5,
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
    // this.animState = 0;
    // this.frameCounter = 0;
    this.playerAnimator = new PlayerAnimator();
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
    const MOVE = 4;
    const BOUND = 10;
    if (
      this.pressed.left &&
        PlayerUtil.bound(
            'left',
            MOVE,
            BOUND,
            this.spriteSheet.spriteSize,
            this.scale.player,
            this.position,
            this.canvasSize
        )
    ) {
      this.position.x -= MOVE;
    } else if (
      this.pressed.right &&
        PlayerUtil.bound(
            'right',
            MOVE,
            BOUND,
            this.spriteSheet.spriteSize,
            this.scale.player,
            this.position,
            this.canvasSize
        )
    ) {
      this.position.x += MOVE;
    } else if (
      this.pressed.up &&
        PlayerUtil.bound(
            'up',
            MOVE,
            BOUND,
            this.spriteSheet.spriteSize,
            this.scale.player,
            this.position,
            this.canvasSize
        )
    ) {
      this.position.y -= MOVE;
    } else if (
      this.pressed.down &&
        PlayerUtil.bound(
            'down',
            MOVE,
            BOUND,
            this.spriteSheet.spriteSize,
            this.scale.player,
            this.position,
            this.canvasSize
        )
    ) {
      this.position.y += MOVE;
    }
  }

  /** Draw a single player frame. */
  _drawFrame() {
    const STATE = this.playerAnimator.state;
    if (this.pressed.pew && PlayerUtil.isIdleAnim(STATE)) {
      this.pressed.pew = false;
    }
    if (this.pressed.absorb) {
      this.playerAnimator.absorbAnimation();
    } else if (this.pressed.pew) {
      this.playerAnimator.fireAnimation();
    } else if (PlayerUtil.isIdleAnim(STATE)) {
      this.playerAnimator.idleAnimation();
    }
    /* Draw bullet */
    this._bulletDraw();
    /* Draw player in canvas */
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.playerSpriteSheet,
        this.spriteNames[STATE],
        this.spriteSheet.spriteSize,
        this.position.x,
        this.position.y,
        this.scale.player
    );
    /* Draw barrier on absorb */
    if (this.pressed.absorb) {
      const CORRECTION = PlayerUtil.getBarrierPosition(
          this.scale.player,
          this.scale.barrier,
          this.spriteSheet.spriteSize
      );
      const X = this.position.x - CORRECTION;
      const Y = this.position.y - CORRECTION;
      PlayerUtil.imgDrawCall(
          this.ctx,
          this.playerSpriteSheet,
          this.spriteNames[6],
          this.spriteSheet.spriteSize,
          X,
          Y,
          this.scale.barrier
      );
    }
    this.playerAnimator.incrementFrame = 1;
  }

  /** Idle animation logic */
  _idleAnimation() {
    if (this.frameCounter <= 15) {
      this.animState = 0;
    } else if (this.frameCounter >= 16 && this.frameCounter <= 30) {
      this.animState = 1;
    }
    if (this.frameCounter === 30) {
      this.frameCounter = 0;
    }
  }

  /** Fire animation logic */
  _fireAnimation() {
    const ANIM_TIME = 7;
    if (this.frameCounter <= ANIM_TIME) {
      if (this.animState === 0) {
        this.animState = 2;
      } else if (this.animState === 1) {
        this.animState = 3;
      }
    } else if (this.frameCounter > ANIM_TIME) {
      this._returnToIdle(2, 3);
      this.pressed.pew = false;
    }
  }

  /** Absorb animation */
  _absorbAnimation() {
    if (this.frameCounter <= 15) {
      this.animState = 4;
    } else if (this.frameCounter >= 16 && this.frameCounter <= 30) {
      this.animState = 5;
    }
    if (this.frameCounter === 30) {
      this.frameCounter = 0;
    }
  }

  /**
   * Returns back to idle animation.
   * @param {number} a State 1.
   * @param {number} b State 2.
   */
  _returnToIdle(a, b) {
    if (this.animState === a) {
      this.animState = 1;
      /* For smooth transition to idle state */
      this.frameCounter = 15;
    } else if (this.animState === b) {
      this.animState = 0;
      this.frameCounter = 0;
    }
  }

  /** Listens for input from player. */
  _startInputListeners() {
    /* Movement */
    document.addEventListener('keydown', this._moveKeyDown.bind(this), false);
    document.addEventListener('keyup', this._moveKeyUp.bind(this), false);
    /* Fire */
    document.addEventListener('keydown', this._fireKeyDown.bind(this), false);
    /* Absorb */
    document.addEventListener('keydown', this._absorbKeyDown.bind(this), false);
    document.addEventListener('keyup', this._absorbKeyUp.bind(this), false);
  }

  /** Stop listening for inputs from player. */
  _stopInputListeners() {
    /* Movement */
    document.removeEventListener('keydown', this._moveKeyDown.bind(this),
        false);
    document.removeEventListener('keyup', this._moveKeyUp.bind(this), false);
    /* Fire */
    document.removeEventListener('keydown', this._fireKeyDown.bind(this),
        false);
    /* Absorb */
    document.removeEventListener('keydown', this._absorbKeyDown.bind(this),
        false);
    document.removeEventListener('keyup', this._absorbKeyUp.bind(this), false);
  }

  /**
   * Player movement on key down.
   * @param {KeyboardEvent} event
   */
  _moveKeyDown(event) {
    switch (event.code) {
      case this.keys.left:
        this.pressed.left = true;
        break;
      case this.keys.right:
        this.pressed.right = true;
        break;
      case this.keys.up:
        this.pressed.up = true;
        break;
      case this.keys.down:
        this.pressed.down = true;
        break;
    }
  }

  /**
   * Player movement on key up.
   * @param {KeyboardEvent} event
   */
  _moveKeyUp(event) {
    switch (event.code) {
      case this.keys.left:
        this.pressed.left = false;
        break;
      case this.keys.right:
        this.pressed.right = false;
        break;
      case this.keys.up:
        this.pressed.up = false;
        break;
      case this.keys.down:
        this.pressed.down = false;
        break;
    }
  }

  /**
   * @param {Level} level
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * Fire on key down.
   * @param {KeyboardEvent} event
   */
  _fireKeyDown(event) {
    /* Block continuous fire */
    if (event.repeat) {
      return;
    }
    /* Just for testing */
    /* if (event.code === this.keys.pew) {
      this.decrementLife();
    } */
    if (event.code === this.keys.pew && this.bulletCount > 0) {
      this.decrementBulletCount();
      this._fireBullet();
      /* if (this.animState === 0) {
        this.animState = 2;
      } else if (this.animState === 1) {
        this.animState = 3;
      } */
      this.playerAnimator.resetFrameCounter();
      this.pressed.pew = true;
      AudioEffects.playPlayerPewSound();
    }
  }

  /**
   * fire player bullet
   */
  _fireBullet() {
    const bulletSprite = new Sprite('player_bullet.png', 1, 5,
        5, 5, new Position(0, 0), 10, 10);
    const bullet = new Bullet(bulletSprite, new Position(this.position.x + 35,
        this.position.y + 45), this.bulletpattern, 5, 1);
    bullet.setContext(this.ctx);
    bullet.setPlayerMode();
    bullet.fire();
    this.firedBulletStack.push(bullet);
  }

  /**
   * draws bullets.
   */
  _bulletDraw() {
    this.firedBulletStack = this.firedBulletStack
        .filter(this._bulletsDraw.bind(this));
  }

  /**
   * @param {Bullet} playerBullet
   * @return {boolean}
   */
  _bulletsDraw(playerBullet) {
    if (playerBullet != null || playerBullet != undefined) {
      if (!this.isBulletInsideCanvas(playerBullet)) {
        playerBullet.despawn();
        return false;
      } /* collision detection with player before draw */
      this._checkCollisionWithEnemy(playerBullet);
      return true;
    }
  }

  /**
   * check bullets postion in-relattion to canvas.
   * @param {Bullet} bullet
   * @return {boolean}
   */
  isBulletInsideCanvas(bullet) {
    if (bullet.position == null) {
      return false;
    }
    if (bullet.getBulletPosition().x < 800 && /* check only right side*/
       bullet.getBulletPosition().y < 800) {
      return true;
    } return false;
  }

  /**
   * @param {Bullet} bullet
   */
  _checkCollisionWithEnemy(bullet) {
    this._playerBulletCollisionWithEnemy(bullet);
  }

  /**
   * @param {Bullet} bullet
   */
  _playerBulletCollisionWithEnemy(bullet) {
    this.level.drawableObjects.forEach((enemy) => {
      if (enemy.collideDetect(bullet)) {
        enemy.takeDamage(bullet.damage);
        bullet.despawn();
      } bullet.wDraw();
    });
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
    this.level = null;
    this.position = null;
    this.bulletCount = 0;
    this._stopInputListeners();
  }

  /**
   * Decrement player's life by 1.
   * @return {number} Remaining life after decrement.
   */
  decrementLife() {
    if (this.lives > 0) {
      this.lives--;
      AudioEffects.playPlayerDamageSound();
    }
    return this.lives;
  }

  /** Increments bullet count if it can hold */
  incrementBulletCount() {
    if (this.bulletCount < this.maxBulletSize) {
      this.bulletCount++;
      AudioEffects.playBarrierSound();
    }
    if (this.pressed.absorb === true &&
        this.bulletCount >= this.maxBulletSize) {
      this._absorbKeyUp(new KeyboardEvent('keyup', {'code': this.keys.absorb}));
    }
  }

  /** Decrements bullet count if > 0 */
  decrementBulletCount() {
    if (this.bulletCount > 0) {
      this.bulletCount--;
    }
  }
}
