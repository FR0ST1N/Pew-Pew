/**
 * @file handles level creation and enemy spawner.
 * @author bluepie <gopinath2nr@gmail.com>
 */
class EnemySpawner {
  /**
     * @param {Object} object
     */
  constructor(object) {
    const obj = object;
    const context = obj.ctx;
    this.player = obj.globalObject.player;
    this.drawableObjects = [];
    /* enemy sprite, look into sprite.js for more info */
    const spriteEnemy1 = new Sprite('enemy1.png', 2, 2, 128, 32,
        new Position(0, 0), 3, 3);
      /* enemy sprite config, based on rows and columns */
    const spriteConfigEnemy1 = new SpriteConfig(['idle1', 'idle2'],
        ['fire1', 'fire2'], spriteEnemy1);
      /* start spawn position of enemy */
    const positionEnemy1 = new Position(500, 500);

    /* enemy creation */
    const enemy1 = new Enemy(spriteEnemy1, spriteConfigEnemy1,
        positionEnemy1, 5);

    /* start enemy process, all bullet related is handled inside. */
    enemy1.startAnimation(context);

    /* enabling autofire for the enemy */
    enemy1.autoshoot = true;

    /* overriding default bullet Pattern */
    enemy1.setBulletPattern(BulletPattern.FOLLOW);

    /* shoot must be called only after setting the context  */
    enemy1.shoot();

    /**
       * push enemy into drawableObjects, used in EnemySpawner::draw,
       * newly created enemies must be pushed into drawableObjects.
       */
    this.drawableObjects.push(enemy1);
  }

  /** responsible for drawing
     *    enemies and bullets inside canvas from requestAnimationFrame.
    */
  draw() {
    this.drawableObjects.forEach((enemy) => {
      enemy.setPlayerPosition(this.player.position.x, this.player.position.y);
      enemy.wDraw();/* filter omits bullet if bullet is outside canvas */
      enemy.bullet = enemy.bullet.filter(this._bulletsDraw.bind(this));
    });
  }

  /**
     * filters only the bullets which are inside..
     * @param {Bullet} Enemybullet
     * @return {boolean}
     */
  _bulletsDraw(Enemybullet) {
    if (Enemybullet != null || Enemybullet != undefined) {
      if (!this.isBulletInsideCanvas(Enemybullet)) {
        return false;
      } /* collision detection with player before draw */
      this._checkCollisionWithPlayer(Enemybullet);
      return true;
    }
  }

  /**
     * check bullets postion in-relattion to canvas.
     * @param {Bullet} bullet
     * @return {boolean}
     */
  isBulletInsideCanvas(bullet) {
    if (bullet.getBulletPosition().x > 0 /* check only left side*/
       && bullet.getBulletPosition().y > 0) {
      return true;
    } return false;
  }

  /**
   * @param {Bullet} bullet
   */
  _checkCollisionWithPlayer(bullet) {
    const collideWithPlayerStatus = bullet
        .collideDetect(new Position(this.player.position.x,
            this.player.position.y));
    if (!collideWithPlayerStatus) { /* if collides with player, dont draw */
      bullet.wDraw();
    } else {
      /* player health decrease */
    }
  }

}
