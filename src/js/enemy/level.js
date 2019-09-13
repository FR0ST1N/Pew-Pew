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
    this.context = obj.ctx;
    this.player = obj.globalObject.player;
    this.drawableObjects = [];
  }

  /** responsible for drawing
     *    enemies and bullets inside canvas from requestAnimationFrame.
    */
  draw() {
    this.drawableObjects.forEach((enemy) => {
      /* omites enemies having health < 1 */
      this._enemiesDraw(enemy);
      /* filter omits bullet if bullet is outside canvas */
      enemy.bullet = enemy.bullet.filter(this._bulletsDraw.bind(this));
    });
  }


  /**
   * only draw enemies if they have health
   * @param {Enemy} enemy
   * @return {boolean} - enemy is drawable and has health
   */
  _enemiesDraw(enemy) {
    if (enemy.health < 1 || enemy.health == null) {
      enemy.checkHealthAndDespawn();
      return false;
    } enemy.wDraw();
    enemy.setPlayerPosition(this.player.position.x, this.player.position.y);
    return true;
  }

  /**
     * filters only the bullets which are inside..
     * @param {Bullet} Enemybullet
     * @return {boolean}
     */
  _bulletsDraw(Enemybullet) {
    if (Enemybullet != null || Enemybullet != undefined) {
      if (!this.isBulletInsideCanvas(Enemybullet)) {
        Enemybullet.despawn();
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
    if (bullet.position == null) {
      return false;
    }
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
    if (!collideWithPlayerStatus) {/* if collides with player, dont draw */
      bullet.wDraw();
    } else {
      bullet.despawn();
      /* player health decrease */
    }
  }
}


// examples:
//  /* enemy sprite, look into sprite.js for more info */
// const spriteEnemy1 = new Sprite('enemy1.png', 2, 2, 128, 32,
//     new Position(0, 0), 3, 3);
//   /* enemy sprite config, based on rows and columns */
// const spriteConfigEnemy1 = new SpriteConfig(['idle1', 'idle2'],
//     ['fire1', 'fire2'], spriteEnemy1);
//   /* start spawn position of enemy */
// const positionEnemy1 = new Position(500, 500);

// /* enemy creation */
// const enemy1 = new Enemy(spriteEnemy1, spriteConfigEnemy1,
//     positionEnemy1, 3);

// /* start enemy process, all bullet related is handled inside. */
// enemy1.startAnimation(this.context);

// /* enabling autofire for the enemy */
// enemy1.autoshoot = true;

// /* overriding default bullet Pattern */
// enemy1.setBulletPattern(BulletPattern.FOLLOW);

// /* shoot must be called only after setting the context  */
// enemy1.shoot();

// /**
//    * push enemy into drawableObjects, used in EnemySpawner::draw,
//    * newly created enemies must be pushed into drawableObjects.
//    */
// this.drawableObjects.push(enemy1);
/**
 * level design
 * available configurations:
 * enemies: enemy1, enemy2
 *  enemy-property-variations: health, rateOfFire, autofire
 *                             bullet
 *    bullet configuraions:currently only one sprite
 *      bullet-properties: speed, pattern(bulletPattern), damage,
 *                         bulletPattern -> straight (or) follow
 *
 */
class Level extends EnemySpawner {
  /**
   * constructor
   * @param {Object} object
   */
  constructor(object) {
    super(object);
    this.levelEndStatus = false;
    this.level = 1; /* number */
    this.currentLevelEnemies = []; /* array */
    this.gameEnd = false;
  }

  /**
   * triggers next level
   */
  triggerNextLevel() {
    this.level += 1;
    this.levelTrigger();
  }

  /**
   * resetLevel to one
   */
  resetLevelToOne() {
    this.level = 3;
  }

  /**
   * design
   * level one:
   *  one enemy, straight bullet, health = 1, rateOfFire = (1000-100/level=1)
   * level two:
   *  two enemy:
   *    1st enemy: straight bullet, health = 2, rateOfFire = (1000-100/level=2)
   *    last enemy: follow bullet, health,rateOfFire=same as 1st enemy
   * ... progressive, all the last enemy has the follow bullet
   */
  levelTrigger() {
    for (let enemyCounter=1; enemyCounter <= this.level;
      enemyCounter++ ) {
      const enemy = this.enenmyOneFactory(
          new Position(400, enemyCounter*50+100),
          this.level,
          (1000-100)/this.level);
      enemy.startAnimation(this.context);
      enemy.autoshoot = true;
      if (this.level != 1 && enemyCounter == this.level) {
        enemy.setBulletPattern(BulletPattern.FOLLOW);
      }
      enemy.shoot();
      console.log('spawned enemy for level ' + this.level);
      this.drawableObjects.push(enemy);
    }
  }

  /**
   * creates enemy bashed on sprite 'enemy1.png'
   * @param {Position} position
   * @param {number} health
   * @param {number} rateOfFire
   * @return {Enemy} enemyObject
   */
  enenmyOneFactory(position, health, rateOfFire) {
    const spriteEnemyOne = new Sprite('enemy1.png', 2, 2, 128, 32,
        new Position(0, 0), 3, 3);
    const spriteConfigEnemyOne = new SpriteConfig(['idle1', 'idle2'],
        ['fire1', 'fire2'], spriteEnemyOne);
    const enemyPosition = position;
    const enemy = new Enemy(spriteEnemyOne, spriteConfigEnemyOne,
        enemyPosition, health, rateOfFire);
    return enemy;
  }
}
