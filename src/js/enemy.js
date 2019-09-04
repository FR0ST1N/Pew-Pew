
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

/**
 * enemy creator
 */
class EnemySpawner {

  /**
   * currently used as testing enemies
   * @param {context} context
   */
  constructor(context) {
    const enemyPosition = new Position(300, 200);
    const bullet = Bullet.DEFAULT; /* straight bullet*/
    bullet.setBulletPostition(new Position(enemyPosition.x-20, enemyPosition.y));
    const enemy = new Enemy('enemy.png', enemyPosition, bullet, 1);
    enemy.setContext(context);
    enemy.bullet.setContext(context);
    setInterval(function() {
      context.clearRect(0,0,800,600);
      enemy.wDraw();
      enemy.bullet.wDraw();
    }, 10);
  }
}
