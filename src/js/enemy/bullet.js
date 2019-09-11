
/** helper for moving the bullets. */
class BulletMovement extends BulletAnimationHelper {
  /**
   * @param {number} timeout
   */
  constructor() {
    super();
    this.released = false;
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
   * follows enemie's position at the time of firing the bullet.
   * @return {void}
   */
  follow() {
    if (this.playerPositionSnap == null) {
      return this.straight();
    }
    let xAxis = this.playerPositionSnap.x - this.position.x;
    let yAxis = this.playerPositionSnap.y - this.position.y;
    const length = Math.sqrt((yAxis*yAxis) + (xAxis*xAxis));
    xAxis = xAxis / length;
    yAxis = yAxis / length;
    this.position.x += xAxis * this.speed;
    this.position.y += yAxis * this.speed;
  }
}

/**
 *  Each bullet has its own behaviour,
 *  @todo after bulletCreation, bullet should move towards its targetPosition,
 *
*/
class Bullet extends BulletMovement {
  /** */
  constructor(sprite = null, startposition = null, pattern = BulletPattern.FOLLOW, speed = 10, damage = 1) {
    super();
    this.sprite = sprite;
    this.position = startposition;
    this.pattern = pattern;
    this.speed = speed;
    this.damage = damage;
    this.playerPositionSnap = null;
  }

  /**
     * @return {Bullet}
     */
  static get DEFAULT() {
    return new Bullet();
  }

  /**
     * the postion that the bullet should travel towards,
     * bullet explodes at end?(inrelation with bulletPattern)
     *  or just goes offscreen
     * @param {Position} position
     * @return {Position}
     */
  setBulletTarget(position) {
    this.targetPosition = position;
    return this.targetPosition;
  }

  /**
     * if you are insane, and teleport a bullet for some reason.
     * @param {Position} position,
     * @return {Position}
     */
  setBulletPostition(position) {
    this.position = position;
    return this.position;
  }

  /**
   * player Position at the time of generating bullet.
   * @param {Position} position
   */
  setPlayerPositionSnap(position) {
    this.playerPositionSnap = position;
  }

  /**
   * @override
   */
  fire() {
    this.objectAnimation(this.context);
  }
}


