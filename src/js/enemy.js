
/**
 * all the enemy movement logic goes here
 */
class EnemyMovement extends EnemyAnimationHelper {

  /**
   * @param {Sprite} sprite
   * @param {SpriteConfig} spriteConfig
   * @param {Position} position
   */
  constructor(sprite, spriteConfig, position) {
    super(60, 30); /* this is the config, that defines frames per second */
    this.sprite = sprite;
    this.spriteConfig = spriteConfig;
    this.position = position;
  }

  /**
   * @param {context} context
   */
  startAnimation(context) {
    this.setContext(context);
    this.objectAnimation();
  }
}

/** base class for enemy */
class Enemy extends EnemyMovement {
/**
 * 
 * @param {Sprite} sprite
 * @param {SpriteConfig} spriteConfig
 * @param {Position} position
 * @param {Bullet} bullet
 * @param {number} health
 */
  constructor(sprite, spriteConfig, position = null,
      bullet = Bullet.DEFAULT, health = 1 ) {
    super(sprite, spriteConfig, position);
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
