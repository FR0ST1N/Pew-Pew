/** base class for enemy */
class Enemy {
  /**
   * @param {Position} position
   * @param {Bullet} bullet
   * @param {number} health
   */
  constructor(position = null, bullet = Bullet.DEFAULT, health = 1 ) {
    this.position = position;
    this.bullet = bullet;
    this.health = health;
  }
}
