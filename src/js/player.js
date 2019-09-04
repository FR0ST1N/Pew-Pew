/** Contains basic controls and other player functions(life, bullet stack). */
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
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {playerKeys} keys Keys for player control and action.
   * @param {number} [lives=1] Player's life count.
   * @param {number} [maxStackSize=5] Max bullets stack can hold.
   */
  constructor(spriteSheet, ctx, canvasSize, keys, lives = 1, maxStackSize = 5) {
    this.spriteSheet = spriteSheet;
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.keys = keys;
    this.lives = lives;
    this.maxStackSize = maxStackSize;
    this.bulletStack = [];
    this.pressed = {
      left: false,
      up: false,
      right: false,
      down: false,
    };
    this.position = {
      x: 0,
      y: 0,
    };
    this.spriteNames = [
      'idle1',
      'idle2',
      'push1',
      'push2',
      'shield',
      'pop',
    ];
    this.playerSpriteSheet = new SpriteSheet(
        spriteSheet.image,
        spriteSheet.spriteSize
    );
  }

  /** Player initialization. */
  init() {
    this.playerSpriteSheet.addSpriteBulk(
        this.spriteNames,
        this.spriteSheet.rows,
        this.spriteSheet.columns
    );
    this.startInputListeners();
    this.draw();
  }

  /** Draw player. */
  draw() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    /* Paint BG */
    this.ctx.fillStyle = '#daf3ec';
    this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    /* Change player position */
    const MOVE = 4;
    if (this.pressed.left) {
      this.position.x -= MOVE;
    } else if (this.pressed.right) {
      this.position.x += MOVE;
    } else if (this.pressed.up) {
      this.position.y -= MOVE;
    } else if (this.pressed.down) {
      this.position.y += MOVE;
    }
    /* Draw player in canvas */
    const sprite = this.playerSpriteSheet.getSprite(this.spriteNames[0]);
    const spriteImg = new Image();
    spriteImg.src = this.spriteSheet.image;
    this.ctx.drawImage(
        spriteImg,
        sprite.x,
        sprite.y,
        this.spriteSheet.spriteSize,
        this.spriteSheet.spriteSize,
        this.position.x,
        this.position.y,
        96,
        96
    );
    window.requestAnimationFrame(this.draw.bind(this));
  }

  /** Listens for input from player. */
  startInputListeners() {
    document.addEventListener('keydown', this.moveKeyDown.bind(this), false);
    document.addEventListener('keyup', this.moveKeyUp.bind(this), false);
  }

  /**
   * Player movement on key down.
   * @param {KeyboardEvent} event
   */
  moveKeyDown(event) {
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
  moveKeyUp(event) {
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
   * Decrement player's life by 1.
   * @return {number} Remaining life after decrement.
   */
  decrementLife() {
    if (this.lives > 0) {
      this.lives--;
    }
    return this.lives;
  }

  /**
   * @typedef {Object} bulletStackResult
   * @property {number|undefined} value Bullet ID.
   * @property {boolean} success Operation result.
   */

  /**
   * Checks size and adds bullet to the stack.
   * @param {number|undefined} bulletId Bullet type.
   * @return {bulletStackResult}
   */
  pushBullet(bulletId) {
    let pushed = false;
    if (this.bulletStack.length < this.maxStackSize) {
      /*
       * Need condidion here to not push when no bullet contact.
       * Just perform action(animation).
       */
      this.bulletStack.push(bulletId);
      pushed = true;
    }
    return {value: bulletId, success: pushed};
  }

  /**
   * Removes the last added bullet from stack and returns it.
   * @return {bulletStackResult}
   */
  popBullet() {
    let popped = false;
    let bulletId;
    if (this.bulletStack.length > 0) {
      bulletId = this.bulletStack.pop();
      popped = true;
    }
    return {value: bulletId, success: popped};
  }
}
