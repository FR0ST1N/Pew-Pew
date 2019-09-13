/**
 * @file Main player file. Contains player animations and other stuffs.
 * @author Frostin<iamfrostin@gmail.com>
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
      maxBulletSize = 5,
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
    this.absorbState =false;
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
    this.animState = 0;
    this.frameCounter = 0;
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
    if (this.pressed.absorb) {
      this._absorbAnimation();
    } else if (this.pressed.pew) {
      this._fireAnimation();
    } else if (PlayerUtil.isIdleAnim(this.animState)) {
      this._idleAnimation();
    }
    /* Draw bullet */
    this._bulletDraw();
    /* Draw player in canvas */
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.playerSpriteSheet,
        this.spriteNames[this.animState],
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

  /**
   * Player movement on key down.
   * @param {KeyboardEvent} event
   */
  _moveKeyDown(event) {
    switch (event.keyCode) {
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
    switch (event.keyCode) {
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
    if (event.keyCode === this.keys.pew && this.bulletCount > 0) {
      this.decrementBulletCount();
      this._fireBullet();
      if (this.animState === 0) {
        this.animState = 2;
      } else if (this.animState === 1) {
        this.animState = 3;
      }
      this.frameCounter = 0;
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
    const bullet = new Bullet(bulletSprite, new Position(this.position.x+35,
        this.position.y+45), this.bulletpattern, 5, 1);
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
   * @param {Bullet} Playerbullet
   * @return {boolean}
   */
  _bulletsDraw(Playerbullet) {
    if (Playerbullet != null || Playerbullet != undefined) {
      if (!this.isBulletInsideCanvas(Playerbullet)) {
        Playerbullet.despawn();
        return false;
      } /* collision detection with player before draw */
      this._checkCollisionWithEnemy(Playerbullet);
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
    if (bullet.getBulletPosition().x < 800 /* check only right side*/
       && bullet.getBulletPosition().y < 800) {
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
    if (event.keyCode === this.keys.absorb) {
      this.pressed.absorb = true;
    }
  }

  /**
   * Absorb on key up.
   * @param {KeyboardEvent} event
   */
  _absorbKeyUp(event) {
    if (event.keyCode === this.keys.absorb) {
      this.pressed.absorb = false;
      this._returnToIdle(4, 5);
    }
  }

  /**
   * Decrement player's life by 1.
   * @return {number} Remaining life after decrement.
   */
  decrementLife() {
    if (this.lives > 0) {
      this.lives--;
    }
    return this.lives;
  }

  /** Increments bullet count if it can hold */
  incrementBulletCount() {
    if (this.bulletCount < this.maxBulletSize) {
      this.bulletCount++;
    }
  }

  /** Decrements bullet count if > 0 */
  decrementBulletCount() {
    if (this.bulletCount > 0) {
      this.bulletCount--;
    }
  }
}
