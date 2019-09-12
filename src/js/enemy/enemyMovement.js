/**
 * @file all the enemy movement logic goes here
 * @author bluepie <gopinath2nr@gmail.com>
 */
class EnemyMovement extends EnemyAnimationHelper {
  /**
   * @param {Sprite} sprite
   * @param {SpriteConfig} spriteConfig
   * @param {Position} position
   */
  constructor(sprite, spriteConfig, position) {
    super();
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
    const middleBoundaryx = 300;
    const differenceStep = 4;
    const decision = (Number.parseFloat(Math.random().toPrecision(2)));
    const boundaryCheck = function(position) {
      if (width < position.x ) {
        position.x = position.x-10; /* middle boundary line for enemy */
      } else if (height < position.y) {
        position.y = position.y-10;
      } if (middleBoundaryx > position.x) {
        position.x = position.x+10;
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
   * @param {Position} position
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
