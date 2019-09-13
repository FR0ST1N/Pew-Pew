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

    let frames = 0; /* frames to stop infinite loop*/
    while (frames < 100) {
      position = this._directionDecision();/** move more toward player. */
      if (getyAxisDiff(position.y) <= getyAxisDiff(this.position.y)) {
        break;
      } frames++;
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
    const decisionX = parseFloat((Math.random()* differenceStep -2));
    const decisionY = parseFloat((Math.random()* differenceStep -2));
    const boundaryCheck = function(position) {
      if (width < position.x ) {
        position.x = position.x-10; /* middle boundary line for enemy */
      } else if (height < position.y) {
        position.y = position.y-10;
      } if (middleBoundaryx > position.x) {
        position.x = position.x+10;
      } return position;
    };
    return boundaryCheck(new Position(this.position.x+decisionX,
        this.position.y+decisionY));
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
