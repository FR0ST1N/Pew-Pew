/** enemySprite Properties */
class Sprite {
/**
 * 
 * @param {*} imagename
 * @param {*} rows
 * @param {*} columns
 * @param {*} totalSpriteSize
 * @param {*} individualSpriteSize
 * @param {Position} position - position of one image inside sprite. start is 0,0
 * @param {*} scaleFactorX
 * @param {*} scaleFactorY
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
 */
class SpriteConfig {
  /**
   * 
   * @param {*} motion1
   * @param {*} motion2
   * @param {*} sprite
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
    this.spriteSheet =  new SpriteSheet(this.sprite.image, this.sprite.individualSpriteSize);
    this.spriteSheet.addSpriteBulk(spriteNames, this.sprite.rows, this.sprite.columns);

  }

}
