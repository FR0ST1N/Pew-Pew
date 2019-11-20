
/**
 * @file helper for moving the bullets & bullet logic
 * @author bluepie <gopinath2nr@gmail.com>
 */
class BulletMovement extends BulletAnimationHelper {
  /** constructor*/
  constructor() {
    super();
    this.playerMode = false;
  }

  /** override this method in inherited class */
  fire() { }

  /**
   * Straight along the x axis.
   */
  straight() {
    this.position.x = this.position.x - this.speed;
  }

  /**
   * based on the defined pattern, that specific function is called.
   * @override
   */
  _Movement() {
    if (this.position != null) {
      if (this.playerMode) {/* Hack, no time :() */
        this._playerBulletMotion();
        return;
      }
      eval('this.' + this.pattern + '()');
    }
  }

  /**
   * follows enemie's position at the time of firing the bullet.
   * & despawns on reaching position if it didnt encounter player
   * till that time.
   * @return {void}
   */
  follow() {
    if (this.playerPositionSnap == null) {
      return this.straight();
    }
    let xAxis = this.playerPositionSnap.x - this.position.x;
    let yAxis = this.playerPositionSnap.y - this.position.y;
    const length = Math.sqrt((yAxis * yAxis) + (xAxis * xAxis));
    /*
     * despawn bullet after reaching its follow position
     * right to left, so sub works need to change this if more complex gameplay
     */
    if (xAxis > -10 && yAxis > -10 && !this.playerMode) {
      this.despawn();
    }
    xAxis = xAxis / length;
    yAxis = yAxis / length;
    if (this.position != null) {
      this.position.x += xAxis * this.speed;
      this.position.y += yAxis * this.speed;
    }
  }

  /**
   * player bullet movement
   * set the bullet mode to belong to player.
   */
  setPlayerMode() {
    this.playerMode = true;
  }

  /**
   * @return {boolean} - true if player mode
   */
  isPlayerMode() {
    return this.playerMode;
  }

  /**
   * player bullet moves from left to right
   */
  _playerBulletMotion() {
    this.position.x = this.position.x + this.speed;
  }
}
