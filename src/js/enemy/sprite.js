/**
 * @file enemySprite & bulletSprite Properties
 * @author bluepie <gopinath2nr@gmail.com>
 * */
class Sprite {
/**
 * Properties of each image sprite
 * @param {string} imagename
 * @param {number} rows
 * @param {number} columns
 * @param {number} totalSpriteSize
 * @param {number} individualSpriteSize
 * @param {Position} position - position of one image inside sprite.start-(0,0)
 * @param {number} scaleFactorX
 * @param {number} scaleFactorY
 */
  constructor(imagename, rows, columns,
      totalSpriteSize = 96,
      individualSpriteSize = 32,
      position,
      scaleFactorX = 3,
      scaleFactorY = 3) {
    const image = new Image();
    image.src = 'images/'+imagename;
    this.image = image;
    this.rows = rows;
    this.columns = columns;
    this.individualSpriteSize = individualSpriteSize;
    this.totalSpriteSize = totalSpriteSize;
    this.position = position;
    this.scaleFactorX = scaleFactorX;
    this.scaleFactorY = scaleFactorY;
  }
}

/**
 * Multiple images inside sprite are are
 * animated with the help of this SpriteConfig
 */
class SpriteConfig {
  /**
   * sprite config, for animations.
   * @param {Array} motion1
   * @param {Array} motion2
   * @param {Sprite} sprite
   */
  constructor(motion1 = [], motion2 = [], sprite) {
    this.MOTION_1 = motion1;
    this.MOTION_2 = motion2;
    this.spriteSheet = null;
    this.sprite = sprite;
    this._extractSprites();
  }

  /**
   * uses sprite_sheet and exports the data inside spriteConfig
   */
  _extractSprites() {
    let spriteNames = this.MOTION_1.slice(0);
    spriteNames = spriteNames.concat(this.MOTION_2);
    this.spriteSheet = new SpriteSheet(this.sprite.image,
        this.sprite.individualSpriteSize);
    this.spriteSheet.addSpriteBulk(spriteNames,
        this.sprite.rows, this.sprite.columns);
  }
}
