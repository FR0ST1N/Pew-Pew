/** enemySprite Properties */
class Sprite {
/**
 *
 * @param {*} image
 * @param {*} spriteSize
 * @param {*} totalSpriteSize
 * @param {*} individualSpriteSize
 * @param {*} scaleFactorX
 * @param {*} scaleFactorY
 */
  constructor(imagename, totalSpriteSize = 96, individualSpriteSize = 32, individualSpriteX =32, individualSpriteY = 32, scaleFactorX = 3, scaleFactorY = 3 ) {
    const image = new Image();
    image.src = 'images/'+imagename;
    this.image = image;
    this.individualSpriteSize = 32;
    this.individualSpriteX = individualSpriteX;
    this.individualSpriteY = individualSpriteY;
    this.scaleFactorX = 3;
    this.scaleFactorY = 3;
  }
}

/**
 */
class SpriteConfig {
  /**
   *
   * @param {*} idle
   * @param {*} fire
   */
  constructor(motion_1 = [], motion_2 = []) {
    this.motion_1 = motion_1;
    this.motion_2 = motion_2;
  }

  static get MOTION_1() {
    return 0;
  }

  static get MOTION_2() {
    return 1;
  }
}
