
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
    this.playerPosition = null;;
  }

  /**
   * enemy motion logic
   */
  _enemyMovement() {
    const self = this;
    let position = null;
    const getyAxisDiff = function(y) {
      let yaxisDiff = self.playerPosition.y - y;
      if (yaxisDiff < 0) {
        yaxisDiff = yaxisDiff*-1;
      } return yaxisDiff;
    };

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
   * @param {context} context
   */
  constructor(object) {
    const obj = object;
    const context = obj.ctx;
    this.player = obj.globalObject.player;
    this.drawableObjects = [];
    const sprite_enemy1 = new Sprite('enemy1.png', 2, 2, 128, 32, new Position(0, 0), 3, 3);
    const spriteConfig_enemy1 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy1);
    const position_enemy1 = new Position(500, 500);
    const bullet = new Bullet('bullet1.png', new Position(position_enemy1.x-170, position_enemy1.y-80), BulletPattern.DEFAULT, 10, 1);
    const enemy1 = new Enemy(sprite_enemy1, spriteConfig_enemy1, position_enemy1, bullet, 1);
    const sprite_enemy2 = new Sprite('enemy2.png', 2, 2, 128, 32, new Position(0, 0), 4, 4);
    const spriteConfig_enemy2 = new SpriteConfig(['idle1', 'idle2'], ['fire1', 'fire2'], sprite_enemy2);
    const position_enemy2 = new Position(700,200);
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
      enemy.setPlayerPosition(this.player.position.x, this.player.position.y);
      enemy.wDraw();
      enemy.bullet.forEach((Enemybullet) => {
        //Enemybullet.wDraw();
      });
    });
  }
}
