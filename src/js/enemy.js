/**
 * 2dimensional postion inrelation to canvas.
 * @todo discussion and aggrement.
 */
class Position {
  /**
   * @param {number} xcordinates
   * @param {number} ycordinates
   */
  constructor(xcordinates = 0, ycordinates = 0) {
    this.x = xcordinates;
    this.y = ycordinates;
  }
}

/**
 * enemyImage Object.
 */
class EnemyImage {
  /**
   * @param {string} name
   * @return {object} image
   */
  constructor(name) {
    const image= new Image();
    image.width = '50';
    image.height = '50';
    image.src = 'images/'+name;
    return image;
  }
}

/** base class for enemy */
class Enemy extends animationHelper {
  /**
   * @param {string} imagename
   * @param {Position} position
   * @param {Bullet} bullet
   * @param {number} health
   */
  constructor(imagename = 'enemy.png', position = null, bullet = Bullet.DEFAULT, health = 1 ) {
    super();
    this.image = new EnemyImage(imagename);
    this.position = position;
    this.bullet = bullet;
    this.health = health;
  }
}
