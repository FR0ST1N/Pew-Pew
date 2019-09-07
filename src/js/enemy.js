
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
    const sprite = new Sprite('placeholder.png',96,32,32,0,3,3);
    const spriteConfig = new SpriteConfig([0, 1], [2, 3]);
    const position = new Position(10,0);
    const enemy1 = new Enemy(sprite, spriteConfig, position, null, 1);
    enemy1.startAnimation(context);
  }

}
