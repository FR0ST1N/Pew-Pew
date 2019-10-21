
/**
 * @file bullet logic
 * Each bullet has its own behaviour and properties
 * @author bluepie <gopinath2nr@gmail.com>
 */
class Bullet extends BulletMovement {
  /**
   * @param {Sprite} sprite
   * @param {Position|null} startposition - where the bullet originates
   * @param {BulletPattern|string} pattern
   * @param {number} speed - 1 is the slowest bullet possible
   * @param {number} damage
   */
  constructor(sprite = null,
      startposition = null,
      pattern = BulletPattern.FOLLOW,
      speed = 1,
      damage = 1) {
    super();
    this.sprite = sprite;
    this.position = startposition;
    this.pattern = pattern;
    this.speed = speed;
    this.damage = damage;
    this.playerPositionSnap = null;
  }

  /**
   * returns default bullet, which is straight
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
   * getbulletPosition
   * @return {Position}
   */
  getBulletPosition() {
    return this.position;
  }

  /**
   * @override
   */
  fire() {
    AudioEffects.playEnemyPewSound();
    this.objectAnimation(this.context);
  }

  /**
   * remove bullet
   */
  despawn() {
    this.position = null;
    this.sprite = null;
    this.position = null;
    this.pattern = null;
    this.speed = null;
    this.damage = null;
    this.playerPositionSnap = null;
    /* clear motion animation for bullet */
    clearTimeout(this.animationTimerId);
  }

  /**
   * detects collision with the given player coordinates
  * @param {Position} playerPosition
  * @return {boolean}
  */
  collideDetect(playerPosition) {
    if (playerPosition.x == null || this.position.x == null) {
      return false; /* dont proceed, if despawned */
    }
    const bulletObject={'x': this.position.x,
      'y': this.position.y,
      'width': this.sprite.individualSpriteSize*this.sprite.scaleFactorX,
      'height': this.sprite.individualSpriteSize*this.sprite.scaleFactorY,
    };
    const playerObject={
      'x': playerPosition.x,
      'y': playerPosition.y,
      'width': 32*2,
      'height': 32*2,
    };
    return CollisionDetection.detect(bulletObject, playerObject);
  }
}
