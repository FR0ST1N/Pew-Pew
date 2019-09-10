
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
    super(4); /** defines fps per 100ms */
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
    this.shoot();
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
 * @param {number} rateOfFire
 */
  constructor(sprite, spriteConfig, position = null,
      bullet = Bullet.DEFAULT, health = 1, rateOfFire = 2 ) {
    super(sprite, spriteConfig, position);
    this.bullet = [bullet];
    this.health = health;
    this.rateOfFire = rateOfFire;
  }

  /**
   * enemy shoots new bullets.
   */
  shoot() {
    setTimeout( () => {
      const bullet = new Bullet('bullet1.png', new Position(this.x-170, this.y-80), BulletPattern.DEFAULT, 10, 1);
      this.bullet.push(bullet);
    }, this.rateOfFire * 500);
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
  constructor(object) {
    const obj = object;
    const context = obj.ctx;
    this.drawableObjects = [];
    const sprite_enemy1 = new Sprite('enemy1.png', 2, 2, 128, 32, new Position(0, 0), 3, 3);
    const spriteConfig_enemy1 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy1);
    const position_enemy1 = new Position(obj.width-100, obj.height-100);
    const bullet = new Bullet('bullet1.png', new Position(position_enemy1.x-170, position_enemy1.y-80), BulletPattern.DEFAULT, 10, 1);
    const enemy1 = new Enemy(sprite_enemy1, spriteConfig_enemy1, position_enemy1, bullet, 1);
    const sprite_enemy2 = new Sprite('enemy2.png', 2, 2, 128, 32, new Position(0, 0), 4, 4);
    const spriteConfig_enemy2 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy2);
    const position_enemy2 = new Position(obj.width-100, obj.height-300);
    const enemy2 = new Enemy(sprite_enemy2, spriteConfig_enemy2, position_enemy2, null, 1);
    enemy2.startAnimation(context);
    enemy1.startAnimation(context);
    this.enemy1 = enemy1;
    this.enemy2 = enemy2;
    this.drawableObjects.push(enemy1, enemy2);
    // enemy2.startAnimation(context);
  }

  /** */
  draw() {
    this.drawableObjects.forEach((enemy) => {
      enemy.wDraw();
      enemy.bullet.forEach((Enemybullet) => {
        //Enemybullet.wDraw();
      });
    });
  }
}
