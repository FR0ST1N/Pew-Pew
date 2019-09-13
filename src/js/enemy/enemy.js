/**
 * @file enemy logic goes here.
 * @author bluepie <gopinath2nr@gmail.com>
 */
class Enemy extends EnemyMovement {
/**
 *
 * @param {Sprite} sprite
 * @param {SpriteConfig} spriteConfig
 * @param {Position} position
 * @param {number} health
 * @param {number} rateOfFire - intervel between each bullet fire,
 *            multiplier by 500ms
 */
  constructor(sprite, spriteConfig, position = null,
      health = 1, rateOfFire = 2 ) {
    super(sprite, spriteConfig, position);
    this.health = health;
    this.rateOfFire = rateOfFire;
    this.bullet = [];
    this.bulletpattern = BulletPattern.DEFAULT;
    this.autoshoot = false; /* enable this to auto fire based on rateOfFire */
  }

  /**
   * enemy shoots new bullet.
   */
  shoot() {
    /* if enemy is already in fire animation, just return */
    if (this.getFireState()) {
      if (this.autoshoot) {
        this._autoshoot();
      }
      return;
    }

    /* bullet sprite */
    const bulletSprite = new Sprite('enemy_bullet.png', 1, 5,
        5, 5, new Position(0, 0), 10, 10);
    /* bullet creation */
    const bullet = new Bullet(bulletSprite, new Position(this.position.x-30,
        this.position.y+20), this.bulletpattern, 5, 1);
    /* bullet set context from enemy context to draw */
    bullet.setContext(this.context);
    /**
     * set players position at the point of relasing the bullet, this
     * is only required if bulletPattern is set to follow.
     */
    bullet.setPlayerPositionSnap(this.playerPosition);
    /* set fire animation state for enemyObject, */
    this.triggerFireState();
    /* bullet object movement trigger, leaving enemy. */
    bullet.fire();
    /* push bullet to enemy's stack, used while EnemySpawner::draw */
    this.bullet.push(bullet);
    if (this.autoshoot) {
      this._autoshoot();
    }
  }

  /**
   * automatic enemy shooting.
   */
  _autoshoot() {
    setTimeout( () => {
      this.shoot();
    }, this.rateOfFire * 500);
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  setPlayerPosition(x, y) {
    this.playerPosition = new Position(x, y);
  }

  /**
   * @param {BulletPattern} bulletPattern
   */
  setBulletPattern(bulletPattern) {
    this.bulletpattern = bulletPattern;
  }

  /**
   * pass the bullet, detected during collision
   * @param {Bullet} bullet
   */
  takeDamage(bullet) {
    if (this.health > 0 && this.health-bullet.damage > 0) {
      this.health -= this.bullet.damage; /* reduce life based on bullet */
    } else if (this.health > this.health-bullet.damage < 0) {
      this.health = 0;
    }
  }

  /** checks health and despawns enenmy, if enemy health
   * not greater than 0
   * @return {boolean} - true for despawned enemy
   */
  checkHealthAndDespawn() {
    if (this.health == null) {
      return true;
    }
    if (this.health < 1) {
      this.health = null;
      this.rateOfFire = null;
      this.bullet = [];
      this.bulletpattern = null;
      this.autoshoot = false;
      this.sprite = null;
      this.spriteConfig = null;
      this.position = null;
      return true;
    } return false;
  }
}
