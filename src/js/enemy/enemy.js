
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
    super(4); /** defines fps per 100ms, available also for bullet*/
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
    /* diff between player and given position */
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
 * @param {*} rateOfFire - intervel between each bullet fire,
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
      return;
    }

    /* bullet sprite */
    const bulletSprite = new Sprite('enemy_bullet.png', 1, 5,
        5, 5, new Position(0, 0), 10, 10);
    /* bullet creation */
    const bullet = new Bullet(bulletSprite, new Position(this.position.x-30,
        this.position.y+20), this.bulletpattern, 30, 1);
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
}

