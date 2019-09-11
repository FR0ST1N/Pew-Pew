
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
    this.playerPosition = null;
  }

  /**
   * enemy motion logic
   * @override
   */
  _Movement() {
    const self = this;
    let position = null;
    const getyAxisDiff = function(y) {
      let yaxisDiff = self.playerPosition.y - y;
      if (yaxisDiff < 0) {
        yaxisDiff = yaxisDiff*-1;
      } return yaxisDiff;
    };
    /** move more toward player. */
    while (1) {
      position = this._directionDecision();
      if (getyAxisDiff(position.y) <= getyAxisDiff(this.position.y)) {
        break;
      }
    }
    this._enemyPositionUpdate(position);
  }


  /**
   * directionDescion and position Update.
   * @return {Position}
   */
  _directionDecision() {
    const width = 700;
    const height = 500;
    const differenceStep = 10;
    const decision = (Number.parseFloat(Math.random().toPrecision(2)));
    const boundaryCheck = function(position) {
      if (width < position.x) {
        position.x = position.x-10;
      } else if (height < position.y) {
        position.y = position.y-10;
      } return position;
    };
    if (decision <= 0.25) {
      return boundaryCheck(new Position(this.position.x-differenceStep,
          this.position.y));
    } else if (decision <= 0.25*2) {
      return boundaryCheck(new Position( this.position.x,
          this.position.y-differenceStep));
    } else if (decision <= 0.25*3) {
      return boundaryCheck(new Position( this.position.x+differenceStep,
          this.position.y));
    } else {
      return boundaryCheck(new Position( this.position.x,
          this.position.y+differenceStep));
    }
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
 * @param {*} sprite
 * @param {*} spriteConfig
 * @param {*} position
 * @param {*} health
 * @param {*} rateOfFire - intervel between each bullet fire, multiplier by 500ms
 */
  constructor(sprite, spriteConfig, position = null, health = 1, rateOfFire = 2 ) {
    super(sprite, spriteConfig, position);
    this.health = health;
    this.rateOfFire = rateOfFire;
    this.bullet = [];
  }

  /**
   * enemy shoots new bullets.
   */
  shoot() {
    setTimeout( () => {
      /* bullet sprite */
      const bulletSprite = new Sprite('enemy_bullet.png', 1, 5,
          5, 5, new Position(0, 0), 10, 10);
      /* bullet creation */
      const bullet = new Bullet(bulletSprite, new Position(this.position.x-170,
          this.position.y-80), BulletPattern.DEFAULT, 10, 1);
      /* bullet set context from enemy context to draw */
      bullet.setContext(this.context);
      /* push bullet to enemy's stack, used while EnemySpawner::draw */
      this.bullet.push(bullet);
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
}


/**
 * enemy creator
 */
class EnemySpawner {
  /**
   * currently used as testing enemies
   * @param {Object} object
   */
  constructor(object) {
    const obj = object;
    const context = obj.ctx;
    this.player = obj.globalObject.player;
    this.drawableObjects = [];
    /* enemy sprite */
    const spriteEnemy1 = new Sprite('enemy1.png', 2, 2, 128, 32,
        new Position(0, 0), 3, 3);
    /* enemy sprite config */
    const spriteConfigEnemy1 = new SpriteConfig(['idle1', 'idle2'],
        ['fire1', 'fire2'], spriteEnemy1);
    /* start spawn position of enemy */
    const positionEnemy1 = new Position(500, 500);

    /* enemy creation */
    const enemy1 = new Enemy(spriteEnemy1, spriteConfigEnemy1,
        positionEnemy1, 1);
    /* start enemy process, bullet creation and everything is done inside this. */
    enemy1.startAnimation(context);
    /* push enemy into drawableObjects, used in EnemySpawner::draw */
    this.drawableObjects.push(enemy1);
  }

  /** */
  draw() {
    this.drawableObjects.forEach((enemy) => {
      enemy.setPlayerPosition(this.player.position.x, this.player.position.y);
      enemy.wDraw();
      enemy.bullet.forEach((Enemybullet) => {
        if (Enemybullet != null || undefined) {
          Enemybullet.wDraw();
        }
      });
    });
  }
}
