/** basic animation wrapper for making life simpler */
class animationHelper {
  /**
   * @param {context} context
   */
  wDraw() {
    this.context.drawImage(this.image, this.position.x, this.position.y);
  }

  /**
   * set context before using drawImage
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }
}


/** speed interms of setInterval,
 * @todo change speeds after actual testing.
 */
class Speed {
/**
 * slow
 * @return {number}
 */
  static get ONE() {
    return 30;
  }
  /**
   * medium
   * @return {number}
   */
  static get TWO() {
    return 20;
  }

  /**
   * fast
   * @return {number}
   */
  static get THREE() {
    return 10;
  }

  /**
   * noob level
   * @return {number}
   */
  static get EXTREMESLOW() {
    return 300;
  }
}


/** helper for moving the bullets. */
class BulletMovement extends animationHelper {
  /**
   * @param {number} timeout
   */
  constructor(timeout) {
    super();
    this.released = false;
    const obj = this;
    this.setInterval = setInterval( function() {
      obj.fire();
    }, timeout);
  }

  /** override this method in inherited class */
  fire() { }

  /**
   * Straight along the x axis.
   */
  straight() {
    this.position.x = this.position.x - 10;
  }
}


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



/** since enums are not available at disposable, enum alternative
 *  var/const pattern = {}; Object.freeze(pattern); could also work.
 * @readonly
 * @enum {string}
 */
class BulletPattern {
  /**
   * bullet pattern default.
   * @return {string}
   */
  static get DEFAULT() {
    return Pattern.SCATTER;
  }

  /**
   * bullet pattern stright
   * @return {string}
   */
  static get STRAIGHT() {
    return 'straight';
  }

  /**
   * bullet pattern scatter
   * @return {string}
   */
  static get SCATTER() {
    return 'scatter';
  }
}

/**
 *  Each bullet has its own behaviour,
 *  @todo after bulletCreation, bullet should move towards its targetPosition,
 *
*/
class Bullet {
  /**
   * @param {Position} startposition
   * @param {Enumerator.BulletPattern} pattern
   * @param {number} speed
   * @param {number} damage
   */
  constructor(startposition = null, pattern = BulletPattern.DEFAULT, speed = 1, damage = 1) {
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
  fire() {
    return true;
  }
}


