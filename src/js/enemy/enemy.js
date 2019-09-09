
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
    super(14); /* this is the config, that defines frames per second */
    this.sprite = sprite;
    this.spriteConfig = spriteConfig;
    this.position = position;
  }

  /**
   *
   */
  _enemyMovement() {

  }

  /**
   * enenmy changing position.
   * @param {*} position 
   */
  _enemyPositionUpdate(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  /**
   * @param {context} context
   */
  startAnimation(context) {
    this.setContext(context);
    this.objectAnimation();
    this.bullet.fire(context);
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
    const sprite_enemy1 = new Sprite('enemy1.png', 2, 2, 128, 32, new Position(0, 0), 3, 3);
    const spriteConfig_enemy1 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy1);
    const position_enemy1 = new Position(300, 400);
    const bullet = new Bullet('bullet1.png',new Position(position_enemy1.x-170,position_enemy1.y-80),BulletPattern.DEFAULT,10,1);
    const enemy1 = new Enemy(sprite_enemy1, spriteConfig_enemy1, position_enemy1, bullet, 1);
    const sprite_enemy2 = new Sprite('enemy2.png', 2, 2, 128, 32, new Position(0, 0), 4, 4);
    const spriteConfig_enemy2 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy2);
    const position_enemy2 = new Position(100, 0);
    //const enemy2 = new Enemy(sprite_enemy2, spriteConfig_enemy2, position_enemy2, null, 1);
    enemy1.startAnimation(context);
    //enemy2.startAnimation(context);
  }
}
