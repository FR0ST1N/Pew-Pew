/** Handles the UI stuff. */
class UserInterface {
  /** @param {CanvasRenderingContext2D} ctx */
  constructor(ctx) {
    this.ctx = ctx;
    this.healthSpriteSheet = new SpriteSheet(
        'images/ui_heart.png',
        5
    );
    this.stackSpriteSheet = new SpriteSheet(
        'images/ui_stack.png',
        7
    );
    this.names = ['a', 'b', 'c', 'd', 'e', 'f'];
  }

  /** Initialize UI. */
  init() {
    this.healthSpriteSheet.addSpriteBulk(
        this.names.slice(0, 4),
        1,
        4
    );
    this.stackSpriteSheet.addSpriteBulk(
        this.names,
        1,
        6
    );
  }

  /**
   * Draw UI.
   * @param {number} currHealth Player's current health/lives.
   * @param {number} stackLen Bullet stack length.
   */
  draw(currHealth, stackLen) {
    this.ctx.save();
    this.ctx.globalAlpha = 0.5;
    this._drawHealth(currHealth);
    this._drawBulletStack(stackLen);
    this.ctx.restore();
  }

  /**
   * Draw player health.
   * @param {number} value Player's current health.
   */
  _drawHealth(value) {
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.healthSpriteSheet,
        this.names[value],
        this.healthSpriteSheet.spriteSize,
        10,
        550,
        7
    );
  }

  /**
   * Draw layer's bullet stack.
   * @param {number} value Bullet Stack length.
   */
  _drawBulletStack(value) {
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.stackSpriteSheet,
        this.names[value],
        this.stackSpriteSheet.spriteSize,
        50,
        540,
        7
    );
  }
}
