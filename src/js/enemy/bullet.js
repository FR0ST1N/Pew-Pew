/** builds different types of bullet */
class BulletImage {
  /**
   * @param {string} name
   */
  constructor(name) {
    const image = new Image();
    image.src = 'images/'+name;
    return image;
  }
}


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
    this.position.x = this.position.x - 30;
  }
}

/**
 *  Each bullet has its own behaviour,
 *  @todo after bulletCreation, bullet should move towards its targetPosition,
 *
*/
class Bullet extends BulletMovement {
  /**
   * @param {string} bulletImage
   * @param {Position} startposition
   * @param {Enumerator.BulletPattern} pattern
   * @param {number} speed
   * @param {number} damage
   */
  constructor(bulletImage = 'bullet1.png' ,startposition = null, pattern = BulletPattern.DEFAULT, speed = BulletSpeed.ONE, damage = 1) {
    super();
    this.image = new BulletImage(bulletImage);
    this.position = startposition;
    this.pattern = pattern;
    this.speed = speed;
    this.damage = damage;
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
     * @todo calculations based on position and move towards targetposition,
     *  triggers animation
     * @return {boolean}
     */
  fire(context) {
    this.context = context;
    if (this.released) {
      /** @todo  */
    }
    /** @todo */
    this.objectAnimation(this.context);
    return true;
  }
}


